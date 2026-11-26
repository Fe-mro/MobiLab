import {
  PHASES,
  REGIONS,
  SCIENTIFIC_SOURCES,
  BODYMAP_POINTS,
  PRACTICE_PRINCIPLES,
  EXERCISES,
  ROUTINES
} from './data/exercises.js';
import {
  renderPoseSVG,
  renderBodyHotspotSVG,
  renderBodyMapInteractiveSVG
} from './data/svg-renderer.js';

const STORAGE_KEY = 'mobilab_state_v2';
const SWITCH_PAUSE_SEC = 10;
const TRANSITION_PAUSE_SEC = 8;

const EQUIPMENT_OPTIONS = [
  { id: 'ball', label: 'Faszienball' },
  { id: 'roller', label: 'Foam Roller' },
  { id: 'peanut', label: 'Peanut' },
  { id: 'band', label: 'Band' },
  { id: 'stab', label: 'Stab / Besenstil' },
  { id: 'kiste', label: 'Stuhl / Kiste' },
  { id: 'gewicht', label: 'Gewicht / Flasche' },
  { id: 'stange', label: 'Stange / Türrahmen' }
];
const ALL_EQUIP_IDS = EQUIPMENT_OPTIONS.map((o) => o.id);
const ALWAYS_AVAILABLE_EQUIP = new Set(['none', 'wand', 'tuerrahmen']);

const DEFAULT_STATE = {
  activeTab: 'home',
  availableEquipment: [...ALL_EQUIP_IDS],
  homeTargetMinutes: 20,
  libSearch: '',
  libPhase: 'all',
  libRegion: 'all',
  libTravelOnly: false,
  builderConfig: {
    regions: ['huefte-beine', 'bws-ruecken', 'schulter-nacken'],
    phases: [1, 2, 3],
    equipMode: 'all',
    targetMinutes: 20
  },
  builderQueue: ['ql-release', 'piriformis-release', 'cat-camel-lws', 'couch-stretch', 'mcgill-bird-dog'],
  customDurations: {},
  customRoutines: [],
  bodymapChecked: [],
  bodymapActive: 1,
  history: [],
  muted: false
};

let state = loadState();
let deferredInstallPrompt = null;

// Modulweite Timer-Steuerung (verhindert parallele Zombie-Intervals!)
let tickerInterval = null;
let stepEndTimeMs = 0;

// ==================== PERSISTENCE ====================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(DEFAULT_STATE),
      ...parsed,
      builderConfig: {
        ...DEFAULT_STATE.builderConfig,
        ...(parsed.builderConfig || {})
      }
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Speicherlimit ignorieren
  }
}

// ==================== HELPERS ====================
function getExerciseById(id) {
  return EXERCISES.find((e) => e.id === id);
}

function getExDuration(ex) {
  return state.customDurations[ex.id] || ex.defaultSeconds;
}

function getExerciseCostSec(ex) {
  const dur = getExDuration(ex);
  return (ex.bilateral ? dur * 2 + SWITCH_PAUSE_SEC : dur) + TRANSITION_PAUSE_SEC;
}

function formatTime(sec) {
  const s = Math.max(0, Math.round(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

function estimateTotalSeconds(exerciseIds) {
  let total = 0;
  exerciseIds.forEach((id, idx) => {
    const ex = getExerciseById(id);
    if (!ex) return;
    const dur = getExDuration(ex);
    total += ex.bilateral ? dur * 2 + SWITCH_PAUSE_SEC : dur;
    if (idx < exerciseIds.length - 1) total += TRANSITION_PAUSE_SEC;
  });
  return total;
}

function isExerciseAllowedByEquipment(ex, availList) {
  if (!availList || availList.length === 0) {
    return ex.travelFriendly && ex.equipment.every((eq) => ALWAYS_AVAILABLE_EQUIP.has(eq));
  }
  const availSet = new Set([...ALWAYS_AVAILABLE_EQUIP, ...availList]);
  return ex.equipment.every((eq) => availSet.has(eq));
}

function buildAdaptiveRoutineExercises(routine) {
  const avail = state.availableEquipment;
  const budgetSec = (state.homeTargetMinutes || 20) * 60;
  const regions = routine.regions && routine.regions.length ? routine.regions : Object.keys(REGIONS);

  // 1. Priorisierte Übungen der Routine filtern
  const preferred = (routine.exerciseIds || [])
    .map(getExerciseById)
    .filter((ex) => ex && isExerciseAllowedByEquipment(ex, avail));

  // 2. Fallback-Pool aus allen Übungen derselben Regionen (falls viel Zeit oder wenig Equipment gewählt)
  const preferredIds = new Set(preferred.map((e) => e.id));
  const extraPool = EXERCISES.filter(
    (ex) => !preferredIds.has(ex.id) && regions.includes(ex.region) && isExerciseAllowedByEquipment(ex, avail)
  );
  const fullPool = [...preferred, ...extraPool];

  // Nach Phasen gruppieren (Release -> Mobilisation -> Aktivierung)
  const byPhase = {
    1: fullPool.filter((e) => e.phase === 1),
    2: fullPool.filter((e) => e.phase === 2),
    3: fullPool.filter((e) => e.phase === 3)
  };

  const selected = [];
  const selectedIds = new Set();
  let usedSec = 0;

  // Ausgewogen durch Phasen 1 -> 2 -> 3 rotieren bis Zeitbudget erreicht
  let added = true;
  while (added && usedSec < budgetSec) {
    added = false;
    for (const p of [1, 2, 3]) {
      const candidate = byPhase[p].find((e) => !selectedIds.has(e.id));
      if (!candidate) continue;
      const cost = getExerciseCostSec(candidate);
      if (usedSec + cost <= budgetSec + 35 || selected.length < 3) {
        selected.push(candidate);
        selectedIds.add(candidate.id);
        usedSec += cost;
        added = true;
      }
      if (usedSec >= budgetSec) break;
    }
  }

  // Strikt wissenschaftlich sortieren: Phase 1 -> 2 -> 3
  selected.sort((a, b) => a.phase - b.phase);
  return selected.map((e) => e.id);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderVisualHtml(ex) {
  if (ex.image) {
    return `<img src="${escapeHtml(ex.image)}" alt="${escapeHtml(ex.name)}" class="pose-img" style="width:100%;border-radius:16px;object-fit:cover;" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" /><div style="display:none;">${renderPoseSVG(ex.svgPose, ex.phase)}</div>`;
  }
  return renderPoseSVG(ex.svgPose, ex.phase);
}

function showToast(msg) {
  const toastEl = document.getElementById('app-toast');
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  clearTimeout(showToast._tid);
  showToast._tid = setTimeout(() => {
    toastEl.classList.add('hidden');
  }, 4000);
}

// ==================== WEB AUDIO & WAKE LOCK ====================
let audioCtx = null;
let wakeLock = null;

function ensureAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) audioCtx = new Ctx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
}

function playTone(freq = 528, duration = 0.35, gainVal = 0.16) {
  if (state.muted) return;
  try {
    ensureAudio();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Audio optional
  }
}

async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => {
        wakeLock = null;
      });
    }
  } catch {
    // Nicht auf jedem Gerät unterstützt
  }
}

