// MobiLab – Offline-SVG-Generator für Posen-Illustrationen, Zielzonen-Körperkarte & 6-Punkte-BodyMap

const C_BG = '#18181C';
const C_FLOOR = '#2F2F37';
const C_BODY = '#E4E4EA';
const C_DIM = '#6A6A78';
const C_LIME = '#E2F67B';
const C_LAVENDER = '#B8A9F5';
const C_ORCHID = '#ECC8F9';

function accentForPhase(phase) {
  if (phase === 1) return C_LIME;
  if (phase === 2) return C_LAVENDER;
  return C_ORCHID;
}

// Kompakte, saubere Vektor-Silhouetten für alle Übungstypen
const POSE_SHAPES = {
  'side-lying-ball': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="115" cy="106" r="8" fill="${acc}"/>
    <circle cx="52" cy="82" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M62 88 L112 96 L168 106 L202 108" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M72 90 L55 112 L78 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M118 96 L142 78 L156 112" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'prone-roller-quad': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <rect x="132" y="99" width="20" height="15" rx="6" fill="${acc}"/>
    <circle cx="52" cy="76" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M62 82 L116 90 L198 104" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M74 84 L62 112 L84 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M116 90 L132 112 L152 112" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'seated-piriformis-ball': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="110" cy="107" r="8" fill="${acc}"/>
    <circle cx="78" cy="48" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M84 58 L106 98 L148 78 L166 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M88 66 L64 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M106 98 L138 66 L154 78" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'side-lying-roller-core': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="102" cy="104" r="11" fill="${acc}"/>
    <circle cx="56" cy="72" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M66 78 L104 92 L154 102 L198 108" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M74 82 L58 112 L80 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'prone-balls-belly': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="104" cy="107" r="7" fill="${acc}"/>
    <circle cx="116" cy="107" r="7" fill="${acc}" opacity="0.7"/>
    <circle cx="54" cy="88" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M64 94 L112 98 L196 108" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M74 96 L52 112 L72 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'wall-ball-pec': (acc) => `
    <line x1="176" y1="14" x2="176" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="164" cy="52" r="7.5" fill="${acc}"/>
    <circle cx="136" cy="34" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M142 44 L156 54 L132 82 L126 118" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M132 82 L150 118" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'wall-ball-pec-row': (acc) => `
    <line x1="176" y1="14" x2="176" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="164" cy="52" r="7.5" fill="${acc}"/>
    <circle cx="136" cy="34" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M142 44 L156 54 L132 82 L126 118" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M152 54 L112 58 L98 58" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M104 53 L95 58 L104 63" fill="none" stroke="${acc}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'supine-ball-arm-overhead': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="94" cy="107" r="7.5" fill="${acc}"/>
    <circle cx="66" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M77 101 L138 103 L164 78 L184 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M92 98 L92 52" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M88 64 L54 78" fill="none" stroke="${acc}" stroke-width="2.5" stroke-dasharray="4 4" stroke-linecap="round"/>
  `,
  'hinge-wall-ball-trap': (acc) => `
    <line x1="178" y1="14" x2="178" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="166" cy="46" r="7.5" fill="${acc}"/>
    <circle cx="156" cy="58" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M146 52 L106 64 L106 116" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M106 64 L122 116" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'side-lying-ball-lat': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="94" cy="106" r="8" fill="${acc}"/>
    <circle cx="52" cy="78" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M62 84 L102 98 L152 104 L196 108" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M74 88 L88 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'seated-adductor-elbow': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="110" cy="42" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M110 53 L106 96 L152 106 L168 96" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M110 62 L134 86 L142 102" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="142" cy="102" r="5" fill="${acc}"/>
  `,
  'supine-ball-ql': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="114" cy="107" r="7.5" fill="${acc}"/>
    <circle cx="56" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M67 101 L138 102 L166 78 L184 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'standing-subscap-stick': (acc) => `
    <circle cx="120" cy="28" r="12" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 40 L120 88 L108 122 M120 88 L132 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M104 48 L88 64 L106 72" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="94" y1="122" x2="104" y2="54" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="104" cy="54" r="5" fill="${acc}"/>
  `,
  'seated-calf-ball': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="164" cy="106" r="8" fill="${acc}"/>
    <circle cx="62" cy="52" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M68 62 L76 102 L140 102 L192 98" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M74 68 L112 96" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'seated-shin-ball': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="148" cy="96" r="7.5" fill="${acc}"/>
    <circle cx="64" cy="52" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M70 62 L80 102 L126 76 L154 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M78 68 L128 84 L144 92" fill="none" stroke="${acc}" stroke-width="3" stroke-linecap="round"/>
  `,
  'box-hamstring-ball': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <rect x="64" y="76" width="52" height="39" rx="4" fill="${C_FLOOR}"/>
    <circle cx="106" cy="70" r="7" fill="${acc}"/>
    <circle cx="88" cy="34" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M88 45 L88 70 L142 68 L184 72" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'supine-ball-spine': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="96" cy="107" r="7.5" fill="${acc}"/>
    <circle cx="56" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M67 101 L138 102 L166 78 L184 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M90 96 L106 84" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'bar-arm-smash': (acc) => `
    <line x1="40" y1="54" x2="200" y2="54" stroke="${acc}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="120" cy="36" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 47 L120 118" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M120 56 L154 52 L154 32" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'ankle-cycle': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <path d="M98 30 L102 98 L142 112" fill="none" stroke="${C_BODY}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M126 88 Q144 96 144 112" fill="none" stroke="${acc}" stroke-width="3" stroke-dasharray="4 3" stroke-linecap="round"/>
    <circle cx="104" cy="100" r="8" fill="none" stroke="${acc}" stroke-width="2.5"/>
  `,
  'half-kneeling-ankle': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="118" cy="32" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M116 43 L110 80 L76 112 L52 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M110 80 L152 76 L158 112 L176 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="148" cy="70" r="7" fill="${acc}"/>
  `,
  'couch-stretch': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <line x1="48" y1="18" x2="48" y2="115" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="118" cy="30" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M114 41 L104 82 L68 112 L52 58" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M104 82 L154 82 L154 112 L172 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="98" cy="82" r="5.5" fill="${acc}"/>
  `,
  'supine-hamstring-band': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="56" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M67 101 L134 104 L196 108" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M134 104 L134 32" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="88" y1="96" x2="134" y2="34" stroke="${acc}" stroke-width="3" stroke-dasharray="5 3" stroke-linecap="round"/>
  `,
  'z-sit-pnf': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="144" cy="64" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M135 72 L102 102 L148 106 L168 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M102 102 L68 108 L44 96" fill="none" stroke="${C_DIM}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M148 106 L148 114" stroke="${acc}" stroke-width="4" stroke-linecap="round"/>
  `,
  'standing-neck-stretch': (acc) => `
    <circle cx="126" cy="34" r="13" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 46 L120 96 L108 122 M120 96 L132 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M100 54 L94 30 L118 22" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M140 54 L148 92" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'overhead-bar-reach': (acc) => `
    <line x1="60" y1="18" x2="180" y2="18" stroke="${acc}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="128" cy="54" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M116 48 L120 18" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M118 52 L112 88 L112 120" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M136 54 L154 54" stroke="${acc}" stroke-width="2.5" stroke-linecap="round"/>
  `,
  'wall-peanut-thoracic': (acc) => `
    <line x1="176" y1="14" x2="176" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="164" cy="54" r="7" fill="${acc}"/>
    <circle cx="138" cy="30" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M142 41 L154 58 L142 86 L122 92 L122 120" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M146 54 L126 58" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'supine-first-rib-stick': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M73 101 L142 103 L172 78 L190 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="86" y1="42" x2="86" y2="96" stroke="${acc}" stroke-width="4" stroke-linecap="round"/>
    <path d="M88 94 L122 66" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'deep-lunge-mob': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="136" cy="56" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M126 62 L96 86 L54 112 L34 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M96 86 L146 74 L152 112 L170 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M126 66 L126 112" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'quadruped-hip-capsule': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="72" cy="56" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M82 62 L146 66 L146 112 L174 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M88 64 L88 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="146" cy="66" r="6" fill="${acc}"/>
  `,
  'lunge-hamstring-floss': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="136" cy="54" r="10" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M126 60 L92 64 L54 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M92 64 L148 112 L166 112" fill="none" stroke="${acc}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M126 66 L126 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'kneeling-side-arc': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="144" cy="40" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M114 112 L114 82 Q120 56 138 48" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M132 50 Q152 24 176 44" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'supine-peanut-thoracic': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="96" cy="106" r="8" fill="${acc}"/>
    <circle cx="58" cy="100" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M68 102 Q96 86 136 102 L166 78 L184 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M96 92 L116 78" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'side-lying-sleeper': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="96" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M73 98 L142 102 L192 106" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M88 100 L118 96 L118 66" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M92 88 L118 66" fill="none" stroke="${C_BODY}" stroke-width="3" stroke-linecap="round"/>
  `,
  'standing-wrist-flow': (acc) => `
    <circle cx="120" cy="30" r="11.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 42 L120 92 L108 122 M120 92 L132 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M104 52 L84 68 L74 56" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M136 52 L156 68 L166 56" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="74" cy="54" r="5" fill="${acc}"/>
    <circle cx="166" cy="54" r="5" fill="${acc}"/>
  `,
  'seated-bear-sit': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="120" cy="40" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 51 L120 92" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M120 92 L82 76 L72 110" fill="none" stroke="${acc}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M120 92 L158 76 L168 110" fill="none" stroke="${acc}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'quadruped-adductor-rocks': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="120" cy="46" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 57 L120 88 L108 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M120 88 L186 112" fill="none" stroke="${acc}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M104 64 L96 112 M136 64 L144 112" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'supine-wall-squat-ir': (acc) => `
    <line x1="178" y1="14" x2="178" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <line x1="20" y1="115" x2="178" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="54" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M65 101 L122 103 L134 62 L174 62" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="134" cy="62" r="5.5" fill="${acc}"/>
  `,
  'box-pigeon': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <rect x="122" y="70" width="64" height="45" rx="4" fill="${C_FLOOR}"/>
    <circle cx="132" cy="34" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M124 43 L98 68 L44 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M98 68 L148 66 L168 66" fill="none" stroke="${acc}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'standing-rollup-victory': (acc) => `
    <circle cx="116" cy="30" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M118 41 Q122 68 118 90 L112 122 M118 90 L126 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M118 52 L84 32 M118 52 L152 32" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'lunge-thoracic-rotation': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="128" cy="54" r="10" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M122 62 L92 84 L50 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M92 84 L144 74 L148 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M120 62 L120 20" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'standing-hinge-stick-behind': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="152" cy="64" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M142 62 L98 62 L98 114" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M134 62 L114 28" fill="none" stroke="${acc}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="114" cy="28" r="4.5" fill="${acc}"/>
  `,
  'standing-bully-frame': (acc) => `
    <line x1="92" y1="14" x2="92" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="136" cy="30" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M136 41 L136 86 L128 120 M136 86 L146 120" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M134 48 L112 64 L94 64" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'standing-banded-bully': (acc) => `
    <line x1="60" y1="14" x2="60" y2="122" stroke="${C_FLOOR}" stroke-width="4" stroke-linecap="round"/>
    <line x1="60" y1="48" x2="130" y2="48" stroke="${acc}" stroke-width="3" stroke-dasharray="5 3"/>
    <circle cx="136" cy="30" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M136 41 L136 86 L122 120 M136 86 L152 120" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M134 50 L118 68" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'prone-t-twist': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="64" cy="96" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M74 98 L138 102 L192 108" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M88 100 L64 112" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M96 96 L112 112" fill="none" stroke="${C_DIM}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'kneeling-prayer-stretch': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <rect x="166" y="64" width="38" height="51" rx="4" fill="${C_FLOOR}"/>
    <circle cx="122" cy="76" r="10" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M114 70 L72 78 L72 112 L48 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M118 68 L174 64" fill="none" stroke="${acc}" stroke-width="4" stroke-linecap="round"/>
  `,
  'supine-scapular-roll': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M73 101 L142 103 L194 106" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M94 103 L112 110" fill="none" stroke="${acc}" stroke-width="4" stroke-linecap="round"/>
  `,
  'quadruped-wrist-rocks': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="72" cy="54" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M82 60 L146 64 L146 112 L172 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M88 62 L88 112 L76 112" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'kneeling-biceps-ledge': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <rect x="44" y="64" width="38" height="51" rx="4" fill="${C_FLOOR}"/>
    <circle cx="136" cy="48" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M132 58 L120 88 L120 112 L98 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M128 62 L76 64" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
  `,
  'supine-breathing-wave': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="56" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M67 101 L138 103 L166 78 L184 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M88 92 Q104 82 120 92" fill="none" stroke="${acc}" stroke-width="3" stroke-linecap="round"/>
    <path d="M96 86 L112 86" stroke="${acc}" stroke-width="2" stroke-dasharray="3 3"/>
  `,
  'standing-bracing': (acc) => `
    <circle cx="120" cy="28" r="11.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 40 L120 88 L108 122 M120 88 L132 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <rect x="108" y="60" width="24" height="22" rx="6" fill="none" stroke="${acc}" stroke-width="3"/>
    <path d="M96 68 L106 68 M144 68 L134 68" stroke="${acc}" stroke-width="2.5" stroke-linecap="round"/>
  `,
  'wall-posture-breath': (acc) => `
    <line x1="152" y1="14" x2="152" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="138" cy="28" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M142 39 L144 86 L132 120" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="134" y="58" width="14" height="22" rx="4" fill="${acc}" opacity="0.85"/>
  `,
  'wall-hip-flexion': (acc) => `
    <line x1="152" y1="14" x2="152" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="138" cy="28" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M142 39 L144 86 L142 120" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M144 84 L108 72 L108 100" fill="none" stroke="${acc}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'supine-l-activation': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="64" cy="99" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M75 101 L142 103 L142 30" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="110" y="92" width="22" height="12" rx="4" fill="${acc}"/>
  `,
  'quadruped-frontsquat': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="72" cy="50" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M82 56 L146 66 L146 112 L174 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M88 60 L88 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M96 66 L78 52" stroke="${acc}" stroke-width="3" stroke-linecap="round"/>
  `,
  'wall-squat': (acc) => `
    <line x1="164" y1="14" x2="164" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="144" cy="40" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M148 51 L154 88 L112 88 L112 120" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="142" y="64" width="12" height="20" rx="4" fill="${acc}"/>
  `,
  'plank-stick': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="56" cy="76" r="10" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M66 80 L192 98" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M72 82 L64 112 L84 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="52" y1="64" x2="152" y2="79" stroke="${acc}" stroke-width="4" stroke-linecap="round"/>
  `,
  'standing-band-er': (acc) => `
    <line x1="48" y1="14" x2="48" y2="122" stroke="${C_FLOOR}" stroke-width="4" stroke-linecap="round"/>
    <line x1="48" y1="70" x2="148" y2="70" stroke="${acc}" stroke-width="3" stroke-dasharray="5 3"/>
    <circle cx="122" cy="30" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M122 41 L122 88 L110 122 M122 88 L134 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M122 52 L122 70 L148 70" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'supine-snow-angel': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="120" cy="36" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 47 L120 96 L108 114 M120 96 L132 114" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M104 52 L74 36 L68 20" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M136 52 L166 36 L172 20" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'standing-scapula-spread': (acc) => `
    <line x1="162" y1="14" x2="162" y2="122" stroke="${C_FLOOR}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="150" cy="54" r="6.5" fill="${acc}"/>
    <circle cx="126" cy="32" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M126 43 L126 90 L114 122 M126 90 L138 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M140 52 L140 72 L118 72" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  `,
  'quadruped-scap-pushup': (acc) => `
    <line x1="20" y1="115" x2="220" y2="115" stroke="${C_FLOOR}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="72" cy="54" r="10.5" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M82 60 L146 64 L146 112 L172 112" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M88 60 L88 112" fill="none" stroke="${C_BODY}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M96 46 L96 66" stroke="${acc}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="96" cy="56" r="5" fill="${acc}"/>
  `,
  'standing-bottom-up': (acc) => `
    <circle cx="120" cy="34" r="11" fill="none" stroke="${C_BODY}" stroke-width="3.5"/>
    <path d="M120 45 L120 92 L108 122 M120 92 L132 122" fill="none" stroke="${C_BODY}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M134 54 L142 26" fill="none" stroke="${acc}" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M134 12 L150 12 L146 22 L138 22 Z" fill="${acc}"/>
  `
};

