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

const STORAGE_KEY = 'mobilab_state_v1';
const SWITCH_PAUSE_SEC = 10;
const TRANSITION_PAUSE_SEC = 8;

const DEFAULT_STATE = {
  activeTab: 'home',
  equipmentFilter: 'all',
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
  builderQueue: ['tfl-release', 'couch-stretch', 'bws-streckung-boden', 'luftberge-welle', 'scapula-pushups'],
  customDurations: {},
  customRoutines: [],
  bodymapChecked: [],
  bodymapActive: 1,
  history: [], // { dateISO, title, minutes, count }
  bannerDismissed: false,
  muted: false
};

let state = loadState();
let deferredInstallPrompt = null;

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
    // Ignorieren falls Speicher voll
  }
}

// ==================== HELPERS ====================
function getExerciseById(id) {
  return EXERCISES.find((e) => e.id === id);
}

function getExDuration(ex) {
  return state.customDurations[ex.id] || ex.defaultSeconds;
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

function getWeekStreakAndCount() {
  const now = new Date();
  const oneDay = 86400000;
  const sevenDaysAgo = now.getTime() - 7 * oneDay;
  const weekSessions = state.history.filter((h) => new Date(h.dateISO).getTime() >= sevenDaysAgo);
  const daysSet = new Set(state.history.map((h) => h.dateISO.slice(0, 10)));
  let streak = 0;
  let cursor = new Date(now.toISOString().slice(0, 10));
  while (daysSet.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor = new Date(cursor.getTime() - oneDay);
  }
  return {
    total: state.history.length,
    weekCount: weekSessions.length,
    streak
  };
}

function matchesEquipmentFilter(ex, filter) {
  if (filter === 'all') return true;
  if (filter === 'travel') return ex.travelFriendly;
  if (filter === 'ball') return ex.equipment.includes('ball') || ex.equipment.includes('none');
  if (filter === 'roller') return ex.equipment.includes('roller') || ex.equipment.includes('peanut') || ex.equipment.includes('none');
  if (filter === 'band') return ex.equipment.includes('band') || ex.equipment.includes('stab') || ex.equipment.includes('stange');
  return true;
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
    // Nicht auf jedem Browser unterstützt
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

// ---------- TAB 1: HOME ----------
function renderHome() {
  const stats = getWeekStreakAndCount();
  const heroRoutine = ROUTINES[0];
  const heroMins = Math.round(estimateTotalSeconds(heroRoutine.exerciseIds) / 60);

  const equipPills = [
    { id: 'all', label: 'Alle Geräte' },
    { id: 'travel', label: 'Ohne Geräte / Unterwegs' },
    { id: 'ball', label: 'Ball' },
    { id: 'roller', label: 'Rolle / Peanut' },
    { id: 'band', label: 'Band / Stab' }
  ];

  const allRoutines = [
    ...ROUTINES,
    ...state.customRoutines.map((cr) => ({
      ...cr,
      badge: 'Eigene Routine',
      accent: 'lavender',
      isCustom: true
    }))
  ];

  const filteredRoutines = allRoutines.filter((r) => {
    if (state.equipmentFilter === 'all') return true;
    return r.exerciseIds.some((id) => {
      const ex = getExerciseById(id);
      return ex && matchesEquipmentFilter(ex, state.equipmentFilter);
    });
  });

  mainEl.innerHTML = `
    <div class="bento-card accent-lime">
      <span class="card-badge">Empfohlene Session · 4 Phasen</span>
      <h1 class="card-title">${escapeHtml(heroRoutine.title)}</h1>
      <p class="card-sub">${escapeHtml(heroRoutine.goal)}</p>
      <div class="card-footer">
        <span style="font-weight:700;font-size:0.86rem;">~${heroMins} Min · ${heroRoutine.exerciseIds.length} Übungen</span>
        <button class="btn-dark-pill" data-start-routine="${heroRoutine.id}">▶ Jetzt starten</button>
      </div>
    </div>

    <div class="bento-grid-2">
      <div class="bento-card accent-lavender">
        <span class="stat-label">Wochen-Aktivität</span>
        <div class="stat-value">${stats.weekCount}×</div>
        <span class="stat-label">Sessions (7 Tage)</span>
      </div>
      <div class="bento-card accent-orchid">
        <span class="stat-label">Streak &amp; Gesamt</span>
        <div class="stat-value">${stats.streak}d</div>
        <span class="stat-label">${stats.total} Sessions gesamt</span>
      </div>
    </div>

    <div class="section-head">
      <h2 class="section-title">Dein Equipment heute</h2>
      <span class="section-meta">${EXERCISES.length} Übungen</span>
    </div>
    <div class="pill-row">
      ${equipPills.map((p) => `
        <button class="filter-pill ${state.equipmentFilter === p.id ? 'active' : ''}" data-equip="${p.id}">${p.label}</button>
      `).join('')}
    </div>

    <div class="section-head">
      <h2 class="section-title">Fokus-Routinen</h2>
      <span class="section-meta">${filteredRoutines.length} Pläne</span>
    </div>

    ${filteredRoutines.map((r) => {
      const mins = Math.round(estimateTotalSeconds(r.exerciseIds) / 60);
      const accentClass = r.accent ? `accent-${r.accent}` : '';
      return `
        <div class="bento-card ${accentClass}">
          <span class="card-badge">${escapeHtml(r.badge || 'Routine')}</span>
          <h3 class="card-title">${escapeHtml(r.title)}</h3>
          <p class="card-sub">${escapeHtml(r.goal || r.subtitle || '')}</p>
          <div class="card-footer">
            <span style="font-weight:700;font-size:0.82rem;">~${mins} Min · ${r.exerciseIds.length} Übungen</span>
            <div style="display:flex;gap:6px;">
              ${r.isCustom ? `<button class="btn-surface-pill" data-delete-custom="${r.id}" style="padding:8px 12px;">🗑</button>` : ''}
              <button class="btn-dark-pill" data-load-builder="${r.id}">Anpassen</button>
              <button class="btn-dark-pill" data-start-routine="${r.id}">▶</button>
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

  // Gleichmäßig über Phasen (1 -> 2 -> 3) und gewählte Regionen verteilen
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
      // Region rotieren für ausgewogenen Mix
      const targetReg = activeRegions[(round + p) % activeRegions.length];
      let candidate = list.find((e) => e.region === targetReg && !selected.includes(e.id));
      if (!candidate) candidate = list.find((e) => !selected.includes(e.id));
      if (!candidate) continue;

      const dur = getExDuration(candidate);
      const cost = (candidate.bilateral ? dur * 2 + SWITCH_PAUSE_SEC : dur) + TRANSITION_PAUSE_SEC;
      if (usedSec + cost <= budgetSec + 45 || selected.length < 3) {
        selected.push(candidate.id);
        usedSec += cost;
        added = true;
      }
    }
    round++;
  }

  // Wissenschaftliche Sortierung: Phase 1 -> 2 -> 3
  selected.sort((a, b) => getExerciseById(a).phase - getExerciseById(b).phase);
  state.builderQueue = selected;
  saveState();
  renderBuilder();
}