function releaseWakeLock() {
  if (wakeLock) {
    wakeLock.release().catch(() => {});
    wakeLock = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && playerState.active && !playerState.paused) {
    requestWakeLock();
  }
});

// ==================== RENDERING ====================
const mainEl = document.getElementById('main-content');

function setActiveTab(tab) {
  state.activeTab = tab;
  saveState();
  document.querySelectorAll('.dock-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function render() {
  if (state.activeTab === 'home') renderHome();
  else if (state.activeTab === 'builder') renderBuilder();
  else if (state.activeTab === 'library') renderLibrary();
  else if (state.activeTab === 'posture') renderPosture();
}

// ---------- TAB 1: HOME (EQUIPMENT + ZEIT -> ADAPTIVE ROUTINEN) ----------
function renderHome() {
  const noGearMode = state.availableEquipment.length === 0;
  const allGearMode = state.availableEquipment.length === ALL_EQUIP_IDS.length;

  const customAdaptive = state.customRoutines.map((cr) => ({
    ...cr,
    badge: 'Eigene Routine',
    accent: 'lavender',
    isCustom: true,
    adaptiveIds: cr.exerciseIds
  }));

  const routinesWithPlan = [
    ...ROUTINES.map((r) => ({
      ...r,
      adaptiveIds: buildAdaptiveRoutineExercises(r)
    })),
    ...customAdaptive
  ];

  mainEl.innerHTML = `
    <div class="home-setup-card">
      <span class="setup-label">1. Welches Equipment hast du heute?</span>
      <div class="filter-wrap">
        <button class="select-chip ${noGearMode ? 'active' : ''}" id="btn-home-nogear">✈ Ohne Geräte</button>
        <button class="select-chip ${allGearMode ? 'active-lav' : ''}" id="btn-home-allgear">Alles verfügbar</button>
        ${EQUIPMENT_OPTIONS.map((eq) => {
          const active = state.availableEquipment.includes(eq.id);
          return `<button class="select-chip ${active ? 'active' : ''}" data-home-equip="${eq.id}">${eq.label}</button>`;
        }).join('')}
      </div>

      <span class="setup-label" style="margin-top:6px;">2. Wie viel Zeit möchtest du investieren?</span>
      <div class="filter-wrap" style="margin-bottom:0;">
        ${[10, 15, 20, 30, 45].map((m) => `
          <button class="select-chip ${state.homeTargetMinutes === m ? 'active-lav' : ''}" data-home-min="${m}">${m} Min</button>
        `).join('')}
      </div>
    </div>

    <div class="section-head">
      <h2 class="section-title">Deine angepassten Routinen</h2>
      <span class="section-meta">${noGearMode ? 'Ohne Geräte' : `${state.availableEquipment.length} Geräte`} · ~${state.homeTargetMinutes} Min</span>
    </div>

    ${routinesWithPlan.map((r) => {
      const ids = r.adaptiveIds;
      const mins = Math.max(1, Math.round(estimateTotalSeconds(ids) / 60));
      const accentClass = r.accent ? `accent-${r.accent}` : '';
      return `
        <div class="bento-card ${accentClass}">
          <span class="card-badge">${escapeHtml(r.badge || 'Routine')}</span>
          <h3 class="card-title">${escapeHtml(r.title)}</h3>
          <p class="card-sub">${escapeHtml(r.goal || r.subtitle || '')}</p>
          <div class="card-footer">
            <span style="font-weight:700;font-size:0.82rem;">~${mins} Min · ${ids.length} Übungen</span>
            <div style="display:flex;gap:6px;">
              ${r.isCustom ? `<button class="btn-surface-pill" data-delete-custom="${r.id}" style="padding:8px 12px;">🗑</button>` : ''}
              <button class="btn-dark-pill" data-load-adaptive="${r.id}">Anpassen</button>
              <button class="btn-dark-pill" data-start-adaptive="${r.id}">▶ Start</button>
            </div>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

// ---------- TAB 2: MODULARER BAUKASTEN ----------
function renderBuilder() {
  const cfg = state.builderConfig;
  const totalSec = estimateTotalSeconds(state.builderQueue);
  const totalMin = Math.max(1, Math.round(totalSec / 60));

  mainEl.innerHTML = `
    <div class="bento-card accent-lavender">
      <span class="card-badge">Wissenschaftlicher Baukasten</span>
      <h1 class="card-title">Dein modulares Training</h1>
      <p class="card-sub">Wähle Regionen, Phasen &amp; Dauer – MobiLab sortiert automatisch nach Phase 1 (Release) → 2 (Mobilisation) → 3 (Aktivierung).</p>
    </div>

    <div class="builder-box">
      <strong style="font-size:0.86rem;">1. Zielregionen</strong>
      <div class="chip-grid">
        ${Object.entries(REGIONS).map(([key, label]) => `
          <button class="select-chip ${cfg.regions.includes(key) ? 'active' : ''}" data-b-region="${key}">${label}</button>
        `).join('')}
      </div>

      <strong style="font-size:0.86rem;">2. Trainings-Phasen</strong>
      <div class="chip-grid">
        ${[1, 2, 3].map((p) => `
          <button class="select-chip ${cfg.phases.includes(p) ? 'active-lav' : ''}" data-b-phase="${p}">${PHASES[p].short}</button>
        `).join('')}
      </div>

      <strong style="font-size:0.86rem;">3. Equipment &amp; Zieldauer</strong>
      <div class="chip-grid">
        ${[
          { id: 'all', label: 'Alles' },
          { id: 'travel', label: 'Ohne Geräte' },
          { id: 'ball', label: 'Nur Ball' },
          { id: 'roller', label: 'Ball & Rolle' }
        ].map((eq) => `
          <button class="select-chip ${cfg.equipMode === eq.id ? 'active' : ''}" data-b-equip="${eq.id}">${eq.label}</button>
        `).join('')}
      </div>
      <div class="chip-grid">
        ${[10, 15, 20, 30, 45].map((m) => `
          <button class="select-chip ${cfg.targetMinutes === m ? 'active-lav' : ''}" data-b-min="${m}">${m} Min</button>
        `).join('')}
      </div>

      <button id="btn-generate-plan" class="btn-lime-pill btn-full">⚡ Passenden Plan generieren</button>
    </div>

    <div class="section-head">
      <h2 class="section-title">Aktuelle Session (${state.builderQueue.length} Übungen · ~${totalMin} Min)</h2>
      <button id="btn-sort-science" class="btn-surface-pill" style="padding:6px 10px;font-size:0.75rem;">Phase 1→3 sortieren</button>
    </div>

    ${state.builderQueue.length === 0 ? `
      <div class="bento-card">
        <p style="margin:0;color:var(--text-secondary);">Noch keine Übungen ausgewählt. Nutze den Generator oben oder füge Übungen im Tab „Übungen“ hinzu.</p>
      </div>
    ` : state.builderQueue.map((id, idx) => {
      const ex = getExerciseById(id);
      if (!ex) return '';
      const dur = getExDuration(ex);
      return `
        <div class="queue-row">
          <div style="min-width:0;flex:1;" data-open-ex="${ex.id}">
            <div style="font-weight:700;font-size:0.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              <span class="phase-dot p${ex.phase}"></span> ${escapeHtml(ex.name)}
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">
              ${PHASES[ex.phase].short} · ${formatTime(dur)}${ex.bilateral ? ' × 2' : ''}
            </div>
          </div>
          <div class="queue-actions">
            <button class="btn-tiny" data-q-up="${idx}" title="Hoch">↑</button>
            <button class="btn-tiny" data-q-down="${idx}" title="Runter">↓</button>
            <button class="btn-tiny" data-q-del="${idx}" title="Entfernen">✕</button>
          </div>
        </div>
      `;
    }).join('')}

    ${state.builderQueue.length > 0 ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;">
        <button id="btn-save-custom" class="btn-surface-pill">💾 Als Routine speichern</button>
        <button id="btn-start-queue" class="btn-lime-pill">▶ Session starten</button>
      </div>
    ` : ''}
  `;
}

function generateSmartQueue() {
  const { regions, phases, equipMode, targetMinutes } = state.builderConfig;
  const activeRegions = regions.length ? regions : Object.keys(REGIONS);
  const activePhases = phases.length ? [...phases].sort() : [1, 2, 3];

  const pool = EXERCISES.filter((ex) => {
    if (!activeRegions.includes(ex.region)) return false;
    if (!activePhases.includes(ex.phase)) return false;
    if (equipMode === 'travel') return ex.travelFriendly;
    if (equipMode === 'ball') return ex.equipment.includes('ball') || ex.equipment.includes('none');
    if (equipMode === 'roller') return ex.equipment.includes('ball') || ex.equipment.includes('roller') || ex.equipment.includes('peanut') || ex.equipment.includes('none');
    return true;
  });

  const budgetSec = targetMinutes * 60;
  const selected = [];
  let usedSec = 0;

  const byPhase = {
    1: pool.filter((e) => e.phase === 1),
    2: pool.filter((e) => e.phase === 2),
    3: pool.filter((e) => e.phase === 3)
  };

  let added = true;
  let round = 0;
  while (added && usedSec < budgetSec) {
    added = false;
    for (const p of activePhases) {
      const list = byPhase[p];
      if (!list || list.length === 0) continue;
      const targetReg = activeRegions[(round + p) % activeRegions.length];
      let candidate = list.find((e) => e.region === targetReg && !selected.includes(e.id));
      if (!candidate) candidate = list.find((e) => !selected.includes(e.id));
      if (!candidate) continue;

      const cost = getExerciseCostSec(candidate);
      if (usedSec + cost <= budgetSec + 45 || selected.length < 3) {
        selected.push(candidate.id);
        usedSec += cost;
        added = true;
      }
    }
    round++;
  }

  selected.sort((a, b) => getExerciseById(a).phase - getExerciseById(b).phase);
  state.builderQueue = selected;
  saveState();
  renderBuilder();
}

// ---------- TAB 3: ÜBUNGS-BIBLIOTHEK (WRAPPING-FILTER OHNE SCROLLEN) ----------
function renderLibrary() {
  const q = state.libSearch.trim().toLowerCase();
  const filtered = EXERCISES.filter((ex) => {
    if (state.libPhase !== 'all' && ex.phase !== Number(state.libPhase)) return false;
    if (state.libRegion !== 'all' && ex.region !== state.libRegion) return false;
    if (state.libTravelOnly && !ex.travelFriendly) return false;
    if (q) {
      const hay = `${ex.name} ${ex.targetZone} ${REGIONS[ex.region]} ${ex.equipmentAlt}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const travelCount = EXERCISES.filter((e) => e.travelFriendly).length;

  mainEl.innerHTML = `
    <input id="lib-search-input" type="search" class="search-input" placeholder="Übung, Muskel oder Gerät suchen…" value="${escapeHtml(state.libSearch)}" />

    <button id="btn-lib-travel" class="travel-toggle-btn ${state.libTravelOnly ? 'active' : ''}" type="button">
      <span>✈ Nur Übungen ohne Geräte</span>
      <span>${state.libTravelOnly ? 'Aktiv ✓' : `${travelCount} Übungen`}</span>
    </button>

    <div class="filter-wrap">
      <button class="filter-pill ${state.libPhase === 'all' ? 'active' : ''}" data-lib-phase="all">Alle Phasen</button>
      <button class="filter-pill ${state.libPhase === '1' ? 'active' : ''}" data-lib-phase="1">1 · Release</button>
      <button class="filter-pill ${state.libPhase === '2' ? 'active' : ''}" data-lib-phase="2">2 · Mobilisation</button>
      <button class="filter-pill ${state.libPhase === '3' ? 'active' : ''}" data-lib-phase="3">3 · Aktivierung</button>
    </div>

    <div class="filter-wrap">
      <button class="filter-pill ${state.libRegion === 'all' ? 'active' : ''}" data-lib-region="all">Alle Regionen</button>
      ${Object.entries(REGIONS).map(([k, lbl]) => `
        <button class="filter-pill ${state.libRegion === k ? 'active' : ''}" data-lib-region="${k}">${lbl}</button>
      `).join('')}
    </div>

    <div class="section-head">
      <h2 class="section-title">Übungs-Bibliothek</h2>
      <span class="section-meta">${filtered.length} von ${EXERCISES.length}</span>
    </div>

    ${filtered.map((ex) => {
      const dur = getExDuration(ex);
      return `
        <div class="ex-item" data-open-ex="${ex.id}">
          <div class="ex-thumb">${renderPoseSVG(ex.svgPose, ex.phase)}</div>
          <div class="ex-info">
            <h3 class="ex-name">${escapeHtml(ex.name)}</h3>
            <div class="ex-meta">
              <span class="phase-dot p${ex.phase}"></span>
              <span>${PHASES[ex.phase].short}</span>
              <span>·</span>
              <span>${formatTime(dur)}${ex.bilateral ? '/Seite' : ''}</span>
              ${ex.travelFriendly ? '<span>· ✈ Ohne Geräte</span>' : ''}
            </div>
          </div>
          <span style="color:var(--text-secondary);font-size:1.1rem;">›</span>
        </div>
      `;
    }).join('')}
  `;

  const searchInput = document.getElementById('lib-search-input');
  searchInput?.addEventListener('input', (e) => {
    state.libSearch = e.target.value;
    saveState();
    const pos = e.target.selectionStart;
    renderLibrary();
    const nextInput = document.getElementById('lib-search-input');
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(pos, pos);
    }
  });
}