export function renderPoseSVG(poseKey, phase = 1) {
  const acc = accentForPhase(phase);
  const shapeFn = POSE_SHAPES[poseKey] || POSE_SHAPES['standing-bracing'];
  return `
    <svg viewBox="0 0 240 132" class="pose-svg" aria-hidden="true">
      <rect width="240" height="132" rx="16" fill="${C_BG}"/>
      <circle cx="205" cy="24" r="38" fill="none" stroke="${acc}" stroke-opacity="0.12" stroke-width="1.5"/>
      <circle cx="205" cy="24" r="22" fill="none" stroke="${acc}" stroke-opacity="0.18" stroke-width="1.5"/>
      ${shapeFn(acc)}
    </svg>
  `;
}

export function renderBodyHotspotSVG(hotspots = [], phase = 1) {
  const acc = accentForPhase(phase);
  const view = hotspots[0]?.view || 'front';

  const silhouette = view === 'side'
    ? `
      <circle cx="50" cy="14" r="7" fill="none" stroke="${C_DIM}" stroke-width="2"/>
      <path d="M50 21 L50 50 L48 92 L55 94" fill="none" stroke="${C_DIM}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 26 L44 46" fill="none" stroke="${C_DIM}" stroke-width="3" stroke-linecap="round"/>
    `
    : `
      <circle cx="50" cy="14" r="7" fill="none" stroke="${C_DIM}" stroke-width="2"/>
      <path d="M36 26 L64 26 L58 52 L42 52 Z" fill="none" stroke="${C_DIM}" stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M36 26 L26 50 M64 26 L74 50" fill="none" stroke="${C_DIM}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M44 52 L40 92 M56 52 L60 92" fill="none" stroke="${C_DIM}" stroke-width="3" stroke-linecap="round"/>
    `;

  const dots = hotspots.map((pt) => `
    <circle cx="${pt.x}" cy="${pt.y}" r="8" fill="${acc}" fill-opacity="0.25"/>
    <circle cx="${pt.x}" cy="${pt.y}" r="4" fill="${acc}"/>
  `).join('');

  return `
    <svg viewBox="0 0 100 104" class="hotspot-svg" aria-hidden="true">
      <rect width="100" height="104" rx="14" fill="${C_BG}"/>
      ${silhouette}
      ${dots}
    </svg>
  `;
}