// ---------- TAB 3: ÜBUNGS-BIBLIOTHEK ----------
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

  mainEl.innerHTML = `
    <input id="lib-search-input" type="search" class="search-input" placeholder="Übung, Muskel oder Gerät suchen…" value="${escapeHtml(state.libSearch)}" />

    <div class="pill-row">
      <button class="filter-pill ${state.libPhase === 'all' ? 'active' : ''}" data-lib-phase="all">Alle Phasen</button>
      <button class="filter-pill ${state.libPhase === '1' ? 'active' : ''}" data-lib-phase="1">1 · Release</button>
      <button class="filter-pill ${state.libPhase === '2' ? 'active' : ''}" data-lib-phase="2">2 · Mobilisation</button>
      <button class="filter-pill ${state.libPhase === '3' ? 'active' : ''}" data-lib-phase="3">3 · Aktivierung</button>
      <button class="filter-pill ${state.libTravelOnly ? 'active' : ''}" id="btn-lib-travel">Ohne Geräte</button>
    </div>

    <div class="pill-row">
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
              ${ex.travelFriendly ? '<span>· ✈ Unterwegs</span>' : ''}
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

// ---------- TAB 4: HALTUNG (BODYMAP), WISSENSCHAFT & APP-INSTALLATION ----------
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
      <h2 class="section-title">Als Handy-App installieren (PWA)</h2>
    </div>
    <div class="bento-card accent-orchid">
      <span class="card-badge">Homescreen &amp; Offline</span>
      <h3 class="card-title">So wird MobiLab zur echten App</h3>
      <p class="card-sub" style="margin-bottom:10px;">Einmal installiert, startet MobiLab im Vollbild ohne Browser-Leiste und funktioniert auch im Flugmodus.</p>
      ${deferredInstallPrompt ? `<button id="btn-install-now" class="btn-dark-pill" style="margin-bottom:12px;">📲 Jetzt direkt installieren</button>` : ''}
      <div style="font-size:0.82rem;line-height:1.5;">
        <strong>Android (Chrome / Google Pixel):</strong>
        <ol style="margin:4px 0 10px;padding-left:18px;">
          <li>Oben rechts auf das <strong>⋮ Menü</strong> tippen.</li>
          <li><strong>„App installieren“</strong> bzw. <strong>„Zum Startbildschirm hinzufügen“</strong> wählen.</li>
          <li>Mit <strong>„Installieren“</strong> bestätigen.</li>
        </ol>
        <strong>iPhone (Safari):</strong>
        <ol style="margin:4px 0 0;padding-left:18px;">
          <li>Unten auf das <strong>Teilen-Symbol</strong> (Quadrat mit Pfeil nach oben) tippen.</li>
          <li>Nach unten scrollen und <strong>„Zum Home-Bildschirm“</strong> wählen.</li>
          <li>Oben rechts auf <strong>„Hinzufügen“</strong> tippen.</li>
        </ol>
      </div>
    </div>

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

// ==================== HANDS-FREE WORKOUT PLAYER ====================
const playerEl = document.getElementById('workout-player');
let playerState = {
  active: false,
  paused: false,
  title: '',
  steps: [], // { type: 'work'|'switch'|'transition', ex, sideLabel, duration, exerciseIndex, totalExercises }
  stepIndex: 0,
  remaining: 0,
  elapsedInStep: 0,
  intervalId: null
};

function buildPlayerSteps(exerciseIds) {
  const valid = exerciseIds.map(getExerciseById).filter(Boolean);
  const steps = [];
  valid.forEach((ex, idx) => {
    const dur = getExDuration(ex);
    if (ex.bilateral) {
      steps.push({
        type: 'work',
        ex,
        sideLabel: 'Links',
        duration: dur,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
      steps.push({
        type: 'switch',
        ex,
        sideLabel: 'Seitenwechsel → Rechts',
        duration: SWITCH_PAUSE_SEC,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
      steps.push({
        type: 'work',
        ex,
        sideLabel: 'Rechts',
        duration: dur,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
    } else {
      steps.push({
        type: 'work',
        ex,
        sideLabel: 'Beidseitig',
        duration: dur,
        exerciseIndex: idx,
        totalExercises: valid.length
      });
    }
    if (idx < valid.length - 1) {
      steps.push({
        type: 'transition',
        ex: valid[idx + 1],
        sideLabel: 'Nächste Übung',
        duration: TRANSITION_PAUSE_SEC,
        exerciseIndex: idx + 1,
        totalExercises: valid.length
      });
    }
  });
  return steps;
}

function startWorkout(exerciseIds, title = 'Training') {
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
    remaining: steps[0].duration,
    elapsedInStep: 0,
    intervalId: null
  };

  playerEl.classList.remove('hidden');
  playTone(528, 0.35);
  renderPlayer();
  startTicker();
}

function startTicker() {
  clearInterval(playerState.intervalId);
  playerState.intervalId = setInterval(() => {
    if (!playerState.active || playerState.paused) return;
    playerState.remaining -= 1;
    playerState.elapsedInStep += 1;

    if (playerState.remaining > 0 && playerState.remaining <= 3) {
      playTone(440, 0.12, 0.08);
    }

    if (playerState.remaining <= 0) {
      advanceStep();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function advanceStep() {
  if (playerState.stepIndex < playerState.steps.length - 1) {
    playerState.stepIndex += 1;
    const step = playerState.steps[playerState.stepIndex];
    playerState.remaining = step.duration;
    playerState.elapsedInStep = 0;
    playTone(step.type === 'work' ? 587 : 392, 0.4);
    renderPlayer();
  } else {
    finishWorkout();
  }
}

function finishWorkout() {
  clearInterval(playerState.intervalId);
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
  document.getElementById('player-phase-cue').classList.add('hidden');
  document.getElementById('player-subbar').classList.add('hidden');
  document.getElementById('player-time-display').textContent = '00:00';
  document.getElementById('btn-finish-close').onclick = () => {
    playerEl.classList.add('hidden');
    render();
  };
}

function getSubPhaseInfo(ex, elapsed, totalDur) {
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

  const cueEl = document.getElementById('player-phase-cue');
  const subBarEl = document.getElementById('player-subbar');
  const subFillEl = document.getElementById('player-subbar-fill');

  if (step.type === 'work' && step.ex.timerPhases) {
    const info = getSubPhaseInfo(step.ex, playerState.elapsedInStep, step.duration);
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

function renderPlayer() {
  const step = playerState.steps[playerState.stepIndex];
  if (!step) return;
  const ex = step.ex;

  document.getElementById('player-step-label').textContent =
    `Übung ${step.exerciseIndex + 1} / ${step.totalExercises}`;
  const pct = ((playerState.stepIndex + 1) / playerState.steps.length) * 100;
  document.getElementById('player-progress-fill').style.width = `${pct}%`;
  document.getElementById('player-side-label').textContent = step.sideLabel;

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
document.getElementById('player-close').onclick = () => {
  clearInterval(playerState.intervalId);
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
  if (playerState.paused) releaseWakeLock();
  else requestWakeLock();
  updateTimerDisplay();
};

document.getElementById('btn-minus-15').onclick = () => {
  playerState.remaining = Math.max(5, playerState.remaining - 15);
  updateTimerDisplay();
};

document.getElementById('btn-plus-15').onclick = () => {
  playerState.remaining += 15;
  updateTimerDisplay();
};

document.getElementById('btn-next-ex').onclick = () => {
  advanceStep();
};

document.getElementById('btn-prev-ex').onclick = () => {
  if (playerState.stepIndex > 0) {
    playerState.stepIndex -= 1;
    playerState.remaining = playerState.steps[playerState.stepIndex].duration;
    playerState.elapsedInStep = 0;
    renderPlayer();
  }
};

// ==================== GLOBAL EVENT DELEGATION ====================
document.querySelectorAll('.dock-btn').forEach((btn) => {
  btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
});

mainEl.addEventListener('click', (e) => {
  const t = e.target;

  const equipBtn = t.closest('[data-equip]');
  if (equipBtn) {
    state.equipmentFilter = equipBtn.dataset.equip;
    saveState();
    renderHome();
    return;
  }

  const startRoutineBtn = t.closest('[data-start-routine]');
  if (startRoutineBtn) {
    const rid = startRoutineBtn.dataset.startRoutine;
    const r = ROUTINES.find((x) => x.id === rid) || state.customRoutines.find((x) => x.id === rid);
    if (r) startWorkout(r.exerciseIds, r.title);
    return;
  }

  const loadBuilderBtn = t.closest('[data-load-builder]');
  if (loadBuilderBtn) {
    const rid = loadBuilderBtn.dataset.loadBuilder;
    const r = ROUTINES.find((x) => x.id === rid) || state.customRoutines.find((x) => x.id === rid);
    if (r) {
      state.builderQueue = [...r.exerciseIds];
      setActiveTab('builder');
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

  if (t.closest('#btn-install-now') && deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt = null;
  }
});

// ==================== PWA & INSTALL PROMPT ====================
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const bannerEl = document.getElementById('install-banner');
const headerInstallBtn = document.getElementById('btn-install-header');

if (!isStandalone && !state.bannerDismissed) {
  bannerEl.classList.remove('hidden');
}

document.getElementById('btn-install-banner').onclick = () => {
  setActiveTab('posture');
};

document.getElementById('btn-dismiss-banner').onclick = () => {
  state.bannerDismissed = true;
  saveState();
  bannerEl.classList.add('hidden');
};

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  headerInstallBtn.classList.remove('hidden');
});

headerInstallBtn.onclick = async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    deferredInstallPrompt = null;
    headerInstallBtn.classList.add('hidden');
  } else {
    setActiveTab('posture');
  }
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// Initial Render
setActiveTab(state.activeTab || 'home');