// ---------- TAB 4: HALTUNG (BODYMAP) & WISSENSCHAFT ----------
function renderPosture() {
  const activePt = BODYMAP_POINTS.find((p) => p.id === state.bodymapActive) || BODYMAP_POINTS[0];

  mainEl.innerHTML = `
    <div class="bento-card accent-lime">
      <span class="card-badge">Phase 4 · Haltungs-Integration</span>
      <h1 class="card-title">6-Punkte-BodyMap Check</h1>
      <p class="card-sub">Nutze diese Checkliste im Spiegel oder direkt nach dem Training. Tippe auf eine Nummer zum Prüfen &amp; Abhaken.</p>
    </div>

    <div class="builder-box">
      <div class="bodymap-wrap">
        <div>${renderBodyMapInteractiveSVG(BODYMAP_POINTS, state.bodymapChecked, state.bodymapActive)}</div>
        <div>
          ${BODYMAP_POINTS.map((p) => {
            const isChecked = state.bodymapChecked.includes(p.id);
            return `
              <button class="bodymap-point-btn ${isChecked ? 'checked' : ''}" data-bm-select="${p.id}">
                <span><strong>${p.id}.</strong> ${escapeHtml(p.title)}</span>
                <span data-bm-toggle="${p.id}" style="padding:2px 6px;border-radius:8px;background:rgba(255,255,255,0.08);">${isChecked ? '✓' : '○'}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <div class="detail-block" style="margin-top:12px;margin-bottom:0;">
        <h4>${activePt.id}. ${escapeHtml(activePt.title)}</h4>
        <p style="margin:0 0 8px;font-weight:600;font-size:0.86rem;">${escapeHtml(activePt.cue)}</p>
        <ul>
          ${activePt.details.map((d) => `<li>${escapeHtml(d)}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="section-head">
      <h2 class="section-title">7 Praxis-Prinzipien</h2>
    </div>
    ${PRACTICE_PRINCIPLES.map((pr, i) => `
      <div class="bento-card" style="padding:14px 16px;">
        <strong style="color:var(--lavender);font-size:0.88rem;">${i + 1}. ${escapeHtml(pr.title)}</strong>
        <p style="margin:5px 0 0;font-size:0.83rem;color:var(--text-secondary);">${escapeHtml(pr.text)}</p>
      </div>
    `).join('')}

    <div class="section-head">
      <h2 class="section-title">Wissenschaftliche Quellen</h2>
    </div>
    ${SCIENTIFIC_SOURCES.map((src) => `
      <div class="bento-card" style="padding:14px 16px;">
        <div style="font-weight:700;font-size:0.86rem;margin-bottom:4px;">${escapeHtml(src.title)}</div>
        <div style="font-size:0.76rem;color:var(--text-secondary);margin-bottom:6px;">${escapeHtml(src.authors)} · ${escapeHtml(src.journal)}</div>
        <p style="margin:0 0 8px;font-size:0.82rem;">${escapeHtml(src.takeaway)}</p>
        <a class="source-link" href="${src.url}" target="_blank" rel="noopener noreferrer">PubMed (PMID ${src.pmid}) ↗</a>
      </div>
    `).join('')}
  `;
}

// ==================== DETAIL MODAL ====================
const modalEl = document.getElementById('exercise-modal');

function openExerciseModal(id) {
  const ex = getExerciseById(id);
  if (!ex) return;
  const dur = getExDuration(ex);
  const inQueue = state.builderQueue.includes(ex.id);

  const badgeEl = document.getElementById('modal-phase-badge');
  badgeEl.className = `badge p${ex.phase}`;
  badgeEl.textContent = `${PHASES[ex.phase].short} · ${REGIONS[ex.region]}`;
  document.getElementById('modal-title').textContent = ex.name;

  document.getElementById('modal-body').innerHTML = `
    <div class="visual-pair">
      <div>${renderVisualHtml(ex)}</div>
      <div>${renderBodyHotspotSVG(ex.bodyHotspots, ex.phase)}</div>
    </div>

    <div class="detail-block">
      <h4>Zielzone &amp; Equipment</h4>
      <p style="margin:0 0 6px;font-size:0.86rem;"><strong>Ziel:</strong> ${escapeHtml(ex.targetZone)}</p>
      <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);"><strong>Alternative:</strong> ${escapeHtml(ex.equipmentAlt)}${ex.bilateral ? ' · Beidseitig (Links & Rechts)' : ''}</p>
    </div>

    <div class="detail-block">
      <h4>1. Ausgangsposition (Setup)</h4>
      <ol>${ex.setup.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    </div>

    <div class="detail-block">
      <h4>2. Exakte Ausführung</h4>
      <ol>${ex.execution.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    </div>

    <div class="detail-block">
      <h4>3. Atmung &amp; häufige Fehler</h4>
      <p style="margin:0 0 8px;font-size:0.85rem;"><strong>Atmung:</strong> ${escapeHtml(ex.breathing)}</p>
      <ul>${ex.commonMistakes.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul>
    </div>

    ${ex.variants ? `
      <div class="detail-block">
        <h4>Varianten</h4>
        <ul>${ex.variants.map((v) => `<li>${escapeHtml(v)}</li>`).join('')}</ul>
      </div>
    ` : ''}

    <div style="display:flex;align-items:center;justify-content:space-between;background:var(--bg-elevated);padding:10px 14px;border-radius:16px;margin-bottom:12px;">
      <span style="font-size:0.84rem;font-weight:600;">Timer-Dauer${ex.bilateral ? ' (pro Seite)' : ''}:</span>
      <div style="display:flex;align-items:center;gap:8px;">
        <button class="btn-tiny" id="modal-dur-minus">-</button>
        <strong id="modal-dur-val">${formatTime(dur)}</strong>
        <button class="btn-tiny" id="modal-dur-plus">+</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
      <button id="modal-toggle-queue" class="btn-surface-pill">${inQueue ? '✓ Im Baukasten' : '+ In Baukasten'}</button>
      <button id="modal-start-single" class="btn-lime-pill">▶ Direkt starten</button>
    </div>
  `;

  modalEl.classList.remove('hidden');

  document.getElementById('modal-dur-minus').onclick = () => {
    state.customDurations[ex.id] = Math.max(15, getExDuration(ex) - 15);
    saveState();
    document.getElementById('modal-dur-val').textContent = formatTime(getExDuration(ex));
  };
  document.getElementById('modal-dur-plus').onclick = () => {
    state.customDurations[ex.id] = Math.min(300, getExDuration(ex) + 15);
    saveState();
    document.getElementById('modal-dur-val').textContent = formatTime(getExDuration(ex));
  };
  document.getElementById('modal-toggle-queue').onclick = () => {
    if (state.builderQueue.includes(ex.id)) {
      state.builderQueue = state.builderQueue.filter((qId) => qId !== ex.id);
    } else {
      state.builderQueue.push(ex.id);
    }
    saveState();
    openExerciseModal(ex.id);
    if (state.activeTab === 'builder') renderBuilder();
  };
  document.getElementById('modal-start-single').onclick = () => {
    modalEl.classList.add('hidden');
    startWorkout([ex.id], ex.name);
  };
}

document.getElementById('modal-close').onclick = () => modalEl.classList.add('hidden');
modalEl.addEventListener('click', (e) => {
  if (e.target === modalEl) modalEl.classList.add('hidden');
});

// ==================== HANDS-FREE WORKOUT PLAYER (ECHTZEIT-TIMER) ====================
const playerEl = document.getElementById('workout-player');
let playerState = {
  active: false,
  paused: false,
  title: '',
  steps: [],
  stepIndex: 0,
  remaining: 0
};

function stopTicker() {
  if (tickerInterval !== null) {
    clearInterval(tickerInterval);
    tickerInterval = null;
  }
}

function buildPlayerSteps(exerciseIds) {
  const valid = exerciseIds.map(getExerciseById).filter(Boolean);
  const steps = [];
  valid.forEach((ex, idx) => {
    const dur = getExDuration(ex);
    if (ex.bilateral) {
      steps.push({
        type: 'work',
        sideTag: 'left',
        ex,
        sideLabel: 'Links',
        duration: dur,
        baseDuration: dur,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
      steps.push({
        type: 'switch',
        sideTag: 'switch',
        ex,
        sideLabel: 'Seitenwechsel → Rechts',
        duration: SWITCH_PAUSE_SEC,
        baseDuration: SWITCH_PAUSE_SEC,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
      steps.push({
        type: 'work',
        sideTag: 'right',
        ex,
        sideLabel: 'Rechts',
        duration: dur,
        baseDuration: dur,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
    } else {
      steps.push({
        type: 'work',
        sideTag: 'both',
        ex,
        sideLabel: 'Beidseitig',
        duration: dur,
        baseDuration: dur,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
    }
    if (idx < valid.length - 1) {
      steps.push({
        type: 'transition',
        sideTag: 'transition',
        ex: valid[idx + 1],
        sideLabel: 'Nächste Übung',
        duration: TRANSITION_PAUSE_SEC,
        baseDuration: TRANSITION_PAUSE_SEC,
        exerciseIndex: idx + 1,
        totalExercises: valid.length
      });
    }
  });
  return steps;
}

function startWorkout(exerciseIds, title = 'Training') {
  stopTicker();
  const steps = buildPlayerSteps(exerciseIds);
  if (!steps.length) return;
  ensureAudio();
  requestWakeLock();

  playerState = {
    active: true,
    paused: false,
    title,
    steps,
    stepIndex: 0,
    remaining: steps[0].duration
  };

  stepEndTimeMs = Date.now() + playerState.remaining * 1000;
  playerEl.classList.remove('hidden');
  playTone(528, 0.35);
  renderPlayer();
  startTicker();
}

function startTicker() {
  stopTicker();
  stepEndTimeMs = Date.now() + playerState.remaining * 1000;
  tickerInterval = setInterval(() => {
    if (!playerState.active || playerState.paused) return;
    const newRemaining = Math.max(0, Math.ceil((stepEndTimeMs - Date.now()) / 1000));
    if (newRemaining === playerState.remaining) return;

    playerState.remaining = newRemaining;
    if (newRemaining > 0 && newRemaining <= 3) {
      playTone(440, 0.12, 0.08);
    }

    if (newRemaining <= 0) {
      advanceStep();
    } else {
      updateTimerDisplay();
    }
  }, 250);
}

function goToStep(index) {
  if (index < 0 || index >= playerState.steps.length) return;
  playerState.stepIndex = index;
  const step = playerState.steps[index];
  step.duration = step.baseDuration;
  playerState.remaining = step.duration;
  stepEndTimeMs = Date.now() + playerState.remaining * 1000;
  renderPlayer();
}

function advanceStep() {
  if (playerState.stepIndex < playerState.steps.length - 1) {
    const nextIdx = playerState.stepIndex + 1;
    const nextStep = playerState.steps[nextIdx];
    playTone(nextStep.type === 'work' ? 587 : 392, 0.4);
    goToStep(nextIdx);
  } else {
    finishWorkout();
  }
}

function jumpToAdjacentExercise(direction) {
  const curExIdx = playerState.steps[playerState.stepIndex]?.exerciseIndex ?? 0;
  const targetExIdx = curExIdx + direction;
  if (direction > 0) {
    const idx = playerState.steps.findIndex((s, i) => i > playerState.stepIndex && s.type === 'work' && s.exerciseIndex === targetExIdx);
    if (idx !== -1) {
      playTone(587, 0.25, 0.1);
      goToStep(idx);
    } else {
      finishWorkout();
    }
  } else {
    const idx = playerState.steps.findIndex((s) => s.type === 'work' && s.exerciseIndex === Math.max(0, targetExIdx));
    if (idx !== -1) {
      playTone(528, 0.25, 0.1);
      goToStep(idx);
    }
  }
}

function finishWorkout() {
  stopTicker();
  playerState.active = false;
  releaseWakeLock();
  playTone(660, 0.55);

  const totalSec = playerState.steps.reduce((acc, s) => acc + s.duration, 0);
  state.history.unshift({
    dateISO: new Date().toISOString(),
    title: playerState.title,
    minutes: Math.max(1, Math.round(totalSec / 60)),
    count: playerState.steps[playerState.steps.length - 1]?.totalExercises || 1
  });
  saveState();

  document.getElementById('player-stage').innerHTML = `
    <div class="bento-card accent-lime" style="margin-top:20px;">
      <span class="card-badge">Session abgeschlossen</span>
      <h2 class="card-title">Stark gemacht!</h2>
      <p class="card-sub">Alle Übungen erfolgreich absolviert. Prüfe jetzt kurz deine Ausrichtung im Tab „Haltung“ (6-Punkte-BodyMap).</p>
      <button id="btn-finish-close" class="btn-dark-pill">Zurück zur App</button>
    </div>
  `;
  document.getElementById('player-side-pills').innerHTML = '';
  document.getElementById('player-step-fill').style.width = '100%';
  document.getElementById('player-phase-cue').classList.add('hidden');
  document.getElementById('player-subbar').classList.add('hidden');
  document.getElementById('player-time-display').textContent = '00:00';
  document.getElementById('btn-finish-close').onclick = () => {
    playerEl.classList.add('hidden');
    render();
  };
}

function getSubPhaseInfo(ex, elapsed) {
  if (!ex.timerPhases || ex.timerPhases.length === 0) return null;
  const cycleLen = ex.timerPhases.reduce((sum, p) => sum + p.seconds, 0);
  if (!cycleLen) return null;
  let pos = elapsed % cycleLen;
  for (const ph of ex.timerPhases) {
    if (pos < ph.seconds) {
      return {
        label: ph.label,
        cue: ph.cue,
        pct: Math.min(100, ((pos + 1) / ph.seconds) * 100)
      };
    }
    pos -= ph.seconds;
  }
  return null;
}

function updateTimerDisplay() {
  const step = playerState.steps[playerState.stepIndex];
  if (!step) return;
  document.getElementById('player-time-display').textContent = formatTime(playerState.remaining);
  document.getElementById('btn-play-pause').textContent = playerState.paused ? '▶' : '⏸';
  document.getElementById('player-mute').textContent = state.muted ? '🔇' : '🔊';

  let remTotal = playerState.remaining;
  for (let i = playerState.stepIndex + 1; i < playerState.steps.length; i++) {
    remTotal += playerState.steps[i].duration;
  }
  document.getElementById('player-total-left').textContent = formatTime(remTotal);

  const elapsedInStep = Math.max(0, step.duration - playerState.remaining);
  const stepPct = step.duration > 0 ? Math.min(100, (elapsedInStep / step.duration) * 100) : 0;
  document.getElementById('player-step-fill').style.width = `${stepPct}%`;

  const cueEl = document.getElementById('player-phase-cue');
  const subBarEl = document.getElementById('player-subbar');
  const subFillEl = document.getElementById('player-subbar-fill');

  if (step.type === 'work' && step.ex.timerPhases) {
    const info = getSubPhaseInfo(step.ex, elapsedInStep);
    if (info) {
      cueEl.classList.remove('hidden');
      subBarEl.classList.remove('hidden');
      cueEl.textContent = `${info.label} · ${info.cue}`;
      subFillEl.style.width = `${info.pct}%`;
      return;
    }
  }
  if (step.type === 'switch') {
    cueEl.classList.remove('hidden');
    subBarEl.classList.add('hidden');
    cueEl.textContent = 'Seite wechseln – Position auf rechts einnehmen';
  } else if (step.type === 'transition') {
    cueEl.classList.remove('hidden');
    subBarEl.classList.add('hidden');
    cueEl.textContent = `Gleich folgt: ${step.ex.name}`;
  } else {
    cueEl.classList.add('hidden');
    subBarEl.classList.add('hidden');
  }
}

function renderSidePills(step) {
  const container = document.getElementById('player-side-pills');
  if (!step.ex.bilateral || step.type === 'transition') {
    container.innerHTML = `<span class="side-pill active">${escapeHtml(step.sideLabel)}</span>`;
    return;
  }
  const exIdx = step.exerciseIndex;
  const leftIdx = playerState.steps.findIndex((s) => s.exerciseIndex === exIdx && s.sideTag === 'left');
  const switchIdx = playerState.steps.findIndex((s) => s.exerciseIndex === exIdx && s.sideTag === 'switch');
  const rightIdx = playerState.steps.findIndex((s) => s.exerciseIndex === exIdx && s.sideTag === 'right');

  container.innerHTML = [
    { label: 'Links', idx: leftIdx, active: step.sideTag === 'left' },
    { label: 'Wechsel', idx: switchIdx, active: step.sideTag === 'switch' },
    { label: 'Rechts', idx: rightIdx, active: step.sideTag === 'right' }
  ]
    .filter((p) => p.idx !== -1)
    .map((p) => `<button class="side-pill ${p.active ? 'active' : ''}" data-jump-step="${p.idx}" type="button">${p.label}</button>`)
    .join('');
}

function renderPlayer() {
  const step = playerState.steps[playerState.stepIndex];
  if (!step) return;
  const ex = step.ex;

  document.getElementById('player-step-label').textContent =
    `Übung ${step.exerciseIndex + 1} / ${step.totalExercises}`;
  const pct = ((playerState.stepIndex + 1) / playerState.steps.length) * 100;
  document.getElementById('player-progress-fill').style.width = `${pct}%`;
  document.getElementById('player-side-label').textContent = step.sideLabel;

  renderSidePills(step);

  document.getElementById('player-stage').innerHTML = `
    <span class="badge p${ex.phase}">${PHASES[ex.phase].short}</span>
    <h2 class="player-ex-title">${escapeHtml(ex.name)}</h2>
    <div class="visual-pair">
      <div>${renderVisualHtml(ex)}</div>
      <div>${renderBodyHotspotSVG(ex.bodyHotspots, ex.phase)}</div>
    </div>
    <div class="detail-block">
      <h4>Ausführung</h4>
      <ol>${ex.execution.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
    </div>
    <div class="detail-block">
      <h4>Atmung &amp; Fehler vermeiden</h4>
      <p style="margin:0 0 6px;font-size:0.84rem;"><strong>Atmung:</strong> ${escapeHtml(ex.breathing)}</p>
      <ul>${ex.commonMistakes.map((m) => `<li>${escapeHtml(m)}</li>`).join('')}</ul>
    </div>
  `;

  updateTimerDisplay();
}

// Player Controls
document.getElementById('player-side-pills').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-jump-step]');
  if (btn) {
    goToStep(Number(btn.dataset.jumpStep));
  }
});

document.getElementById('player-close').onclick = () => {
  stopTicker();
  playerState.active = false;
  releaseWakeLock();
  playerEl.classList.add('hidden');
};

document.getElementById('player-mute').onclick = () => {
  state.muted = !state.muted;
  saveState();
  updateTimerDisplay();
};

document.getElementById('btn-play-pause').onclick = () => {
  ensureAudio();
  playerState.paused = !playerState.paused;
  if (playerState.paused) {
    releaseWakeLock();
  } else {
    stepEndTimeMs = Date.now() + playerState.remaining * 1000;
    requestWakeLock();
  }
  updateTimerDisplay();
};

document.getElementById('btn-minus-15').onclick = () => {
  const step = playerState.steps[playerState.stepIndex];
  playerState.remaining = Math.max(5, playerState.remaining - 15);
  if (step) step.duration = Math.max(playerState.remaining, step.duration);
  stepEndTimeMs = Date.now() + playerState.remaining * 1000;
  updateTimerDisplay();
};

document.getElementById('btn-plus-15').onclick = () => {
  const step = playerState.steps[playerState.stepIndex];
  playerState.remaining += 15;
  if (step && playerState.remaining > step.duration) step.duration = playerState.remaining;
  stepEndTimeMs = Date.now() + playerState.remaining * 1000;
  updateTimerDisplay();
};

document.getElementById('btn-next-ex').onclick = () => {
  jumpToAdjacentExercise(1);
};

document.getElementById('btn-prev-ex').onclick = () => {
  jumpToAdjacentExercise(-1);
};

// ==================== GLOBAL EVENT DELEGATION ====================
document.querySelectorAll('.dock-btn').forEach((btn) => {
  btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
});

mainEl.addEventListener('click', (e) => {
  const t = e.target;

  // Startseite: Equipment & Zeit
  if (t.closest('#btn-home-nogear')) {
    state.availableEquipment = [];
    saveState();
    renderHome();
    return;
  }
  if (t.closest('#btn-home-allgear')) {
    state.availableEquipment = [...ALL_EQUIP_IDS];
    saveState();
    renderHome();
    return;
  }
  const homeEquipBtn = t.closest('[data-home-equip]');
  if (homeEquipBtn) {
    const val = homeEquipBtn.dataset.homeEquip;
    const arr = state.availableEquipment;
    state.availableEquipment = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
    saveState();
    renderHome();
    return;
  }
  const homeMinBtn = t.closest('[data-home-min]');
  if (homeMinBtn) {
    state.homeTargetMinutes = Number(homeMinBtn.dataset.homeMin);
    saveState();
    renderHome();
    return;
  }

  // Adaptive Routinen auf Startseite starten / anpassen
  const startAdaptBtn = t.closest('[data-start-adaptive]');
  if (startAdaptBtn) {
    const rid = startAdaptBtn.dataset.startAdaptive;
    const r = ROUTINES.find((x) => x.id === rid);
    if (r) {
      startWorkout(buildAdaptiveRoutineExercises(r), r.title);
    } else {
      const cr = state.customRoutines.find((x) => x.id === rid);
      if (cr) startWorkout(cr.exerciseIds, cr.title);
    }
    return;
  }
  const loadAdaptBtn = t.closest('[data-load-adaptive]');
  if (loadAdaptBtn) {
    const rid = loadAdaptBtn.dataset.loadAdaptive;
    const r = ROUTINES.find((x) => x.id === rid);
    if (r) {
      state.builderQueue = buildAdaptiveRoutineExercises(r);
      setActiveTab('builder');
    } else {
      const cr = state.customRoutines.find((x) => x.id === rid);
      if (cr) {
        state.builderQueue = [...cr.exerciseIds];
        setActiveTab('builder');
      }
    }
    return;
  }

  const delCustomBtn = t.closest('[data-delete-custom]');
  if (delCustomBtn) {
    const rid = delCustomBtn.dataset.deleteCustom;
    state.customRoutines = state.customRoutines.filter((x) => x.id !== rid);
    saveState();
    renderHome();
    return;
  }

  // Builder Chips
  const bRegion = t.closest('[data-b-region]');
  if (bRegion) {
    const val = bRegion.dataset.bRegion;
    const arr = state.builderConfig.regions;
    state.builderConfig.regions = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
    saveState();
    renderBuilder();
    return;
  }
  const bPhase = t.closest('[data-b-phase]');
  if (bPhase) {
    const val = Number(bPhase.dataset.bPhase);
    const arr = state.builderConfig.phases;
    state.builderConfig.phases = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
    saveState();
    renderBuilder();
    return;
  }
  const bEquip = t.closest('[data-b-equip]');
  if (bEquip) {
    state.builderConfig.equipMode = bEquip.dataset.bEquip;
    saveState();
    renderBuilder();
    return;
  }
  const bMin = t.closest('[data-b-min]');
  if (bMin) {
    state.builderConfig.targetMinutes = Number(bMin.dataset.bMin);
    saveState();
    renderBuilder();
    return;
  }

  if (t.closest('#btn-generate-plan')) {
    generateSmartQueue();
    return;
  }
  if (t.closest('#btn-sort-science')) {
    state.builderQueue.sort((a, b) => getExerciseById(a).phase - getExerciseById(b).phase);
    saveState();
    renderBuilder();
    return;
  }
  if (t.closest('#btn-start-queue')) {
    startWorkout(state.builderQueue, 'Eigener Baukasten');
    return;
  }
  if (t.closest('#btn-save-custom')) {
    const name = prompt('Name für deine Routine:', 'Meine Session');
    if (name && name.trim()) {
      state.customRoutines.push({
        id: `custom-${Date.now()}`,
        title: name.trim(),
        goal: `${state.builderQueue.length} Übungen aus deinem Baukasten`,
        exerciseIds: [...state.builderQueue]
      });
      saveState();
      setActiveTab('home');
    }
    return;
  }

  // Queue Manipulation
  const qUp = t.closest('[data-q-up]');
  if (qUp) {
    const idx = Number(qUp.dataset.qUp);
    if (idx > 0) {
      [state.builderQueue[idx - 1], state.builderQueue[idx]] = [state.builderQueue[idx], state.builderQueue[idx - 1]];
      saveState();
      renderBuilder();
    }
    return;
  }
  const qDown = t.closest('[data-q-down]');
  if (qDown) {
    const idx = Number(qDown.dataset.qDown);
    if (idx < state.builderQueue.length - 1) {
      [state.builderQueue[idx + 1], state.builderQueue[idx]] = [state.builderQueue[idx], state.builderQueue[idx + 1]];
      saveState();
      renderBuilder();
    }
    return;
  }
  const qDel = t.closest('[data-q-del]');
  if (qDel) {
    const idx = Number(qDel.dataset.qDel);
    state.builderQueue.splice(idx, 1);
    saveState();
    renderBuilder();
    return;
  }

  // Library Filters
  const libPhase = t.closest('[data-lib-phase]');
  if (libPhase) {
    state.libPhase = libPhase.dataset.libPhase;
    saveState();
    renderLibrary();
    return;
  }
  const libReg = t.closest('[data-lib-region]');
  if (libReg) {
    state.libRegion = libReg.dataset.libRegion;
    saveState();
    renderLibrary();
    return;
  }
  if (t.closest('#btn-lib-travel')) {
    state.libTravelOnly = !state.libTravelOnly;
    saveState();
    renderLibrary();
    return;
  }

  // Open Exercise Detail
  const openEx = t.closest('[data-open-ex]');
  if (openEx) {
    openExerciseModal(openEx.dataset.openEx);
    return;
  }

  // BodyMap
  const bmToggle = t.closest('[data-bm-toggle]');
  if (bmToggle) {
    const pid = Number(bmToggle.dataset.bmToggle);
    state.bodymapChecked = state.bodymapChecked.includes(pid)
      ? state.bodymapChecked.filter((x) => x !== pid)
      : [...state.bodymapChecked, pid];
    state.bodymapActive = pid;
    saveState();
    renderPosture();
    return;
  }
  const bmSel = t.closest('[data-bm-select], [data-point-id]');
  if (bmSel) {
    const pid = Number(bmSel.dataset.bmSelect || bmSel.dataset.pointId);
    state.bodymapActive = pid;
    saveState();
    renderPosture();
    return;
  }
});

// ==================== FLOATING INSTALL BUTTON ====================
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const fabInstall = document.getElementById('fab-install');

if (!isStandalone && fabInstall) {
  fabInstall.classList.remove('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  fabInstall?.classList.remove('hidden');
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  fabInstall?.classList.add('hidden');
});

fabInstall?.addEventListener('click', async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt = null;
  } else {
    showToast('Im Browser-Menü „Zum Home-Bildschirm“ oder „App installieren“ wählen.');
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// Initial Render
setActiveTab(state.activeTab || 'home');