export function renderBodyMapInteractiveSVG(points, checkedIds = [], activeId = null) {
  const yPositions = {
    1: 30,  // Neutraler Nacken / Kopf
    3: 56,  // Neutrale Schulter
    2: 76,  // Brustkorb & BWS
    4: 96,  // TVA-Aktivierung
    5: 118, // Neutraler unterer Rücken & Hüfte
    6: 194  // Gerader Fuß & Gewölbe
  };

  const markers = points.map((p) => {
    const isChecked = checkedIds.includes(p.id);
    const isActive = activeId === p.id;
    const fill = isChecked ? C_LIME : (isActive ? C_LAVENDER : '#2C2C35');
    const textCol = (isChecked || isActive) ? '#121214' : '#FFFFFF';
    const strokeCol = isActive ? '#FFFFFF' : (isChecked ? C_LIME : C_LAVENDER);
    const y = yPositions[p.id] ?? (p.sideY * 2.1);
    const x = p.id % 2 === 0 ? 148 : 52;
    const lineEnd = p.id % 2 === 0 ? 114 : 86;

    return `
      <g class="bodymap-node" data-point-id="${p.id}" style="cursor:pointer;">
        <line x1="100" y1="${y}" x2="${lineEnd}" y2="${y}" stroke="${strokeCol}" stroke-width="1.5" stroke-dasharray="2 2"/>
        <circle cx="${x}" cy="${y}" r="11" fill="${fill}" stroke="${strokeCol}" stroke-width="2"/>
        <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" font-weight="700" fill="${textCol}">${p.id}</text>
      </g>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 200 220" class="bodymap-svg" role="img" aria-label="Interaktive 6-Punkte-BodyMap">
      <rect width="200" height="220" rx="22" fill="#18181C"/>
      <line x1="100" y1="12" x2="100" y2="208" stroke="#2D2D36" stroke-width="1" stroke-dasharray="4 4"/>
      <!-- Aufrechte Silhouette -->
      <circle cx="100" cy="30" r="12" fill="none" stroke="#8C8C9A" stroke-width="2.5"/>
      <path d="M80 54 L120 54 L114 106 L86 106 Z" fill="none" stroke="#8C8C9A" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M80 54 L66 102 M120 54 L134 102" fill="none" stroke="#8C8C9A" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M90 106 L86 196 L78 202 M110 106 L114 196 L122 202" fill="none" stroke="#8C8C9A" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      ${markers}
    </svg>
  `;
}

export function getAvailablePoseKeys() {
  return Object.keys(POSE_SHAPES);
}
