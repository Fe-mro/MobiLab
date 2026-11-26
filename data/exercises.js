// MobiLab – Evidenzbasierte Übungsdatenbank (65 Übungen), BodyMap, Routinen & Quellen
// Alle Beschreibungen sind eigenständig, biomechanisch präzise und ohne urheberrechtlich geschützte Originaltexte formuliert.

export const PHASES = {
  1: {
    id: 1,
    short: 'Phase 1 · Release',
    title: 'Myofaszialer Release',
    subtitle: 'Spannung senken & Triggerpunkte lösen',
    color: 'lime',
    scienceNote: '60–90 s pro Zielzone erhöhen akut die Gewebenachgiebigkeit und Gelenkbeweglichkeit ohne Kraftverlust.'
  },
  2: {
    id: 2,
    short: 'Phase 2 · Mobilisation',
    title: 'Mobilisation & Dehnung',
    subtitle: 'Gelenkkapsel, PNF & Bewegungsradius',
    color: 'lavender',
    scienceNote: 'Nutzt das durch Release geöffnete Fenster; PNF und gezielte Dehnung vergrößern den Bewegungsumfang nachhaltig.'
  },
  3: {
    id: 3,
    short: 'Phase 3 · Aktivierung',
    title: 'Aktivierung & Stabilität',
    subtitle: 'TVA, Skapula & aktive Kontrolle',
    color: 'orchid',
    scienceNote: 'Verankert die neu gewonnene Beweglichkeit direkt im Nervensystem und stabilisiert Gelenke unter Last.'
  }
};

export const REGIONS = {
  'fuss': 'Fuß & Sprunggelenk',
  'huefte-beine': 'Hüfte & Beine',
  'rumpf': 'Rumpf & Atmung',
  'bws-ruecken': 'BWS & Rücken',
  'schulter-nacken': 'Schulter & Nacken',
  'arme-hand': 'Arme & Handgelenk'
};

export const SCIENTIFIC_SOURCES = [
  {
    id: 'wilke-2020',
    title: 'Acute Effects of Foam Rolling on Range of Motion in Healthy Adults: A Systematic Review with Multilevel Meta-analysis',
    authors: 'Wilke J., Müller A.-L., Giesche F., Power G., Ahmedi H., Behm D. G.',
    journal: 'Sports Medicine (2020)',
    pmid: '31628662',
    url: 'https://pubmed.ncbi.nlm.nih.gov/31628662/',
    takeaway: 'Bereits 60–90 s myofaszialer Release pro Muskelgruppe steigern akut den Bewegungsumfang (SMD ≈ 0,74) – vergleichbar mit Dehnen, ohne die Kraftleistung zu mindern.'
  },
  {
    id: 'konrad-2022',
    title: 'Foam Rolling Training Effects on Range of Motion: A Systematic Review and Meta-Analysis',
    authors: 'Konrad A., Nakamura M., Tilp M., Donti O., Behm D. G.',
    journal: 'Sports Medicine (2022)',
    pmid: '35616852',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35616852/',
    takeaway: 'Dauerhafte Beweglichkeitsanpassungen entstehen ab Programmdauern über 4 Wochen bei regelmäßiger Anwendung.'
  },
  {
    id: 'konrad-2024',
    title: 'Chronic effects of stretching on range of motion with consideration of potential moderating variables',
    authors: 'Konrad A., Alizadeh S., Daneshjoo A., Behm D. G. et al.',
    journal: 'Journal of Sport and Health Science (2024)',
    pmid: '37301370',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37301370/',
    takeaway: 'PNF-Dehntechniken (Anspannen–Loslassen) und statisches Dehnen erzielen langfristig die größten Zuwächse im Gelenk-Bewegungsumfang.'
  }
];

export const BODYMAP_POINTS = [
  {
    id: 1,
    title: 'Neutraler Nacken',
    cue: 'Kopf mittig als Verlängerung der Wirbelsäule',
    sideY: 16,
    frontY: 16,
    details: [
      'Der Kopf steht mittig über dem Rumpf, weder vorgeschoben noch in den Nacken gelegt.',
      'Vorstellung: Ein feiner Faden zieht deinen Scheitel sanft nach oben, das Kinn bleibt waagerecht.',
      'Die Nackenmuskulatur arbeitet nur minimal – ohne Verkrampfung.'
    ]
  },
  {
    id: 2,
    title: 'Aufgerichteter Brustkorb & BWS',
    cue: 'Brustbein angehoben, Rippenbogen unten kontrolliert',
    sideY: 31,
    frontY: 31,
    details: [
      'Die Brustwirbelsäule (BWS) ist gestreckt, das Brustbein hebt sich leicht an („stolze Brust“).',
      'Gleichzeitig bleibt der untere Rippenbogen durch leichte Aktivität der geraden Bauchmuskulatur sanft nach unten verankert – kein Überstrecken.',
      'Beim Einatmen dehnt sich der Brustkorb dreidimensional aus.'
    ]
  },
  {
    id: 3,
    title: 'Neutrale Schulter',
    cue: 'Hinten-unten zentriert, Daumen nach vorn',
    sideY: 28,
    frontY: 28,
    details: [
      'Der Oberarmkopf liegt zentriert hinten und unten in der Gelenkpfanne.',
      'Leichte Außenrotation der Arme, sodass die Daumen im entspannten Stand nach vorn zeigen.',
      'Die Schulterblätter liegen flach am Brustkorb an und sind minimal nach außen abgespreizt, ohne sie krampfhaft zusammenzupressen.'
    ]
  },
  {
    id: 4,
    title: 'TVA-Aktivierung & Rumpfzylinder',
    cue: '360°-Rumpfspannung verbindet Ober- und Unterkörper',
    sideY: 44,
    frontY: 44,
    details: [
      'Der tiefe quere Bauchmuskel (M. transversus abdominis, TVA) verbindet Brustkorb und Becken zu einer stabilen Einheit.',
      'Den Bauchnabel unter moderater Spannung sanft Richtung Wirbelsäule ziehen – spürbare Festigkeit auch an den Flanken.',
      'Das Zwerchfell drückt bei der Atmung in diesen stabilen Zylinder nach unten.'
    ]
  },
  {
    id: 5,
    title: 'Neutraler unterer Rücken & Hüftbalance',
    cue: 'Flache LWS, leichter Posterior Tilt & Gesäßtonus',
    sideY: 51,
    frontY: 51,
    details: [
      'Direkte Folge der TVA-Aktivierung: Die Lendenwirbelsäule bleibt in einer flachen, neutralen Position.',
      'Das Becken richtet sich neutral aus – meist ist dafür ein leichtes Kippen des Steißbeins nach vorn-unten (Posterior Tilt) nötig.',
      'Sanfte Grundspannung in der Gesäßmuskulatur (Glutei) stützt das Becken.'
    ]
  },
  {
    id: 6,
    title: 'Gerader Fuß & aktives Gewölbe',
    cue: '3-Punkte-Stand & Knie über 1./2. Zeh',
    sideY: 92,
    frontY: 92,
    details: [
      'Die Fußspitzen zeigen möglichst gerade nach vorn (bis ca. 10–12° Außenrotation sind biomechanisch gut tolerierbar).',
      'Eine leichte Außenrotation aus der Hüfte richtet das Fußgewölbe auf; die Knie folgen exakt der Linie zwischen erstem und zweitem Zeh.',
      'Gewicht gleichmäßig auf drei Kontaktpunkte verteilen: Ferse, Großzehenballen und Kleinzehenballen.'
    ]
  }
];

export const PRACTICE_PRINCIPLES = [
  {
    title: 'Starte an Tag 1, nicht bei 100 %',
    text: 'Erzwinge keine perfekte Endposition, wenn Füße oder Rücken noch dagegen arbeiten. Verbessere die Ausrichtung Schritt für Schritt über Wochen – Konstanz schlägt Gewalt.'
  },
  {
    title: 'Aufwandslosigkeit statt Dauerkrampf',
    text: 'Zu Beginn braucht eine aufrechte Haltung oft 70–100 % bewusste Spannung gegen verkürzte Strukturen. Mit zunehmender Mobilität sinkt der nötige Kraftaufwand auf 20 % bis nahezu aufwandslos.'
  },
  {
    title: 'Tiefe Rumpfspannung (TVA)',
    text: 'Der oft unteraktive M. transversus abdominis stabilisiert die Lendenwirbelsäule wie ein körpereigenes Korsett und schützt vor Überlastungsschmerzen.'
  },
  {
    title: 'Brustkorb-Expansion & Ausatem-Kante',
    text: 'Moderat in Brustkorb und Bauch einatmen, sodass sich die Brust hebt. Dann langsam kräftig aus dem Bauch ausatmen und den Bauchnabel einziehen – so entsteht eine feste Spannungskante unterhalb der Rippen.'
  },
  {
    title: 'Neutrale Schulter ohne Überziehen',
    text: 'Zuerst die BWS aufrichten, dann die Schultern nur sanft nach hinten-unten führen und leicht vom Brustkorb abspreizen – nicht maximal in den Rücken einklemmen.'
  },
  {
    title: 'Hüft-Außenrotation als Spannungsimpuls',
    text: 'Gemeint ist kein „Entengang“ mit extrem abgedrehten Füßen, sondern ein sanftes Aktivieren der Gesäß-Außenrotatoren bei möglichst geraden Füßen, um Kniekollaps (Valgus) zu verhindern.'
  },
  {
    title: 'Fußstellung schrittweise anpassen',
    text: 'Ab einer zu starken Außenrotation der Füße geht Gesäßspannung für Kniebeugen, Laufen oder Heben verloren. Taste dich über Monate schrittweise an geradere Füße heran, ohne Schmerz.'
  }
];

export const EXERCISES = [
  // ==================== PHASE 1: MYOFASZIALER RELEASE ====================
  {
    id: 'tfl-release',
    name: 'TFL-Release (Seitliche Hüfte)',
    phase: 1,
    region: 'huefte-beine',
    equipment: ['ball'],
    equipmentAlt: 'Tennisball oder gerolltes festes Handtuch',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'M. tensor fasciae latae (seitliche Hüftvorderseite)',
    svgPose: 'side-lying-ball',
    bodyHotspots: [{ x: 35, y: 50, view: 'front' }, { x: 65, y: 50, view: 'front' }],
    image: null,
    setup: [
      'Einen Faszienball seitlich knapp oberhalb der Hosentasche unter die Hüfte legen.',
      'Seitlich auf dem Unterarm abgestützt auf den Ball ablegen.'
    ],
    execution: [
      'Körpergewicht kontrolliert in die empfindliche Hüftregion einsinken lassen.',
      'Contract & Relax anwenden: Hüftmuskulatur für 4–5 Sekunden gegen den Ball anspannen, danach bewusst vollständig locker lassen und tiefer einsinken.'
    ],
    breathing: 'Tief und ruhig durch die Nase ein- und langsam ausatmen, um den Muskeltonus zu senken.',
    commonMistakes: [
      'Zu schnelles Hin- und Herrollen ohne Verweilen auf der verspannten Stelle.',
      'Luft anhalten bei Druckschmerz – stattdessen bewusst ausatmen.'
    ]
  },
  {
    id: 'rectus-femoris-release',
    name: 'Rectus-Femoris-Release (Oberschenkel vorn)',
    phase: 1,
    region: 'huefte-beine',
    equipment: ['roller'],
    equipmentAlt: 'Stabile Trinkflasche oder Nudelholz',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'M. rectus femoris (vorderer Oberschenkel)',
    svgPose: 'prone-roller-quad',
    bodyHotspots: [{ x: 40, y: 62, view: 'front' }, { x: 60, y: 62, view: 'front' }],
    image: null,
    setup: [
      'In den Unterarmstütz gehen und die Rolle quer unter den vorderen Oberschenkel des gestreckten Beins legen.',
      'Das andere Bein seitlich anwinkeln und mit dem Knie leicht am Boden abstützen, um den Druck zu dosieren.'
    ],
    execution: [
      'Langsam den Oberschenkel entlang nach verspannten Punkten suchen.',
      'Sobald ein Triggerpunkt gefunden ist, nicht hin- und herrollen, sondern rund 60 Sekunden ruhig auf diesem Punkt einsinken und aktiv loslassen.'
    ],
    breathing: 'Gleichmäßig und tief in den Bauch atmen, mit jedem Ausatmen mehr Gewicht abgeben.',
    commonMistakes: [
      'Hektisches Auf- und Abrollen über den gesamten Muskel.',
      'Durchhängen im unteren Rücken – leichte Grundspannung im Rumpf halten.'
    ]
  },
  {
    id: 'glutaeus-medius-release',
    name: 'Glutaeus-Medius-Release (Seitliches Gesäß)',
    phase: 1,
    region: 'huefte-beine',
    equipment: ['ball'],
    equipmentAlt: 'Fester Tennisball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'M. glutaeus medius (oberes seitliches Gesäß)',
    svgPose: 'side-lying-ball',
    bodyHotspots: [{ x: 34, y: 48, view: 'side' }],
    image: null,
    setup: [
      'Den Bereich direkt neben dem tastbaren äußeren Hüftknochen Richtung Gesäß aufsuchen.',
      'Seitlich auf dem Unterarm abstützen und den Ball unter dieser seitlichen Gesäßpartie platzieren.'
    ],
    execution: [
      'Eine einzelne verspannte Stelle fokussieren und den Ball ruhig tief einsinken lassen.',
      'Minimale Mikrobewegungen (leicht vor/zurück oder seitlich kippen), statt großflächig herumzurollen.'
    ],
    breathing: 'Langsam und tief ein- und ausatmen, Schulter der Stützseite stabil halten.',
    commonMistakes: [
      'Direkt auf den knöchernen Hüftvorsprung (Trochanter) drücken statt auf das Muskelgewebe.',
      'Unkontrolliertes Herumrollen.'
    ]
  },
  {
    id: 'piriformis-release',
    name: 'Piriformis-Release (Tiefes Gesäß)',
    phase: 1,
    region: 'huefte-beine',
    equipment: ['ball'],
    equipmentAlt: 'Tennisball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'M. piriformis & tiefe Hüftaußenrotatoren',
    svgPose: 'seated-piriformis-ball',
    bodyHotspots: [{ x: 38, y: 53, view: 'side' }],
    image: null,
    setup: [
      'Auf den Boden setzen, Hände leicht nach hinten abgestützt, beide Beine zunächst aufstellen.',
      'Ball unter eine Gesäßhälfte legen und den Knöchel genau dieses Beins auf das Knie des anderen Beins ablegen (Figure-4-Position).'
    ],
    execution: [
      'Die Hüfte weit zur Seite des Balls abkippen, um wirklich an die tiefe Gesäßmuskulatur zu gelangen.',
      'Triggerpunkt suchen, verweilen und mit Contract & Relax arbeiten: Gesäß kurz gegen den Ball anspannen, dann tief loslassen.'
    ],
    breathing: 'Langsame, tiefe Atemzüge unterstützen die Entspannung der tiefen Außenrotatoren.',
    commonMistakes: [
      'Hüfte zu wenig zur Ballseite kippen – dann verfehlt der Ball den Piriformis.',
      'Zu viel Gewicht ohne Abstützung, sodass der Muskel reflektorisch gegenspannt.'
    ]
  },
  {
    id: 'seitlicher-bauch-release',
    name: 'Seitlicher Bauch- & Flanken-Release',
    phase: 1,
    region: 'rumpf',
    equipment: ['roller'],
    equipmentAlt: 'Weich umwickelte Trinkflasche',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Seitliche Bauchmuskulatur & Flanken (Obliqui)',
    svgPose: 'side-lying-roller-core',
    bodyHotspots: [{ x: 38, y: 42, view: 'front' }, { x: 62, y: 42, view: 'front' }],
    image: null,
    setup: [
      'Seitlich auf den Foam Roller legen, sodass die Rolle genau im Weichteilbereich zwischen unterem Rippenbogen und Beckenkamm liegt.'
    ],
    execution: [
      'Körpergewicht behutsam ablegen und langsam tief in die Rolle einsinken.',
      'In Zeitlupe von der hinteren Flanke/Rückenlinie bis nach vorn Richtung Bauchnabel drehen und an mehreren Stellen verweilen.'
    ],
    breathing: 'Tief in die gedrückte Flanke ein- und vollständig ausatmen, um Bauchspannung loszulassen.',
    commonMistakes: [
      'Die Rolle direkt auf den Rippen oder dem Beckenkamm platzieren.',
      'Zu hastige Bewegungen ohne Loslassen.'
    ]
  },
  {
    id: 'bauch-release-2-baelle',
    name: 'Oberbauch- & Zwerchfellansatz-Release',
    phase: 1,
    region: 'rumpf',
    equipment: ['ball'],
    equipmentAlt: 'Zwei Tennisbälle oder zusammengebundene Sockenpaare',
    travelFriendly: false,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Zwerchfellansatz & oberer Rectus abdominis',
    svgPose: 'prone-balls-belly',
    bodyHotspots: [{ x: 50, y: 37, view: 'front' }],
    image: null,
    setup: [
      'Zwei Faszienbälle links und rechts knapp unter dem Brustkorbansatz an der letzten Rippe platzieren.',
      'In Bauchlage auf den Boden legen (Unterarme entspannt vor dem Kopf abgelegt).'
    ],
    execution: [
      'Die Bälle über das eigene Körpergewicht sanft in das Gewebe einsinken lassen, sodass noch leichter Kontakt zu den Rippen spürbar ist.',
      'Nach einigen Atemzügen die Bälle entlang des Rippenbogens etwas weiter nach außen versetzen.'
    ],
    breathing: 'Tiefe Bauchatmung gegen den Widerstand der Bälle, beim Ausatmen weich werden.',
    commonMistakes: [
      'Bälle direkt auf das knöcherne Brustbein oder zu harte Rippen drücken.',
      'Flache Brustatmung statt tiefer Bauchatmung.'
    ]
  },
  {
    id: 'pec-major-release',
    name: 'Pectoralis-Major-Release (Brustmuskel)',
    phase: 1,
    region: 'schulter-nacken',
    equipment: ['ball', 'tuerrahmen'],
    equipmentAlt: 'Wandvorsprung oder Ecke',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. pectoralis major (vordere Brust & Schulteransatz)',
    svgPose: 'wall-ball-pec',
    bodyHotspots: [{ x: 40, y: 29, view: 'front' }, { x: 60, y: 29, view: 'front' }],
    image: null,
    setup: [
      'Aufrecht vor einen Türrahmen oder eine Wandecke stellen.',
      'Ball auf der Brustmuskulatur platzieren und mit leicht vorgebeugtem Oberkörper zwischen Brust und Rahmen einklemmen.'
    ],
    execution: [
      'Besonders die schulternahen Bereiche der Brust nach empfindlichen Stellen absuchen.',
      'Auf einem Punkt einsinken; optional den Arm derselben Seite langsam anheben und senken.'
    ],
    breathing: 'Ruhig und tief atmen, Rücken dabei möglichst gerade halten.',
    commonMistakes: [
      'Rundrücken oder vorgeschobener Kopf beim Anlehnen.',
      'Ball direkt auf dem Schlüsselbein oder Schultergelenk.'
    ]
  },
  {
    id: 'pec-minor-release',
    name: 'Pectoralis-Minor-Release mit Ruderbewegung',
    phase: 1,
    region: 'schulter-nacken',
    equipment: ['ball', 'tuerrahmen'],
    equipmentAlt: 'Wandecke oder stabile Türkante',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. pectoralis minor (tiefer kleiner Brustmuskel)',
    svgPose: 'wall-ball-pec-row',
    bodyHotspots: [{ x: 37, y: 28, view: 'front' }, { x: 63, y: 28, view: 'front' }],
    image: null,
    setup: [
      'An einen Türrahmen oder Wandvorsprung stellen und den Ball zwischen Mitte und Außenseite der Brust einklemmen.'
    ],
    execution: [
      'Den druckempfindlichen Punkt fixieren und den Arm dieser Seite in einer großen Ruderbewegung von vorn nach hinten ziehen.',
      'Beim Zurückziehen die Schulter komplett nach hinten führen und den maximalen Bewegungsradius nutzen.'
    ],
    breathing: 'Gleichmäßig weiteratmen, Rücken bleibt so gerade wie möglich.',
    commonMistakes: [
      'Ausweichen durch Verdrehen des Rumpfes statt sauberer Schulterblatt-Rückführung.',
      'Zu kleiner Bewegungsradius des Arms.'
    ]
  },
  {
    id: 'mittlerer-trapez-release',
    name: 'Mittlerer Trapezius-Release',
    phase: 1,
    region: 'schulter-nacken',
    equipment: ['ball'],
    equipmentAlt: 'Tennisball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Mittlerer M. trapezius & Rhomboideen',
    svgPose: 'supine-ball-arm-overhead',
    bodyHotspots: [{ x: 54, y: 27, view: 'side' }],
    image: null,
    setup: [
      'In Rückenlage den Ball oberhalb des Schulterblatts im Bereich zwischen Schulterblatt und Wirbelsäule platzieren (Beine bequem aufgestellt).'
    ],
    execution: [
      'Verspannte Stelle finden und den Arm der Ballseite senkrecht nach oben strecken.',
      'Den gestreckten Arm langsam über den Kopf Richtung Boden absenken (Daumen zeigt zum Boden) und kontrolliert wieder zurückführen.'
    ],
    breathing: 'Beim Absenken des Arms über den Kopf tief ausatmen.',
    commonMistakes: [
      'Ball direkt auf der Wirbelsäule statt seitlich daneben im Muskelbauch.',
      'Hohlkreuz beim Überkopf-Führen des Arms.'
    ]
  },
  {
    id: 'oberer-trapez-release',
    name: 'Oberer Trapezius- & Nacken-Release',
    phase: 1,
    region: 'schulter-nacken',
    equipment: ['ball', 'tuerrahmen'],
    equipmentAlt: 'Wandecke oder Türrahmen',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Oberer M. trapezius & Nackenansatz',
    svgPose: 'hinge-wall-ball-trap',
    bodyHotspots: [{ x: 52, y: 20, view: 'side' }],
    image: null,
    setup: [
      'An einen Türrahmen oder Wandvorsprung stellen, Ball auf dem oberen Trapez-/Nackenansatz platzieren.',
      'Oberkörper weit nach vorn beugen und den Ball von unten gegen den Vorsprung drücken.'
    ],
    execution: [
      'Mit moderatem Druck beginnen und die exakten Triggerpunkte ertasten.',
      'Auf einer Stelle verweilen, Druck dosiert erhöhen und den Ball behutsam einsinken lassen.'
    ],
    breathing: 'Tief und langsam atmen, Nacken und Kiefer bewusst entspannen.',
    commonMistakes: [
      'Zu starker plötzlicher Druck auf empfindliche Halsstrukturen.',
      'Schultern hochziehen statt sie locker hängen zu lassen.'
    ]
  },
  {
    id: 'latissimus-release',
    name: 'Latissimus-Dorsi-Release',
    phase: 1,
    region: 'bws-ruecken',
    equipment: ['ball'],
    equipmentAlt: 'Faszienrolle oder fester Ball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'M. latissimus dorsi (seitliche Rückenmuskulatur)',
    svgPose: 'side-lying-ball-lat',
    bodyHotspots: [{ x: 56, y: 34, view: 'side' }],
    image: null,
    setup: [
      'Seitlich auf den Boden legen und den Ball unter dem unteren Anteil des Latissimus an der seitlichen Rückenflanke platzieren.',
      'Mit der oberen Hand vor dem Körper am Boden abstützen, um den Druck zu regulieren.'
    ],
    execution: [
      'Harte Stelle suchen und rund 60 Sekunden einsinken lassen.',
      'Anschließend schrittweise weiter nach oben bis an den unteren Schulterbereich vorarbeiten.'
    ],
    breathing: 'Ruhig und tief in den seitlichen Brustkorb atmen.',
    commonMistakes: [
      'Ohne Handstütze zu viel Gewicht auf empfindliche Rippen bringen.',
      'Nur in der Achsel bleiben statt die gesamte Muskelbahn zu bearbeiten.'
    ]
  },
  {
    id: 'adduktor-release-ellenbogen',
    name: 'Adduktoren-Release mit Ellenbogen',
    phase: 1,
    region: 'huefte-beine',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte jederzeit möglich',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Adduktoren (Oberschenkelinnenseite)',
    svgPose: 'seated-adductor-elbow',
    bodyHotspots: [{ x: 44, y: 63, view: 'front' }, { x: 56, y: 63, view: 'front' }],
    image: null,
    setup: [
      'Auf den Boden setzen und das zu bearbeitende Bein im 90°-Winkel seitlich vor dem Körper ablegen.'
    ],
    execution: [
      'Mit dem eigenen Ellenbogen langsam Triggerpunkte im Innenschenkel aufsuchen.',
      'Auf dem Punkt verharren, Ellenbogen einsinken lassen und abwechselnd kurz anspannen und wieder locker lassen (Contract & Relax). Innen- und Außenseite des Muskelstrangs bearbeiten.'
    ],
    breathing: 'Tief und langsam ein- und ausatmen, Schultern locker halten.',
    commonMistakes: [
      'Zu spitzes, ruckartiges Drücken ohne Haltephase.',
      'Nur eine einzige Stelle bearbeiten statt den Verlauf abzugehen.'
    ]
  },
  {
    id: 'ql-release',
    name: 'Quadratus-Lumborum (QL)-Release',
    phase: 1,
    region: 'bws-ruecken',
    equipment: ['ball'],
    equipmentAlt: 'Tennisball (+ optional Buch darunter)',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'M. quadratus lumborum (tiefe seitliche Lendenmuskulatur)',
    svgPose: 'supine-ball-ql',
    bodyHotspots: [{ x: 56, y: 46, view: 'side' }],
    image: null,
    setup: [
      'In Rückenlage den Ball direkt seitlich neben dem dicken Strang des großen Rückenstreckers zur Körperaußenseite hin platzieren.',
      'Optional ein Buch unter den Ball legen, falls mehr Drucktiefe gewünscht ist.'
    ],
    execution: [
      'Auf einem empfindlichen Punkt Körpergewicht abgeben und warten, bis der Druckschmerz deutlich nachlässt.',
      'Anschließend schrittweise zwischen Beckenkamm und unterstem Rippenbogen weiterwandern.'
    ],
    breathing: 'Tiefe Bauchatmung gegen den Balldruck.',
    commonMistakes: [
      'Ball direkt auf die Lendenwirbelsäule oder auf die untersten Rippen legen.',
      'Zu frühes Weitergehen, bevor der Tonus nachlässt.'
    ]
  },
  {
    id: 'subscapularis-release',
    name: 'Subscapularis-Release (Achselhöhle)',
    phase: 1,
    region: 'schulter-nacken',
    equipment: ['none'],
    equipmentAlt: 'Besenstiel-Ende oder eigener Daumen',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. subscapularis (Schulterblatt-Unterseite in Achselhöhle)',
    svgPose: 'standing-subscap-stick',
    bodyHotspots: [{ x: 34, y: 31, view: 'front' }, { x: 66, y: 31, view: 'front' }],
    image: null,
    setup: [
      'Das stumpfe Ende eines Besenstiels unterhalb der Achselhöhle in Richtung Schulterblatt an die tiefste Stelle ansetzen.',
      'Reise-Alternative ohne Stab: Arm auf ein Knie aufstützen und mit dem Daumen der anderen Hand tief in die Achselhöhle drücken.'
    ],
    execution: [
      'Sanft in den Triggerpunkt einsinken lassen und mehrere Punkte entlang des Schulterblattrandes testen.'
    ],
    breathing: 'Langsam und tief atmen; bei Ausstrahlen in den Arm Position minimal korrigieren.',
    commonMistakes: [
      'Zu fester Druck auf Nerven- oder Gefäßbahnen in der Achselmitte (bei Kribbeln sofort versetzen).'
    ]
  },
  {
    id: 'waden-release-soleus',
    name: 'Waden-Release unten (M. soleus)',
    phase: 1,
    region: 'fuss',
    equipment: ['ball'],
    equipmentAlt: 'Rolle, Hantelstange oder fester Ball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. soleus & Achillessehnen-Übergang',
    svgPose: 'seated-calf-ball',
    bodyHotspots: [{ x: 40, y: 80, view: 'front' }, { x: 60, y: 80, view: 'front' }],
    image: null,
    setup: [
      'Im Langsitz die untere Wade auf Ball, Rolle oder am Boden liegende Stange ablegen.',
      'Zur Drucksteigerung das andere Bein überkreuzen.'
    ],
    execution: [
      'In sehr kleinen, langsamen Bewegungen durch die untere Wade arbeiten.',
      'Variation: Wade und Stange mit beiden Händen nach unten drücken, Punkt fixieren und den Fuß langsam hoch- und runterbewegen.'
    ],
    breathing: 'Ruhig ein- und ausatmen, Fußgelenk geschmeidig führen.',
    commonMistakes: [
      'Zu schnelles Rollen über den Muskel.',
      'Direkter, harter Druck auf die reine Achillessehne ohne Muskelpolster.'
    ]
  },
  {
    id: 'waden-release-gastrocnemius',
    name: 'Waden-Release oben (M. gastrocnemius)',
    phase: 1,
    region: 'fuss',
    equipment: ['ball'],
    equipmentAlt: 'Tennisball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. gastrocnemius (oberer fleischiger Wadenbauch)',
    svgPose: 'seated-calf-ball',
    bodyHotspots: [{ x: 40, y: 74, view: 'front' }, { x: 60, y: 74, view: 'front' }],
    image: null,
    setup: [
      'Im Langsitz den Ball unter den oberen, fleischigen Anteil der Wade (innen und außen Richtung Knie) legen.'
    ],
    execution: [
      'Immer nur so weit rollen, bis der Muskel spürbar wegzuspringen droht – dort sofort stoppen, kurz zurückgehen und ruhig einsinken lassen.',
      'Bei Bedarf das andere Bein zur Druckerhöhung darüberlegen.'
    ],
    breathing: 'Tief ausatmen und den Unterschenkel schwer werden lassen.',
    commonMistakes: [
      'Über gespannte Muskelbäuche hinwegschnappen.',
      'Direkt in die empfindliche Kniekehle drücken.'
    ]
  },
  {
    id: 'schienbein-mobilisation',
    name: 'Schienbein- & Unterschenkel-Release',
    phase: 1,
    region: 'fuss',
    equipment: ['ball'],
    equipmentAlt: 'Tennisball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Tiefe Unterschenkel- & Schienbein-Innenseite',
    svgPose: 'seated-shin-ball',
    bodyHotspots: [{ x: 41, y: 76, view: 'front' }, { x: 59, y: 76, view: 'front' }],
    image: null,
    setup: [
      'Im Sitz das Bein leicht angewinkelt aufstellen und den Ball nah am Schienbein bzw. leicht zur Innenseite (zwischen großem Wadenmuskel und unterem Verlauf) platzieren.'
    ],
    execution: [
      'Empfindliche Stelle mit dem Ball fixieren, moderaten Druck aufbauen (auf oder unter dem Unterschenkel) und den Fuß aktiv kreisen und beugen.',
      'Sobald die Spannung nachlässt, ein Stück weiter entlang des Muskelstrangs wandern.'
    ],
    breathing: 'Entspannt weiteratmen, Schmerzskala moderat halten.',
    commonMistakes: [
      'Direkt auf der harten Schienbeinkante rollen.'
    ]
  },
  {
    id: 'beinbeuger-ball-kiste',
    name: 'Beinbeuger-Release mit Ball im Sitzen',
    phase: 1,
    region: 'huefte-beine',
    equipment: ['ball', 'kiste'],
    equipmentAlt: 'Stuhl oder feste Bettkante + Ball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Ischiocrurale Muskulatur (Oberschenkelrückseite)',
    svgPose: 'box-hamstring-ball',
    bodyHotspots: [{ x: 40, y: 63, view: 'side' }],
    image: null,
    setup: [
      'Auf einen stabilen Stuhl oder eine Kiste setzen und den Ball unter dem hinteren Oberschenkel platzieren.'
    ],
    execution: [
      'Verspannte Stelle durch leichtes Verlagern finden und das Gewicht auf dem Ball ruhen lassen.',
      'Auf diesem Punkt bleiben, das Knie langsam komplett strecken und wieder beugen. Nach einigen Wiederholungen die nächste Stelle aufsuchen.'
    ],
    breathing: 'Tief und langsam atmen, Oberkörper bleibt aufrecht.',
    commonMistakes: [
      'Zu weicher Stuhl, in dem der Ball versinkt.',
      'Hastiges Strecken des Knies ohne Endpunkt-Kontrolle.'
    ]
  },
  {
    id: 'wirbelsaeulen-segmentbewegung',
    name: 'Wirbelsäulen-Segmentbewegung mit Ball',
    phase: 1,
    region: 'bws-ruecken',
    equipment: ['ball'],
    equipmentAlt: 'Weicherer Ball oder dünnes Kissen über hartem Ball',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Paravertebrale Rückenstrecker neben der BWS',
    svgPose: 'supine-ball-spine',
    bodyHotspots: [{ x: 54, y: 34, view: 'side' }],
    image: null,
    setup: [
      'In Rückenlage den Ball genau in die Furche zwischen Wirbelsäule und großem Rückenstrecker legen (nicht auf die Knochen der Wirbelsäule).',
      'Kopf wenn möglich ablegen, Arme vor der Brust verschränken.'
    ],
    execution: [
      'Auf einer Höhe den Oberkörper langsam abwechselnd leicht nach rechts und links bewegen, sodass der Rückenstrecker von der Wirbelsäule weggeschoben wird.',
      'Danach den Ball ein Segment weiter nach oben versetzen und nach Durchgang die andere Körperseite bearbeiten.'
    ],
    breathing: 'Ruhige Atmung zum Loslassen; es darf sich entspannend und nicht stechend anfühlen.',
    commonMistakes: [
      'Ball direkt auf die Dornfortsätze der Wirbelsäule drücken.',
      'Zu starker Schmerz – dann sofort weicheren Ball oder Kissen dazwischen nutzen.'
    ]
  },
  {
    id: 'trizeps-bizeps-smash',
    name: 'Trizeps- & Bizeps-Release an der Stange',
    phase: 1,
    region: 'arme-hand',
    equipment: ['stange'],
    equipmentAlt: 'Stabile Tischkante, Nudelholz oder Ball an Wand',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. biceps brachii & M. triceps brachii',
    svgPose: 'bar-arm-smash',
    bodyHotspots: [{ x: 31, y: 38, view: 'front' }, { x: 69, y: 38, view: 'front' }],
    image: null,
    setup: [
      'Eine Langhantel im Rack auf Schulter-/Brusthöhe ablegen (oder alternativ Tischkante/Ball nutzen).',
      'Den angewinkelten Oberarm mit dem Bizeps oder Trizeps auf die Stange legen.'
    ],
    execution: [
      'Arm langsam über die Stange bewegen, um Triggerpunkte zu lokalisieren.',
      'Auf einer verspannten Stelle verweilen und das Gewicht der Stange bzw. des Arms einsinken lassen.'
    ],
    breathing: 'Tief und langsam atmen, Unterarm locker lassen.',
    commonMistakes: [
      'Zu starker Druck auf der Oberarm-Innenseite (Nervenbahn) bei Taubheitsgefühl sofort lösen.'
    ]
  },

  // ==================== PHASE 2: MOBILISATION & DEHNUNG ====================
  {
    id: 'fuss-cycle',
    name: 'Fußgelenk-Zyklus (Toe Pull, Medial & Lateral Tilt)',
    phase: 2,
    region: 'fuss',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte auf Matte oder Teppich',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 180,
    timerMode: 'substeps',
    timerPhases: [
      { label: '1/3 Toe Pull (Fußrücken)', seconds: 60, cue: 'Spann am Boden – Fußgelenk aktiv nach vorn in Restriktion ziehen' },
      { label: '2/3 Medial Tilt (Innenseite)', seconds: 60, cue: 'Fuß kontrolliert nach innen kippen – Zug nahe Ferse spüren' },
      { label: '3/3 Lateral Tilt (Außenseite)', seconds: 60, cue: 'Fuß auf Außenkante umschlagen – Zug zwischen Ferse & Außenknöchel' }
    ],
    targetZone: 'Sprunggelenkkapsel, Fußrücken & seitliche Bänder',
    svgPose: 'ankle-cycle',
    bodyHotspots: [{ x: 41, y: 92, view: 'front' }, { x: 59, y: 92, view: 'front' }],
    image: null,
    setup: [
      'Aufrecht stehen oder knien, ein Bein nach hinten bzw. zur Seite frei positionieren.'
    ],
    execution: [
      'Toe Pull (60 s): Fuß umschlagen, sodass der Spann am Boden liegt. Durch eine kleine Vorwärtsbewegung aus dem Fußgelenk (nicht aus dem Knie) Dehnung auf dem mittleren Fußrücken aufbauen und kontrolliert zurückweichen.',
      'Medial Tilt (60 s): Fuß kontrolliert nach innen kippen bis ein leichter Zug innen nahe der Ferse entsteht, Stück für Stück erweitern.',
      'Lateral Tilt (60 s): Fuß zur Außenseite umschlagen und kontrolliert den Zug zwischen Ferse und vorstehendem Außenknöchel ansteuern.'
    ],
    breathing: 'Ruhig atmen und jede Phase mit voller aktiver Kontrolle ausführen.',
    commonMistakes: [
      'Ruckartiges Abknicken im Sprunggelenk statt langsamer Eigenkontrolle.',
      'Ausweichbewegung aus dem Knie beim Toe Pull.'
    ]
  },
  {
    id: 'sprunggelenk-mobilisation',
    name: 'Sprunggelenk-Mobilisation im Kniestand',
    phase: 2,
    region: 'fuss',
    equipment: ['gewicht'],
    equipmentAlt: 'Schweres Buch oder beide Hände auf dem Knie (+ optional Band)',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Oberes Sprunggelenk (Dorsalextension) & Soleus',
    svgPose: 'half-kneeling-ankle',
    bodyHotspots: [{ x: 45, y: 89, view: 'side' }],
    image: null,
    setup: [
      'In den Knie-Ausfallschritt gehen, vorderer Fuß steht flach am Boden.',
      'Eine Gewichtsscheibe (oder schweres Buch) vorn auf dem Oberschenkel knapp über dem Knie abstellen.'
    ],
    execution: [
      'Das vordere Knie langsam über die Fußspitze nach vorn in die Bewegungsgrenze schieben, während die Ferse fest am Boden bleibt.',
      'Langsam in die Restriktion hinein- und wieder herausfedern.',
      'Optional mit Band: Widerstandsband hinten verankern und tief um das vordere Sprunggelenk legen.'
    ],
    breathing: 'Entspannte Nasenatmung.',
    commonMistakes: [
      'Ferse hebt vom Boden ab – dann Weg etwas reduzieren.',
      'Knie fällt nach innen statt über die 2. Zehe.'
    ]
  },
  {
    id: 'couch-stretch',
    name: 'Couch Stretch (Einfach & Schwer)',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['wand'],
    equipmentAlt: 'Wand, Couch, Stuhl oder Hocker',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Hüftbeuger (M. iliopsoas) & Rectus femoris',
    svgPose: 'couch-stretch',
    bodyHotspots: [{ x: 46, y: 54, view: 'side' }],
    image: null,
    setup: [
      'Im Ausfallschritt vor Wand oder Stuhl knien. Hinteren Fußspann an die Wand (oder auf Stuhl) legen, Knie berührt Boden und Wand/Stuhlbein.',
      'Anderes Bein vorn im 90°-Winkel stabil aufstellen.'
    ],
    execution: [
      'WICHTIG: Noch vor dem Aufrichten zuerst das Becken nach vorne kippen (Posterior Tilt / Gesäß anspannen), um ein Hohlkreuz zu sperren.',
      'Oberkörper nur so weit aufrichten, wie der Rücken gerade bleibt. Hintere Ferse möglichst nah ans Gesäß bringen.'
    ],
    breathing: 'Tiefe, entspannte Atmung trotz intensiver Dehnung.',
    commonMistakes: [
      'Starkes Hohlkreuz durch fehlende Becken-Kippung – nimmt die Dehnung aus dem Hüftbeuger.',
      'Zu hoher Einstieg an der Wand – lieber zunächst niedrig auf Stuhl oder Kissen starten.'
    ],
    variants: [
      'Einfache Variante: Hinteren Fuß niedriger (z. B. auf flachem Hocker/Kissen) ablegen oder Oberkörper weiter vorn abstützen.',
      'Schwere Variante: Knie direkt an der Wand und Oberkörper komplett senkrecht aufrichten.'
    ]
  },
  {
    id: 'beinbeuger-stretch',
    name: 'Beinbeuger-Stretch (Statisch / Dynamisch / Nerv)',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['band'],
    equipmentAlt: 'Handtuch, Gürtel oder Stuhl für die Nerv-Variante',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Beinbeuger (Hamstrings), Wade & Nervenmobilität',
    svgPose: 'supine-hamstring-band',
    bodyHotspots: [{ x: 54, y: 63, view: 'side' }],
    image: null,
    setup: [
      'Statisch: Rückenlage, Band/Handtuch um den Fußballen legen, anderes Bein liegt gestreckt am Boden.',
      'Dynamisch: Unterschenkel unterhalb des Knies greifen.'
    ],
    execution: [
      'Statisch: Gestrecktes Bein mit dem Band Richtung Nasenspitze ziehen und Dehnung im Beinbeuger halten.',
      'Dynamisch: Knie zur Brust beugen, Zehen zur Nase ziehen, dann Knie so weit wie möglich strecken (Dehnung in Beinbeuger & Wade); Hüftwinkel variieren.',
      'Nerv-Variante (bei Ziehen in der Kniekehle): Ferse auf Stuhl abstellen, Bein strecken und Becken leicht ins Hohlkreuz (Anterior Tilt) kippen.'
    ],
    breathing: 'Tief und langsam atmen, Gesicht und Schultern entspannt.',
    commonMistakes: [
      'Bei Kniekehlen-Ziehen gewaltsam weiterziehen statt auf die Nerv-Variante zu wechseln.',
      'Abheben des Gegenbeins vom Boden.'
    ]
  },
  {
    id: 'z-sitz-pnf',
    name: 'Z-Sitz Hüft-Außenrotation (PNF)',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'pnf',
    timerPhases: [
      { label: 'Runde 1 · Aktiv drücken', seconds: 20, cue: 'Fußaußenkante & vorderes Knie fest in den Boden drücken' },
      { label: 'Runde 1 · Loslassen', seconds: 10, cue: 'Spannung lösen & tiefer nach vorn sinken' },
      { label: 'Runde 2 · Aktiv drücken', seconds: 20, cue: 'Fußaußenkante & vorderes Knie fest in den Boden drücken' },
      { label: 'Runde 2 · Loslassen', seconds: 10, cue: 'Spannung lösen & weiter nach vorn lehnen' },
      { label: 'Runde 3 · Aktiv drücken', seconds: 20, cue: 'Letzte Runde – stabil in den Boden drücken' },
      { label: 'Runde 3 · Loslassen', seconds: 10, cue: 'Tief ausatmen und neue Position genießen' }
    ],
    targetZone: 'Hüftaußenrotatoren & tiefe Gesäßkapsel',
    svgPose: 'z-sit-pnf',
    bodyHotspots: [{ x: 43, y: 53, view: 'side' }],
    image: null,
    setup: [
      'Auf den Boden setzen: ein Bein im 90°-Winkel nach vorn, das andere im 90°-Winkel nach hinten anwinkeln.'
    ],
    execution: [
      'Mit möglichst geradem Rücken nach vorn über das vordere Schienbein beugen (optional vorderes Knie nach außen / hinteres nach hinten drücken).',
      'PNF-Zyklus (3×): 20 Sekunden lang Fußaußenkante und Knie des vorderen Beins kräftig in den Boden drücken, dann sofort loslassen und 10 Sekunden tiefer in die Dehnung sinken.'
    ],
    breathing: 'Während des Drückens kontrolliert weiteratmen, beim Loslassen tief ausatmen.',
    commonMistakes: [
      'Rücken rund einrollen statt aus der Hüfte nach vorn zu kippen.',
      'Knieschmerz durch zu starken Hebel – dann Winkel etwas öffnen.'
    ]
  },
  {
    id: 'nacken-stretches-3-richtungen',
    name: 'Nacken-Dehnung in 3 Richtungen',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte im Stand oder Sitz',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'substeps',
    timerPhases: [
      { label: '1/3 Seitliche Neigung', seconds: 30, cue: 'Hand ans gegenüberliegende Ohr – sanft zur Seite ziehen' },
      { label: '2/3 Schräg vorne-unten', seconds: 30, cue: 'Hand am Hinterkopf – Kopf sanft schräg nach vorne-unten führen' },
      { label: '3/3 Schräg hinten', seconds: 30, cue: 'Hand sanft unter Kinn – Kopf vorsichtig seitlich nach hinten schieben' }
    ],
    targetZone: 'Seitliche Nackenmuskulatur, Levator scapulae & vordere Halsfaszie',
    svgPose: 'standing-neck-stretch',
    bodyHotspots: [{ x: 47, y: 18, view: 'front' }, { x: 53, y: 18, view: 'front' }],
    image: null,
    setup: [
      'Aufrecht und stabil nach BodyMap-Prinzipien hinstellen, freie Schulter bewusst locker nach unten sinken lassen.'
    ],
    execution: [
      'Richtung 1 (30 s): Mit der Hand zum gegenüberliegenden Ohr greifen und den Kopf behutsam Richtung Arm neigen.',
      'Richtung 2 (30 s): Hand an den Hinterkopf legen und den Kopf vorsichtig schräg nach vorne-unten führen.',
      'Richtung 3 (30 s): Hand sanft unter das Kinn legen und den Kopf vorsichtig seitlich nach hinten in den Nacken schieben.'
    ],
    breathing: 'Tief und ruhig atmen, ohne die gegenüberliegende Schulter hochzuziehen.',
    commonMistakes: [
      'Ruckartiges Zerren am Kopf.',
      'Gegenüberliegende Schulter wandert mit nach oben.'
    ]
  },
  {
    id: 'ueberkopf-durchstrecken',
    name: 'Überkopf-Durchstrecken mit Schulteraktivierung',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['stange'],
    equipmentAlt: 'Klimmzugstange, oberer Türrahmen oder Tischkante',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Schulterüberkopf-Beweglichkeit, Latissimus & BWS',
    svgPose: 'overhead-bar-reach',
    bodyHotspots: [{ x: 35, y: 24, view: 'front' }, { x: 65, y: 24, view: 'front' }],
    image: null,
    setup: [
      'Unter eine Klimmzugstange oder einen stabilen Türrahmen stellen, Arme schulterbreit und gestreckt greifen.',
      'Schultern zunächst hinten und unten platzieren.'
    ],
    execution: [
      'Den gesamten Oberkörper langsam nach vorn durchstrecken, sodass der Kopf vor die Schulterlinie gelangt.',
      'Die Schultern aktivieren und besonders den unteren Teil der Schulterblätter aktiv nach vorn schieben. Langsam und kontrolliert vor- und zurückpendeln.'
    ],
    breathing: 'Tief in den Brustkorb einatmen, wenn der Oberkörper nach vorn sinkt.',
    commonMistakes: [
      'Nur ins Hohlkreuz fallen statt die Streckung aus Schulter und BWS zu holen.',
      'Schultern passiv zu den Ohren ziehen lassen.'
    ]
  },
  {
    id: 'bws-streckung-wand',
    name: 'BWS-Streckung an der Wand (Peanut)',
    phase: 2,
    region: 'bws-ruecken',
    equipment: ['peanut', 'wand'],
    equipmentAlt: 'Kleine feste Wasserflasche oder 2 zusammengeklebte Bälle + Wand',
    travelFriendly: false,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Brustwirbelsäule (Extension)',
    svgPose: 'wall-peanut-thoracic',
    bodyHotspots: [{ x: 56, y: 31, view: 'side' }],
    image: null,
    setup: [
      'Eine Peanut (Doppelball) mittig am Rücken auf Höhe der BWS gegen die Wand klemmen.',
      'Arme vor der Brust verschränken, um die Schulterblätter zur Seite zu räumen.'
    ],
    execution: [
      'Gesäß möglichst nah an der Wand halten, mit den Beinen leichten Druck zur Wand aufbauen und die Knie beugen, um langsam von der Rückenmitte nach oben zu rollen.',
      'Brust rausstrecken und den oberen Rücken so strecken, dass der Kopf Richtung Wand kommt. Streckung dauerhaft halten.'
    ],
    breathing: 'Tiefe Brustkorb-Atmung zur Mobilisation der Rippengelenke.',
    commonMistakes: [
      'Ins Hohlkreuz der Lendenwirbelsäule ausweichen (Gesäß weit von Wand weg).'
    ]
  },
  {
    id: 'erste-rippe-mobilisation',
    name: 'Erste-Rippe-Mobilisation mit Stab',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['stab'],
    equipmentAlt: 'Besenstiel oder langer stabiler Schirm',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Übergang 1. Rippe / Trapez / Schlüsselbein',
    svgPose: 'supine-first-rib-stick',
    bodyHotspots: [{ x: 43, y: 22, view: 'front' }, { x: 57, y: 22, view: 'front' }],
    image: null,
    setup: [
      'Auf dem Boden liegen, einen Besenstiel von oben in die Grube zwischen Trapez, Schlüsselbein und Schulterdach möglichst nah am Hals drücken.'
    ],
    execution: [
      'Leichten Druck mit dem Stab halten, Schulter nach unten ziehen und Schulterblatt hinten fixieren.',
      'Den gestreckten Arm dieser Seite im größtmöglichen Bewegungsradius von oben nach unten führen. Position minimal anpassen, falls der Reiz zu schnell abnimmt.'
    ],
    breathing: 'Ruhig weiteratmen, Halsmuskulatur nicht anspannen.',
    commonMistakes: [
      'Stab direkt auf dem Schlüsselbein statt im Weichteilspalt dahinter.'
    ]
  },
  {
    id: 'einbeinige-kniebeuge-mob',
    name: 'Tiefer Ausfallschritt (Hüftöffnung)',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Hüftkapsel, Adduktoren & Hüftbeuger',
    svgPose: 'deep-lunge-mob',
    bodyHotspots: [{ x: 46, y: 51, view: 'side' }],
    image: null,
    setup: [
      'Ein Bein im 90°-Winkel nach vorn-außen aufstellen (Kniebeuge-Position), das hintere Bein nach hinten strecken mit Knie am Boden.',
      'Beide Hände vor/neben dem vorderen Fuß am Boden abstützen, Rumpf aktiv halten.'
    ],
    execution: [
      'Mit aktiver Bauchspannung das vordere Knie kontrolliert nach außen drücken und zurückführen.',
      'Alternativ Hüfte nach hinten schieben oder den Oberkörper leicht zur Seite neigen, um die jeweilige Restriktion anzusteuern.'
    ],
    breathing: 'Tiefe, gleichmäßige Atmung.',
    commonMistakes: [
      'Vordere Fußsohle hebt komplett ab.',
      'Spannungsloses Durchhängen im unteren Rücken.'
    ]
  },
  {
    id: 'hueftkapsel-distraktion',
    name: 'Hüftkapsel-Distraktion im Vierfüßler',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte (weiche Unterlage für Knie)',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Hintere & seitliche Hüftgelenkskapsel',
    svgPose: 'quadruped-hip-capsule',
    bodyHotspots: [{ x: 47, y: 50, view: 'side' }],
    image: null,
    setup: [
      'In den Vierfüßlerstand gehen und das Körpergewicht bewusst auf das zu mobilisierende Knie verlagern.',
      'Den Oberschenkelknochen spürbar „aus dem Gesäß herausdrücken“.'
    ],
    execution: [
      'Langsam weit in die Hüftbeugung nach hinten-vorn bewegen und Restriktionen ertasten.',
      'Mit Innen- und Außenrotation spielen (Unterschenkel nach innen bzw. außen drehen) sowie kleine Kreise ziehen. Wichtig: Bei quetschendem oder knöchernem Gefühl sofort neu ansetzen!'
    ],
    breathing: 'Ruhige Atmung, Becken stabil halten.',
    commonMistakes: [
      'In ein knöchernes Impingement (vorderes Kneifen) hineinarbeiten statt Position zu korrigieren.'
    ]
  },
  {
    id: 'beinbeuger-ausfallschritt',
    name: 'Beinbeuger-Mobilisation im Ausfallschritt',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Hintere Oberschenkelmuskulatur (dynamisch unter Last)',
    svgPose: 'lunge-hamstring-floss',
    bodyHotspots: [{ x: 54, y: 63, view: 'side' }],
    image: null,
    setup: [
      'In einen weiten Ausfallschritt gehen: hintere Ferse angehoben, vorderes Bein angewinkelt mit Ferse fest am Boden.',
      'Oberkörper vorbeugen, sodass die Brust nah ans vordere Knie kommt; gespreizte Finger schulterbreit vor dem Fuß aufsetzen.'
    ],
    execution: [
      'Während die Ferse in den Boden drückt, das vordere Bein so weit wie möglich strecken, kurz halten und langsam wieder beugen.',
      'Rund 10–20 kontrollierte Wiederholungen pro Seite.'
    ],
    breathing: 'Beim Strecken des Beins ruhig ausatmen.',
    commonMistakes: [
      'Hände vom Boden lösen und dadurch den Kontakt zwischen Brust und Oberschenkel verlieren.'
    ]
  },
  {
    id: 'seitliche-oeffnung-bogen',
    name: 'Seitliche Rumpföffnung mit Bogen',
    phase: 2,
    region: 'rumpf',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte im Kniestand oder Schneidersitz',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Latissimus, schräge Bauchmuskulatur & seitliche Rippen',
    svgPose: 'kneeling-side-arc',
    bodyHotspots: [{ x: 37, y: 38, view: 'front' }, { x: 63, y: 38, view: 'front' }],
    image: null,
    setup: [
      'Auf die Knie setzen (oder in bequemen Sitz) und den Rumpf aufrichten.'
    ],
    execution: [
      'Mit der Körperaußenseite einen großen Bogen zu einer Seite spannen und die obere Hand über den Kopf Richtung Boden ziehen.',
      'Kontrolliert zur Mitte zurückkehren und wiederholen.'
    ],
    breathing: 'Bei jedem Herüberbeugen tief in die geöffnete Flanke einatmen, beim Zurückkommen entspannt ausatmen.',
    commonMistakes: [
      'Oberkörper nach vorn abkippen statt in der reinen Seitneigung zu bleiben.'
    ]
  },
  {
    id: 'bws-streckung-boden',
    name: 'BWS-Streckung auf dem Boden (Peanut)',
    phase: 2,
    region: 'bws-ruecken',
    equipment: ['peanut'],
    equipmentAlt: 'Kleine volle Wasserflasche oder 2 zusammengeklebte Bälle',
    travelFriendly: false,
    bilateral: false,
    defaultSeconds: 120,
    timerMode: 'hold',
    targetZone: 'Brustwirbelsäule (segmentale Extension)',
    svgPose: 'supine-peanut-thoracic',
    bodyHotspots: [{ x: 56, y: 31, view: 'side' }],
    image: null,
    setup: [
      'In Rückenlage (Beine aufgestellt) eine Peanut mittig am Rücken zwischen zwei Wirbeln platzieren.',
      'Arme vor dem Brustkorb verschränken.'
    ],
    execution: [
      'Die Brustwirbelsäule über die Peanut nach hinten strecken, sodass die Schultern Richtung Boden sinken und sich die Brust öffnet; Kopf bei Bedarf kurz ablegen.',
      'Wieder leicht zusammenziehen. Pro Segment 3–6 Wiederholungen, dann einen Wirbelspalt höher wandern (insgesamt 4–6 Stellen nach oben).'
    ],
    breathing: 'Beim Überstrecken tief ein- und langsam ausatmen.',
    commonMistakes: [
      'Becken vom Boden abheben und aus dem unteren Rücken strecken.',
      'Zu tief in die Lendenwirbelsäule rutschen.'
    ]
  },
  {
    id: 'sleeper-stretch-pnf',
    name: 'Sleeper Stretch Schulter-Innenrotation (PNF)',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte in Seitenlage',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'pnf',
    timerPhases: [
      { label: 'Runde 1 · Nach oben drücken', seconds: 15, cue: 'Unterarm gegen obere Hand drücken (Schulter aktivieren)' },
      { label: 'Runde 1 · Tiefer führen', seconds: 15, cue: 'Entspannen & obere Hand schiebt Unterarm sanft zum Boden' },
      { label: 'Runde 2 · Nach oben drücken', seconds: 15, cue: 'Gleichmäßig gegen oberen Widerstand drücken' },
      { label: 'Runde 2 · Tiefer führen', seconds: 15, cue: 'Tiefer in die Innenrotation absenken' },
      { label: 'Runde 3 · Nach oben drücken', seconds: 15, cue: 'Letzte Aktivierung gegen die obere Hand' },
      { label: 'Runde 3 · Tiefer führen', seconds: 15, cue: 'Neue Beweglichkeit ruhig halten & atmen' }
    ],
    targetZone: 'Hintere Schulterkapsel & Außenrotatoren',
    svgPose: 'side-lying-sleeper',
    bodyHotspots: [{ x: 47, y: 28, view: 'side' }],
    image: null,
    setup: [
      'Seitlich auf den Boden legen. Den unteren Arm zuerst weit aus dem Schultergelenk herausziehen (Ellenbogen weg vom Körper), dann 90° anwinkeln.'
    ],
    execution: [
      'Mit der freien Hand den Unterarm/Handrücken des unteren Arms in die maximale Innenrotation Richtung Boden führen.',
      'PNF-Zyklus (2–3×): 15 s isometrisch mit dem mobilisierten Arm gegen die obere Hand nach oben drücken (ohne Bewegung), danach 15 s mit der oberen Hand sanft Richtung Boden weiterführen.'
    ],
    breathing: 'Ruhige Atmung; keinerlei stechenden Schmerz an der Schultervorderseite zulassen.',
    commonMistakes: [
      'Schulterblatt nicht nach hinten/unten fixiert – dann rollt die Schulter nach vorn und klemmt.'
    ]
  },
  {
    id: 'wrist-figure-8-side-turn',
    name: 'Handgelenk-Flow: Figure 8 & Fist Side Turn',
    phase: 2,
    region: 'arme-hand',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte überall durchführbar',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'substeps',
    timerPhases: [
      { label: '1/2 Wrist Figure 8', seconds: 45, cue: 'Schwanenkopf → oben Finger maximal spreizen → zum Unterarm anwinkeln → rund zurück' },
      { label: '2/2 Fist Side Turn', seconds: 45, cue: 'Waagerechte Faust links/rechts bis in die Endposition kippen (Glas-Wasser-Test)' }
    ],
    targetZone: 'Handgelenkskapsel, Unterarm-Beuger & -Strecker',
    svgPose: 'standing-wrist-flow',
    bodyHotspots: [{ x: 25, y: 50, view: 'front' }, { x: 75, y: 50, view: 'front' }],
    image: null,
    setup: [
      'Aufrecht stehen oder sitzen, Ellenbogen locker am Körper.'
    ],
    execution: [
      'Wrist Figure 8 (45 s): In Schwanenkopf-Position starten (Finger zusammen), nach oben drehen, Finger maximal spreizen, Handrücken zum Unterarmrücken anwinkeln, oben weiterrotieren, Finger wieder schließen und zurück.',
      'Fist Side Turn (45 s): Locker Fäuste bilden, Handrücken bleibt waagerecht (als stünde ein Glas Wasser darauf). Daumen langsam Richtung Körpermitte bis zur Grenze schieben, kurz drücken, dann kontrolliert zur Gegenseite.'
    ],
    breathing: 'Gleichmäßig und ruhig atmen, Schultern bleiben entspannt unten.',
    commonMistakes: [
      'Aus dem gesamten Unterarm/Ellenbogen drehen statt isoliert aus dem Handgelenk.'
    ]
  },
  {
    id: 'bear-sit',
    name: 'Bear Sit Hüftrotation (Einfach & Schwer)',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Hüftinnen- & -außenrotation aktiv',
    svgPose: 'seated-bear-sit',
    bodyHotspots: [{ x: 38, y: 51, view: 'front' }, { x: 62, y: 51, view: 'front' }],
    image: null,
    setup: [
      'Einfach: Sitzend ein Bein ausstrecken, das andere anwinkeln (Fuß etwas vom Knie entfernt).',
      'Schwer: Im 90°/90°-Sitz starten (ein Bein 90° vorn, eins 90° hinten).'
    ],
    execution: [
      'Einfach: Das aufgestellte Knie langsam abwechselnd nach innen und nach außen bis zur Bewegungsgrenze aus der Hüfte rotieren.',
      'Schwer (90/90-Wechsel): Beide Knie vom Boden abheben und kontrolliert mit der Oberkörperbewegung zur anderen Seite umschlagen (bei Bedarf hinten mit den Händen abstützen).'
    ],
    breathing: 'Beim Umschlagen ruhig ausatmen, Wirbelsäule möglichst aufrecht halten.',
    commonMistakes: [
      'Bewegung aus dem Kniegelenk erzwingen statt aus der Hüfte zu rotieren.'
    ],
    variants: [
      'Einfache Variante: Ein Bein gestreckt, Knie des anderen Beins aktiv innen/außen führen.',
      'Schwere Variante: Freihändige 90/90-Scheibenwischer-Rotation.'
    ]
  },
  {
    id: 'adduktor-stretch',
    name: 'Adduktoren-Stretch (Lateral Rocks & Stand up Sit down)',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte (schwere Variante: niedriger Hocker)',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Adduktoren & innere Oberschenkelfaszie',
    svgPose: 'quadruped-adductor-rocks',
    bodyHotspots: [{ x: 43, y: 61, view: 'front' }, { x: 57, y: 61, view: 'front' }],
    image: null,
    setup: [
      'Einfach (Lateral Rocks): Vierfüßlerstand, ein Bein gestreckt weit zur Seite abspreizen.',
      'Schwer (Stand up Sit down): Auf niedrigem Hocker sitzen, beide gestreckten Beine maximal weit spreizen.'
    ],
    execution: [
      'Einfach: Den gesamten Körper langsam nach hinten Richtung Ferse und wieder nach vorn schieben (45 s pro Seite).',
      'Schwer: Gesäß vom Hocker abheben, mit geradem Rücken nach vorn abstützen bis deutliche Dehnung entsteht, unter Dauerspannung auf dem Adduktor kontrolliert zurücksetzen.'
    ],
    breathing: 'Tiefe, langsame Atmung in den Bauch.',
    commonMistakes: [
      'Runden des unteren Rückens beim Zurückschieben.',
      'Abrupter Spannungsverlust beim Hinsetzen.'
    ]
  },
  {
    id: 'olympic-wall-squat',
    name: 'Olympic Wall Squat (Hüft-Innenrotation)',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['wand'],
    equipmentAlt: 'Freie Wandfläche',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Hüftinnenrotation & Adduktoren in tiefer Beugung',
    svgPose: 'supine-wall-squat-ir',
    bodyHotspots: [{ x: 42, y: 53, view: 'front' }, { x: 58, y: 53, view: 'front' }],
    image: null,
    setup: [
      'Auf dem Rücken vor einer Wand liegen, Füße mindestens hüftbreit an der Wand aufstellen (Zehen zeigen gerade nach oben).'
    ],
    execution: [
      'Beide Beine im Wechsel rhythmisch und kontrolliert nach rechts und links kippen, sodass jeweils ein Knie weit nach innen fällt, während das andere leicht nach außen mitgeht.',
      'Fokus bewusst auf das nach innen kippende Bein (Innenrotation) legen.'
    ],
    breathing: 'Gleichmäßig ruhig atmen, unterer Rücken bleibt entspannt am Boden.',
    commonMistakes: [
      'Füße zu schmal aufgestellt – dann blockiert das Innenrotations-Knie zu früh.'
    ]
  },
  {
    id: 'taube-auf-kiste',
    name: 'Erhöhte Taube auf Kiste / Tisch',
    phase: 2,
    region: 'huefte-beine',
    equipment: ['kiste'],
    equipmentAlt: 'Tisch, stabile Bettkante oder hoher Stuhl',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Gesäßmuskulatur (Glutei) & äußere Hüftkapsel',
    svgPose: 'box-pigeon',
    bodyHotspots: [{ x: 43, y: 52, view: 'side' }],
    image: null,
    setup: [
      'Ein Bein angewinkelt vorn auf einer Kiste oder Tischkante ablegen; das Knie dabei möglichst weit nach außen schieben, sodass der Fuß nicht direkt vor dem Schritt liegt.',
      'Hinteres Bein leicht gebeugt nach hinten strecken, Hände auf der Kiste abstützen.'
    ],
    execution: [
      'Mit komplett geradem Rücken so weit wie möglich aus der Hüfte nach vorn über das abgelegte Bein lehnen.',
      'Position halten und tief in die Dehnung atmen.'
    ],
    breathing: 'Lange Ausatemzüge helfen dem Gesäß loszulassen.',
    commonMistakes: [
      'Brustwirbelsäule rund einrollen, um tiefer zu wirken.',
      'Knieschmerz durch mangelnde Fußspannung – Fuß leicht anziehen (Dorsalextension) schützt das Knie.'
    ]
  },
  {
    id: 'katzenbuckel-zu-siegerpose',
    name: 'Wirbelsäulen-Rollup: Katzenbuckel zur Siegerpose',
    phase: 2,
    region: 'bws-ruecken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte im Stand',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Gesamte Wirbelsäule, Brustkorb & vordere Schulterkette',
    svgPose: 'standing-rollup-victory',
    bodyHotspots: [{ x: 50, y: 31, view: 'front' }],
    image: null,
    setup: [
      'Hüftbreit und stabil hinstellen.'
    ],
    execution: [
      'Im Stehen mit rundem Rücken (Katzenbuckel) weit nach vorn beugen, Arme hängen locker nach unten.',
      'Sehr langsam Wirbel für Wirbel nach oben aufrichten.',
      'Oben angekommen leicht zurücklehnen, die Arme weit nach hinten-außen öffnen und Brustkorb dehnen.'
    ],
    breathing: 'Beim Öffnen in die Siegerpose tief in den Brustkorb einatmen, beim Einrollen ausatmen.',
    commonMistakes: [
      'Zu schnelles Aufrollen ohne segmentale Kontrolle.'
    ]
  },
  {
    id: 'bws-drehung-lunge-squat',
    name: 'BWS-Rotation im Ausfallschritt oder Squat',
    phase: 2,
    region: 'bws-ruecken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Brustwirbelsäulen-Rotation & Hüftbeweglichkeit',
    svgPose: 'lunge-thoracic-rotation',
    bodyHotspots: [{ x: 48, y: 32, view: 'side' }],
    image: null,
    setup: [
      'Im Ausfallschritt: Schulter tief an das vordere angewinkelte Bein führen; hinteres Knie abgelegt (leichter) oder gestreckt (schwerer).',
      'Alternative in tiefer Kniebeuge: Linken Ellenbogen an die Außenseite des rechten Knies setzen.'
    ],
    execution: [
      'Ausfallschritt: Den Arm außerhalb des vorderen Knies von der Körpermitte senkrecht zur Decke aufdrehen und dem Blick folgen.',
      'Kniebeuge: Wirbelsäule zur offenen Seite aufdrehen und den freien Arm so weit wie möglich nach hinten-oben strecken.'
    ],
    breathing: 'Beim Aufdrehen tief einatmen.',
    commonMistakes: [
      'Aus der Lendenwirbelsäule oder nur aus der Schulter nach hinten reißen statt die BWS zu rotieren.'
    ]
  },
  {
    id: 'skin-the-cat-stab',
    name: 'Skin the Cat mit Besenstil',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['stab'],
    equipmentAlt: 'Besenstiel, Handtuch oder Widerstandsband',
    travelFriendly: false,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Vordere Schulter, Bizepssehne & Brustmuskulatur',
    svgPose: 'standing-hinge-stick-behind',
    bodyHotspots: [{ x: 35, y: 28, view: 'front' }, { x: 65, y: 28, view: 'front' }],
    image: null,
    setup: [
      'Einen Besenstiel schulterbreit hinter dem Rücken greifen, Schultern aktiv nach hinten und unten setzen.'
    ],
    execution: [
      'Oberkörper aus der Hüfte nach vorn beugen und gleichzeitig die gestreckten Arme mit dem Stab hinter dem Rücken so weit wie möglich nach vorn-oben führen.',
      'Position ruhig halten und tief atmen.'
    ],
    breathing: 'Tiefe, ruhige Atemzüge.',
    commonMistakes: [
      'Schultern nach vorn-oben zu den Ohren fallen lassen.'
    ]
  },
  {
    id: 'dreifacher-bully-tuerrahmen',
    name: 'Schulter-Extension („Bully“) im Türrahmen',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['tuerrahmen'],
    equipmentAlt: 'Türrahmen, Pfosten oder stabile Tischkante',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Vordere Schulterkapsel & Schulter-Extension',
    svgPose: 'standing-bully-frame',
    bodyHotspots: [{ x: 48, y: 28, view: 'side' }],
    image: null,
    setup: [
      'Einen Arm hinter den Rücken führen und mit der Hand am Türrahmen festhalten.',
      'Schulter zuerst bewusst nach hinten und unten zentriert im Gelenk platzieren.'
    ],
    execution: [
      'Den Oberkörper kontrolliert nach vorn bewegen, sodass der Arm weit hinter den Körper gelangt.',
      'Stets darauf achten, dass der Schulterkopf tief in der Gelenkpfanne bleibt.'
    ],
    breathing: 'Entspannte Bauchatmung, kein Hochziehen der Schulter.',
    commonMistakes: [
      'Schulterkopf kippt nach vorn-oben (typisches Stechen vorn an der Schulter).'
    ]
  },
  {
    id: 'banded-bully-innenrotation',
    name: 'Banded Bully mit Innenrotation & Nacken',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['band'],
    equipmentAlt: 'Stabiles Widerstandsband an Pfosten oder Türanker',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Vordere Schulterkapsel, Innenrotation & seitlicher Nacken',
    svgPose: 'standing-banded-bully',
    bodyHotspots: [{ x: 47, y: 25, view: 'side' }],
    image: null,
    setup: [
      'Ein Widerstandsband auf Schulterhöhe fixieren, in die Schlaufe steigen und das Band direkt über die vordere Schulter legen.',
      'Im Ausfallschritt aufrecht nach vorn gehen, sodass das Band die Schulter kräftig nach hinten-unten zieht.'
    ],
    execution: [
      'Den Arm der Bandseite hinter den Rücken in die Innenrotation führen.',
      'Um zusätzlich den Nacken zu dehnen, mit der freien Hand den Kopf sanft vom Band weg zur Gegenseite neigen und Position variieren.'
    ],
    breathing: 'Tief ein- und ausatmen, Schulter vom Band nach hinten ziehen lassen.',
    commonMistakes: [
      'Mit dem Oberkörper ins Hohlkreuz ausweichen statt aus der Hüfte zu stabilisieren.'
    ]
  },
  {
    id: 'anterior-schulterkapsel',
    name: 'Vordere Schulterkapsel-Mobilisation (Bauchlage)',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte auf Matte',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Vordere Schulterkapsel & Brustmuskelansatz',
    svgPose: 'prone-t-twist',
    bodyHotspots: [{ x: 35, y: 28, view: 'front' }, { x: 65, y: 28, view: 'front' }],
    image: null,
    setup: [
      'In Bauchlage beide Arme im 90°-Winkel zu einem „T“ zur Seite ausstrecken, Handflächen zeigen zum Boden.',
      'Eine Hand brustnah am Boden aufstützen.'
    ],
    execution: [
      'Mit der brustnahen Hand den Oberkörper behutsam aufdrehen – weg vom Stützarm, hin zum noch flach am Boden liegenden Arm.',
      'Dehnung im vorderen Schulterbereich spüren und ruhig halten.'
    ],
    breathing: 'Langsam atmen und bei jedem Ausatmen minimal weiter aufdrehen.',
    commonMistakes: [
      'Schulter des liegenden Arms wandert Richtung Ohr oder hebt ab.'
    ]
  },
  {
    id: 'prayer-stretch',
    name: 'Prayer Stretch (Latissimus & BWS)',
    phase: 2,
    region: 'bws-ruecken',
    equipment: ['kiste'],
    equipmentAlt: 'Heizung, Stuhllehne, Bettkante oder Tisch',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Latissimus dorsi, Brustwirbelsäule & Trizeps',
    svgPose: 'kneeling-prayer-stretch',
    bodyHotspots: [{ x: 54, y: 31, view: 'side' }],
    image: null,
    setup: [
      'Vor einen Vorsprung (Stuhl, Bett, Heizung) knien.',
      'Beide Handaußenkanten mit nach oben zeigenden Daumen und gestreckten Ellenbogen auflegen.'
    ],
    execution: [
      'Den Kopf zwischen den gestreckten Armen hindurch Richtung Boden absenken, während der Rücken möglichst gerade bleibt (kein Hohlkreuz erzwingen).',
      'Optional das Gewicht weit zu einer Seite verlagern, um eine Flanke gezielt intensiver zu dehnen.'
    ],
    breathing: 'Tief in den seitlichen Brustkorb einatmen.',
    commonMistakes: [
      'Starke Lendenwirbel-Überstreckung statt Öffnung in BWS und Schulter.'
    ]
  },
  {
    id: 'scapular-roll',
    name: 'Scapular Roll in Rückenlage',
    phase: 2,
    region: 'schulter-nacken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte auf Matte',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Schulter-Innenrotation & hintere Kapsel',
    svgPose: 'supine-scapular-roll',
    bodyHotspots: [{ x: 50, y: 28, view: 'side' }],
    image: null,
    setup: [
      'Auf den Boden setzen, einen Arm komplett hinter den Rücken führen, sodass der Handrücken das gegenüberliegende Schulterblatt berührt.'
    ],
    execution: [
      'Auf die Schulter dieses Arms legen und den Körper behutsam weiter auf den Rücken herumrollen (Becken und unterer Rücken folgen).',
      'In dieser Position abwechselnd den hinteren Arm sanft in den Boden bzw. in den eigenen Rücken drücken und einige Sekunden halten.'
    ],
    breathing: 'Ruhige Atmung, keinen stechenden Gelenkschmerz zulassen.',
    commonMistakes: [
      'Zu schnelles Herumrollen auf die Schulter ohne Kontrolle.'
    ]
  },
  {
    id: 'handgelenk-unterarm-rocks',
    name: 'Handgelenk- & Unterarm-Rocks',
    phase: 2,
    region: 'arme-hand',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Unterarmbeuger, Handgelenk & Bizepssehne',
    svgPose: 'quadruped-wrist-rocks',
    bodyHotspots: [{ x: 25, y: 50, view: 'front' }, { x: 75, y: 50, view: 'front' }],
    image: null,
    setup: [
      'In den Vierfüßlerstand gehen und die Hände umgedreht aufsetzen, sodass die Finger zu den Knien zeigen.',
      'Ellenbogen bleiben komplett durchgestreckt.'
    ],
    execution: [
      'Den gesamten Oberkörper langsam so weit wie möglich nach hinten Richtung Fersen und wieder nach vorn verlagern.',
      'Am Ende der Bewegung die Finger aktiv in den Boden krallen, um die Mobilisierung zu vertiefen.'
    ],
    breathing: 'Gleichmäßige Atmung, Schultern weg von den Ohren.',
    commonMistakes: [
      'Ellenbogen beugen, um der Dehnung auszuweichen.',
      'Handballen hebt komplett ab – lieber Winkel zu den Knien etwas verringern.'
    ]
  },
  {
    id: 'bizeps-spuelen-stretch',
    name: 'Bizeps-Stretch an Vorsprung / Fensterbank',
    phase: 2,
    region: 'arme-hand',
    equipment: ['kiste'],
    equipmentAlt: 'Tischkante, Fensterbank, Spüle oder Heizung',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. biceps brachii & vordere Schulter',
    svgPose: 'kneeling-biceps-ledge',
    bodyHotspots: [{ x: 46, y: 35, view: 'side' }],
    image: null,
    setup: [
      'Mit dem Rücken zu einem stabilen Vorsprung (Spüle, Fensterbank, Tisch) hinknien.',
      'Beide gestreckten Arme nach hinten führen und Hände (Daumen nach oben) auflegen oder festhalten.'
    ],
    execution: [
      'Den Oberkörper mit gestreckten Ellenbogen kontrolliert nach vorn-unten absenken, bis eine klare Dehnung im Bizeps entsteht.'
    ],
    breathing: 'Tief und ruhig atmen.',
    commonMistakes: [
      'Ellenbogen anwinkeln.',
      'Schultern nach vorn einrollen statt Brust aufrecht zu lassen.'
    ]
  },

  // ==================== PHASE 3: AKTIVIERUNG & STABILITÄT ====================
  {
    id: 'luftberge-welle',
    name: 'Atemwelle („Luftberge“) im Liegen',
    phase: 3,
    region: 'rumpf',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte auf Matte oder Teppich',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Zwerchfell, TVA & Brustkorb-Mobilität',
    svgPose: 'supine-breathing-wave',
    bodyHotspots: [{ x: 50, y: 39, view: 'front' }],
    image: null,
    setup: [
      'Mit angewinkelten Beinen und neutralem, flachem Rücken auf den Boden legen.'
    ],
    execution: [
      'Tief in den Bauch einatmen, bis er sich deutlich wölbt.',
      'Luft locker anhalten und die gesamte Luft in den Brustkorb hochschieben – dabei wird der Bauch flach und der Bauchnabel zieht zur Wirbelsäule. Kurz Gegendruck spüren.',
      'Luft wieder zurück in den Bauch schieben, kurz halten, dann ausatmen. 10–20 Wellen durchführen.'
    ],
    breathing: 'Kontrollierte Atemverschiebung bei geschlossenem Atemweg (kein Pressen in den Kopf).',
    commonMistakes: [
      'Schultern verkrampft hochziehen beim Hochschieben in den Brustkorb.'
    ]
  },
  {
    id: 'bracing-atmung',
    name: 'Bracing-Atmung (360°-TVA-Kompression)',
    phase: 3,
    region: 'rumpf',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte im Stand oder Sitz',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Tiefer querer Bauchmuskel (TVA) & Rumpfstabilität',
    svgPose: 'standing-bracing',
    bodyHotspots: [{ x: 50, y: 44, view: 'front' }],
    image: null,
    setup: [
      'Aufrecht nach BodyMap-Grundhaltung hinstellen, Hände seitlich an die Taille legen.'
    ],
    execution: [
      'Tief in den Bauch einatmen, sodass sich der Rumpf 360° rundum füllt.',
      'Die Luft nun mit Hilfe der seitlichen Bauchmuskulatur (TVAs) und Rückenmuskulatur von allen Seiten herauspressen – wie ein Ballon, der gleichmäßig zusammengedrückt wird.',
      'Nach dem Herausdrücken 2–3 Sekunden volle Rumpfspannung halten und wiederholen.'
    ],
    breathing: 'Kraftvoller, kontrollierter Ausatemstoß durch aktive Rumpfkompression.',
    commonMistakes: [
      'Nur die vordere gerade Bauchmuskulatur anspannen, während die Flanken weich bleiben.'
    ]
  },
  {
    id: 'ruecken-stabilisierung-bauchatmung',
    name: 'Rückenstabilisierung an Wand mit Bauchatmung',
    phase: 3,
    region: 'rumpf',
    equipment: ['wand'],
    equipmentAlt: 'Freie Wandfläche',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'LWS-Stabilisierung & TVA unter Atmung',
    svgPose: 'wall-posture-breath',
    bodyHotspots: [{ x: 50, y: 46, view: 'side' }],
    image: null,
    setup: [
      'Mit dem Rücken an eine Wand stellen, Füße leicht vorgestellt sodass du dich sanft anlehnen kannst.',
      'Hüfte leicht vorschieben, unteren Rücken komplett flach an die Wand drücken, Ellenbogen an die Wand, BWS strecken und Schultern hinten-unten platzieren.'
    ],
    execution: [
      'Unter dauerhafter Rumpfspannung kontrolliert in den Bauch einatmen und die Luft mit aktiver Bauchspannung wieder ausatmen.',
      'Den Kontakt des unteren Rückens zur Wand zu keinem Zeitpunkt verlieren.'
    ],
    breathing: 'Atmen trotz aktiver Rumpfspannung (Bracing).',
    commonMistakes: [
      'Beim Einatmen ins Hohlkreuz fallen und den Wandkontakt der LWS verlieren.'
    ]
  },
  {
    id: 'ruecken-stabilisierung-hueftbeugung',
    name: 'Rückenstabilisierung an Wand mit Hüftbeugung',
    phase: 3,
    region: 'rumpf',
    equipment: ['wand'],
    equipmentAlt: 'Freie Wandfläche',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'TVA, Hüftbeuger-Kontrolle & LWS-Stabilität',
    svgPose: 'wall-hip-flexion',
    bodyHotspots: [{ x: 50, y: 48, view: 'side' }],
    image: null,
    setup: [
      'Füße direkt an die Wand stellen; Kopf, Schultern, unterer Rücken und Hüfte flach an die Wand drücken.'
    ],
    execution: [
      'TVA-Bauchspannung aktivieren und ein Knie auf 90° anheben.',
      'Mit voll aktiver Bauchspannung das Knie noch weiter maximal Richtung Nasenspitze ziehen, ohne den flachen Rückenkontakt zur Wand zu verlieren.',
      '2 Sekunden halten, absetzen und Seiten wechseln.'
    ],
    breathing: 'Beim Hochziehen des Knies aktiv ausatmen und Rumpf fest halten.',
    commonMistakes: [
      'Unterer Rücken wölbt sich von der Wand ab.',
      'Kopf verliert Wandkontakt.'
    ]
  },
  {
    id: 'l-aktivierung',
    name: 'L-Aktivierung im Liegen',
    phase: 3,
    region: 'rumpf',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte auf Matte',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'interval',
    timerPhases: [
      { label: 'Satz 1 · Spannung halten', seconds: 5, cue: 'Zehen & Knie zur Nase – seitliche Bauchspannung voll aktiv!' },
      { label: 'Satz 1 · Kurz lösen', seconds: 5, cue: 'Kurz entspannen, Rücken bleibt flach' },
      { label: 'Satz 2 · Spannung halten', seconds: 5, cue: 'TVA seitlich tasten – Kopf gerade' },
      { label: 'Satz 2 · Kurz lösen', seconds: 5, cue: 'Durchatmen' },
      { label: 'Satz 3 · Spannung halten', seconds: 5, cue: 'Volle Spannung – LWS flach am Boden' },
      { label: 'Satz 3 · Kurz lösen', seconds: 5, cue: 'Durchatmen' },
      { label: 'Satz 4 · Spannung halten', seconds: 5, cue: 'Zehen zur Nase, Beine gestreckt' },
      { label: 'Satz 4 · Kurz lösen', seconds: 5, cue: 'Durchatmen' },
      { label: 'Satz 5 · Spannung halten', seconds: 5, cue: 'Flanken fest anspannen' },
      { label: 'Satz 5 · Kurz lösen', seconds: 5, cue: 'Durchatmen' },
      { label: 'Satz 6 · Spannung halten', seconds: 5, cue: 'Letzte 5 Sekunden volle Kontrolle!' },
      { label: 'Satz 6 · Beenden', seconds: 5, cue: 'Sauber lösen' }
    ],
    targetZone: 'TVA, vordere Rumpf- und Beinachse',
    svgPose: 'supine-l-activation',
    bodyHotspots: [{ x: 50, y: 44, view: 'side' }],
    image: null,
    setup: [
      'In Rückenlage den unteren Rücken komplett flach auf den Boden drücken.',
      'Beine senkrecht nach oben strecken, sodass der Körper ein „L“ bildet; Kopf bleibt gerade am Boden.'
    ],
    execution: [
      'Fußspitzen und Knie gedanklich Richtung Nase ziehen, während du maximale Rumpfspannung aufbaust.',
      'Mit den Fingern seitlich in die Taille tasten, um die Aktivierung der tiefen Bauchmuskulatur (TVA) zu prüfen. 5 Sekunden halten, kurz lösen und wiederholen.'
    ],
    breathing: 'Unter Spannung ruhig weiteratmen (kein Pressen).',
    commonMistakes: [
      'Kopf vom Boden abheben oder Nacken verkrampfen.',
      'Unterer Rücken hebt ab (dann Knie minimal beugen).'
    ]
  },
  {
    id: 'zylinder-aktivierung',
    name: 'Zylinder-Aktivierung an der Wand',
    phase: 3,
    region: 'rumpf',
    equipment: ['wand'],
    equipmentAlt: 'Freie Wandfläche',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Zwerchfell-Zylinder & intraabdominaler Druck',
    svgPose: 'wall-posture-breath',
    bodyHotspots: [{ x: 50, y: 39, view: 'side' }],
    image: null,
    setup: [
      'Mit 5–10 cm Fußabstand vor einer Wand stehen; Kopf, aufgerichtete BWS und unterer Rücken liegen flach an der Wand.'
    ],
    execution: [
      'Eine mittlere Vorspannung in der seitlichen Bauchmuskulatur aufbauen.',
      'Ohne den Brustkorb stark anzuheben wie durch einen Strohhalm Luft tief bis in den Bauchraum einatmen, sodass das Zwerchfell nach unten drückt und den Zylinder stabilisiert.',
      'In dieser Position einmal voll kontrahieren und wiederholen, ohne den Wandkontakt zu verlieren.'
    ],
    breathing: 'Kontrollierte „Strohhalm-Einatmung“ gegen mittlere Rumpfspannung.',
    commonMistakes: [
      'Kopf oder Lendenwirbelsäule lösen sich beim Einatmen von der Wand.'
    ]
  },
  {
    id: 'kniender-frontsquat',
    name: 'Kniender Frontsquat (BWS-Aufrichtung)',
    phase: 3,
    region: 'bws-ruecken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte im Vierfüßler',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'interval',
    timerPhases: [
      { label: 'Satz 1 · Aufrichten & halten', seconds: 5, cue: 'Arme außenrotieren, Brustbein zum Kinn drücken, einatmen' },
      { label: 'Satz 1 · Lösen', seconds: 5, cue: 'Spannung kurz zurücknehmen' },
      { label: 'Satz 2 · Aufrichten & halten', seconds: 5, cue: 'Knie isometrisch zu den Händen ziehen, BWS strecken' },
      { label: 'Satz 2 · Lösen', seconds: 5, cue: 'Kurz lösen' },
      { label: 'Satz 3 · Aufrichten & halten', seconds: 5, cue: 'Ellenbeugen zeigen nach vorn, Brustbein hoch' },
      { label: 'Satz 3 · Lösen', seconds: 5, cue: 'Kurz lösen' },
      { label: 'Satz 4 · Aufrichten & halten', seconds: 5, cue: 'Tiefer Atemzug in die obere Brust' },
      { label: 'Satz 4 · Lösen', seconds: 5, cue: 'Kurz lösen' },
      { label: 'Satz 5 · Aufrichten & halten', seconds: 5, cue: 'Bauch fest, BWS maximal gestreckt' },
      { label: 'Satz 5 · Lösen', seconds: 5, cue: 'Kurz lösen' },
      { label: 'Satz 6 · Aufrichten & halten', seconds: 5, cue: 'Letzte 5 Sekunden volle Aufrichtung!' },
      { label: 'Satz 6 · Beenden', seconds: 5, cue: 'Sauber lösen' }
    ],
    targetZone: 'Brustwirbelsäulen-Strecker, Skapula & Rumpf',
    svgPose: 'quadruped-frontsquat',
    bodyHotspots: [{ x: 52, y: 31, view: 'side' }],
    image: null,
    setup: [
      'In den Vierfüßlerstand gehen, Bauch aktiv anspannen.'
    ],
    execution: [
      'Knie mit leichter Vorspannung isometrisch Richtung Handflächen ziehen.',
      'Arme nach außen rotieren (Ellenbeugen zeigen nach vorn) und das Brustbein aktiv Richtung Kinn hochdrücken – wie beim Halten einer Langhantel im Frontsquat.',
      '5 Sekunden halten, leicht lösen und wiederholen.'
    ],
    breathing: 'Beim Hochdrücken des Brustbeins tief in die Brust einatmen, um die BWS-Streckung zu verstärken.',
    commonMistakes: [
      'Ausweichen ins Hohlkreuz der LWS statt Streckung der BWS.'
    ]
  },
  {
    id: 'wall-squat',
    name: 'Wall Squat (Einfach & Schwer)',
    phase: 3,
    region: 'huefte-beine',
    equipment: ['wand'],
    equipmentAlt: 'Glatte Wandfläche',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Rumpf- & Wirbelsäulenstabilität in der Kniebeuge',
    svgPose: 'wall-squat',
    bodyHotspots: [{ x: 50, y: 50, view: 'side' }],
    image: null,
    setup: [
      'Mit dem Rücken an eine Wand stellen, Füße mit genügend Abstand nach vorn platzieren.',
      'Volle BodyMap-Vorspannung einnehmen (unterer Rücken komplett flach an der Wand).'
    ],
    execution: [
      'Einfach: Po langsam an der Wand hinuntergleiten lassen und Knie beugen, während der untere Rücken ohne jede Bewegung flach an der Wand bleibt.',
      'Schwer: Nach voller Rumpfausrichtung den Oberkörper zuerst nur über die Hüfte nach vorn klappen (mit 2-Finger-Test an der LWS Wirbelsäulenbewegung ausschließen) und dann mit dem Po an der Wand in die Kniebeuge gleiten.'
    ],
    breathing: 'Kontrollierte Atmung unter stabiler Bauchspannung.',
    commonMistakes: [
      'Wirbelsäule rundet unten ein oder hebt von der Wand ab.',
      'Spannung nur aus dem unteren Rücken statt aus der Bauchspannung.'
    ]
  },
  {
    id: 'progressive-plank',
    name: 'Progressive Plank mit Stab (Einfach & Schwer)',
    phase: 3,
    region: 'rumpf',
    equipment: ['stab'],
    equipmentAlt: 'Besenstiel auf dem Rücken als Ausrichtungskontrolle',
    travelFriendly: false,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'interval',
    timerPhases: [
      { label: 'Satz 1 · 3-Punkte-Plank', seconds: 5, cue: 'Kopf, BWS & Kreuzbein am Stab – max. 1 Fingerbreit an LWS' },
      { label: 'Satz 1 · Pause', seconds: 5, cue: 'Kurz absetzen oder Position halten' },
      { label: 'Satz 2 · 3-Punkte-Plank', seconds: 5, cue: 'Seitliche Bauchspannung voll aktiv' },
      { label: 'Satz 2 · Pause', seconds: 5, cue: 'Kurz durchatmen' },
      { label: 'Satz 3 · 3-Punkte-Plank', seconds: 5, cue: 'Kein Punkt weicht vom Stab ab' },
      { label: 'Satz 3 · Pause', seconds: 5, cue: 'Kurz durchatmen' },
      { label: 'Satz 4 · 3-Punkte-Plank', seconds: 5, cue: 'Becken neutral halten' },
      { label: 'Satz 4 · Pause', seconds: 5, cue: 'Kurz durchatmen' },
      { label: 'Satz 5 · 3-Punkte-Plank', seconds: 5, cue: 'Unterarme drücken stabil in Boden' },
      { label: 'Satz 5 · Pause', seconds: 5, cue: 'Kurz durchatmen' },
      { label: 'Satz 6 · 3-Punkte-Plank', seconds: 5, cue: 'Letzte 5 Sekunden perfekte Linie!' },
      { label: 'Satz 6 · Beenden', seconds: 5, cue: 'Sauber absetzen' }
    ],
    targetZone: 'Tiefe Bauchmuskulatur (TVA) & Wirbelsäulenneutrale',
    svgPose: 'plank-stick',
    bodyHotspots: [{ x: 50, y: 45, view: 'side' }],
    image: null,
    setup: [
      'Einen Stab entlang des Rückens auflegen, sodass er 3 Punkte berührt: Hinterkopf, oberer Rücken (BWS) und Kreuzbein; an der LWS bleibt maximal ein Fingerbreit Luft.'
    ],
    execution: [
      'Einfach: Im Unterarmstütz auf den Knien starten und die Knie zentimeterweise nach hinten schieben, bis die Bauchmuskulatur intensiv arbeitet – ohne dass ein Kontaktpunkt verloren geht. 5 Sekunden halten.',
      'Schwer: Beine komplett auf die Füße durchstrecken – nur wählen, wenn alle 3 Kontaktpunkte sicher gehalten werden.'
    ],
    breathing: 'Ruhig weiteratmen, Bauchspannung nicht fallen lassen.',
    commonMistakes: [
      'Durchhängen im unteren Rücken (Kreuzbein verliert Stabkontakt oder LWS-Lücke wird groß).'
    ]
  },
  {
    id: 'externe-rotation-band',
    name: 'Schulter-Außenrotation mit Band',
    phase: 3,
    region: 'schulter-nacken',
    equipment: ['band'],
    equipmentAlt: 'Leichtes Widerstandsband oder Kabelzug',
    travelFriendly: false,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Rotatorenmanschette (Infraspinatus, Teres minor) & Skapula',
    svgPose: 'standing-band-er',
    bodyHotspots: [{ x: 47, y: 29, view: 'side' }],
    image: null,
    setup: [
      'Leichtes Widerstandsband seitlich auf Ellenbogenhöhe befestigen, hüftbreit und stabil parallel zum Ankerpunkt stehen.',
      'Band mit dem ankerseitigen Arm greifen, Schulter hinten-unten neutral positionieren.'
    ],
    execution: [
      'Hand zunächst zum Bauch ziehen und dann kontrolliert vom Band nach außen in die volle Außenrotation führen lassen – der Fokus liegt auf der langsamen Bewegung nach außen.',
      'Am Endpunkt kurz verharren und langsam zurückführen.'
    ],
    breathing: 'Ruhig atmen, Oberarm bleibt nah am Körper.',
    commonMistakes: [
      'Schulter rollt nach vorn statt hinten-unten stabil zu bleiben.',
      'Zu hohes Bandgewicht, das die Technik bricht.'
    ]
  },
  {
    id: 'schneeengel-externe-rotation',
    name: 'Schneeengel in Außenrotation',
    phase: 3,
    region: 'schulter-nacken',
    equipment: ['gewicht'],
    equipmentAlt: 'Zwei kleine Wasserflaschen (0,5 l) oder ohne Gewicht',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 90,
    timerMode: 'hold',
    targetZone: 'Serratus anterior, unterer Trapezius & Rotatorenmanschette',
    svgPose: 'supine-snow-angel',
    bodyHotspots: [{ x: 35, y: 28, view: 'front' }, { x: 65, y: 28, view: 'front' }],
    image: null,
    setup: [
      'In Rückenlage Beine aufstellen (LWS flach), in jede Handfläche eine leichte Gewichtsscheibe oder kleine Flasche legen.',
      'Mit leicht angewinkelten Armen über dem Kopf starten; Hände und Ellenbogen haben Bodenkontakt.'
    ],
    execution: [
      'Die Ellenbogen langsam so tief wie möglich seitlich nach unten ziehen, ohne dass Hände oder Handgelenke vom Boden abheben.',
      'Dabei bewusst Latissimus und Serratus zum Herunterziehen sowie leichte Schulterblatt-Abspreizung spüren.'
    ],
    breathing: 'Ruhig und tief atmen, kein Hohlkreuz zulassen.',
    commonMistakes: [
      'Hände heben vom Boden ab.',
      'Rippenbogen springt nach oben (Bauchspannung halten).'
    ]
  },
  {
    id: 'scapula-spreizen',
    name: 'Skapula-Spreizen (Einfach & Schwer)',
    phase: 3,
    region: 'schulter-nacken',
    equipment: ['wand'],
    equipmentAlt: 'Handtuch oder Ball + Wand',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'M. serratus anterior & Schulterblatt-Führung',
    svgPose: 'standing-scapula-spread',
    bodyHotspots: [{ x: 35, y: 29, view: 'front' }, { x: 65, y: 29, view: 'front' }],
    image: null,
    setup: [
      'Einfach: Zusammengerolltes Handtuch unter den angewinkelten Oberarm klemmen.',
      'Schwer: Ball oder Handtuch zwischen seitlicher Schulter und Wand platzieren.'
    ],
    execution: [
      'Einfach: Ellenbogen sanft Richtung Bauchseite hereindrücken und das bewusste Abspreizen des Schultergelenks vom Oberkörper spüren.',
      'Schwer: Aktiv mit der Schulter (und leicht mit dem Ellenbogen) von der Wand wegdrücken, mehrmals wiederholen und Anlehndruck bei Bedarf steigern.'
    ],
    breathing: 'Gleichmäßig weiteratmen, Nacken bleibt locker.',
    commonMistakes: [
      'Schulter nach oben zum Ohr ziehen statt seitlich abzuspreizen.'
    ]
  },
  {
    id: 'scapula-pullup',
    name: 'Skapula-Pullup (Überkopf-Schulteraktivierung)',
    phase: 3,
    region: 'schulter-nacken',
    equipment: ['stange'],
    equipmentAlt: 'Klimmzugstange oder stabiler Türrahmen',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Serratus anterior, Latissimus & Überkopf-Skapula',
    svgPose: 'overhead-bar-reach',
    bodyHotspots: [{ x: 36, y: 27, view: 'front' }, { x: 64, y: 27, view: 'front' }],
    image: null,
    setup: [
      'Unter Stange oder Türrahmen stellen, schulterbreit mit gestreckten Armen greifen, Schultern hinten-unten platzieren und leichte Abspreizung hinzufügen.'
    ],
    execution: [
      'Oberkörper durchstrecken, sodass der Kopf vor die Schultern kommt.',
      'Aktiv über Latissimus und Serratus besonders den unteren Schulterblattwinkel nach vorn schieben und in der leicht abgespreizten Position stabilisieren.'
    ],
    breathing: 'Tief in den aufgerichteten Brustkorb atmen.',
    commonMistakes: [
      'Passives Hängen in den Bändern ohne aktive Skapula-Führung.'
    ]
  },
  {
    id: 'scapula-pushups',
    name: 'Skapula-Pushups im Vierfüßler',
    phase: 3,
    region: 'schulter-nacken',
    equipment: ['none'],
    equipmentAlt: 'Ohne Geräte auf Matte',
    travelFriendly: true,
    bilateral: false,
    defaultSeconds: 60,
    timerMode: 'hold',
    targetZone: 'Schulterblatt-Protraktion & -Retraktion (Serratus / Trapezius)',
    svgPose: 'quadruped-scap-pushup',
    bodyHotspots: [{ x: 52, y: 29, view: 'side' }],
    image: null,
    setup: [
      'In den Vierfüßlerstand gehen (Knie am Boden), Hände schulterbreit, Arme komplett gestreckt.'
    ],
    execution: [
      'Mit gestreckten Armen die Schulterblätter langsam komplett zur Wirbelsäule und leicht nach unten zusammenziehen.',
      'Danach den Oberkörper so weit wie möglich vom Boden wegschieben (Schulterblätter gleiten weit auseinander). Die Bewegung findet ausschließlich im Schultergürtel statt.'
    ],
    breathing: 'Beim Hochschieben ausatmen, beim Absinken einatmen.',
    commonMistakes: [
      'Ellenbogen beugen.',
      'Ausweichen durch Rundrücken/Hohlkreuz in der Lendenwirbelsäule.'
    ]
  },
  {
    id: 'kettlebell-bottom-up',
    name: 'Bottom-Up Überkopf-Stabilisation',
    phase: 3,
    region: 'schulter-nacken',
    equipment: ['gewicht'],
    equipmentAlt: 'Umgedrehte volle Wasserflasche oder leichte Kurzhantel (1–6 kg)',
    travelFriendly: true,
    bilateral: true,
    defaultSeconds: 45,
    timerMode: 'hold',
    targetZone: 'Rotatorenmanschette, Serratus & Überkopf-Stabilität',
    svgPose: 'standing-bottom-up',
    bodyHotspots: [{ x: 35, y: 26, view: 'front' }, { x: 65, y: 26, view: 'front' }],
    image: null,
    setup: [
      'Aufrecht nach BodyMap-Prinzipien stehen (Rumpf aktiv, BWS aufrecht).',
      'Eine leichte Kettlebell (1–6 kg) „Bottom-Up“ (Boden zeigt nach oben) oder umgedrehte Wasserflasche mit gestrecktem Arm über den Kopf halten.'
    ],
    execution: [
      'Bei gestrecktem Ellenbogen und leicht abgespreiztem Schulterblatt sehr kleine, langsame Kreise über dem Kopf zeichnen.',
      'Rotatorenmanschette, Latissimus und Serratus führen das Gewicht frei ohne Verkrampfung.'
    ],
    breathing: 'Ruhige Bauchatmung unter Rumpfspannung.',
    commonMistakes: [
      'Brustmuskel verkrampfen oder Schultern nach hinten einklemmen.',
      'Ellenbogen einknicken oder ins Hohlkreuz fallen.'
    ]
  }
];

export const ROUTINES = [
  {
    id: 'all-around',
    title: 'Ganzkörper-Reset',
    subtitle: '25 Min · Wissenschaftliche 4-Phasen-Abfolge',
    badge: 'Empfohlen',
    accent: 'lime',
    durationLabel: '25 Min',
    goal: 'Löst Hauptengpässe von Fuß bis Nacken und verankert aufrechte Haltung.',
    exerciseIds: [
      'tfl-release',
      'piriformis-release',
      'pec-minor-release',
      'fuss-cycle',
      'couch-stretch',
      'bws-streckung-boden',
      'ueberkopf-durchstrecken',
      'luftberge-welle',
      'scapula-pushups'
    ]
  },
  {
    id: 'buero-ruecken',
    title: 'Schreibtisch- & Nacken-Reset',
    subtitle: '15 Min · BWS, Brust, Schulter & Nacken',
    badge: 'Fokus',
    accent: 'lavender',
    durationLabel: '15 Min',
    goal: 'Befreit verkürzte Brust- und Nackenmuskulatur und richtet die BWS auf.',
    exerciseIds: [
      'pec-major-release',
      'oberer-trapez-release',
      'nacken-stretches-3-richtungen',
      'bws-streckung-wand',
      'katzenbuckel-zu-siegerpose',
      'kniender-frontsquat',
      'scapula-spreizen'
    ]
  },
  {
    id: 'huefte-beine-flow',
    title: 'Hüfte, Knie & Sprunggelenk',
    subtitle: '20 Min · Unterkörper-Mobilität & PNF',
    badge: 'Unterkörper',
    accent: 'orchid',
    durationLabel: '20 Min',
    goal: 'Maximiert Hüftbeweglichkeit und Sprunggelenks-Dorsalextension.',
    exerciseIds: [
      'rectus-femoris-release',
      'glutaeus-medius-release',
      'waden-release-soleus',
      'sprunggelenk-mobilisation',
      'couch-stretch',
      'z-sitz-pnf',
      'hueftkapsel-distraktion',
      'wall-squat'
    ]
  },
  {
    id: 'schulter-ueberkopf',
    title: 'Schulter & Überkopf-Kraft',
    subtitle: '18 Min · Kapsel, Skapula & Rotatoren',
    badge: 'Oberkörper',
    accent: 'lavender',
    durationLabel: '18 Min',
    goal: 'Ideal vor Krafttraining oder bei Schulterenge.',
    exerciseIds: [
      'latissimus-release',
      'subscapularis-release',
      'sleeper-stretch-pnf',
      'prayer-stretch',
      'dreifacher-bully-tuerrahmen',
      'externe-rotation-band',
      'kettlebell-bottom-up'
    ]
  },
  {
    id: 'unterwegs-ohne-geraete',
    title: 'Unterwegs / Hotel-Routine',
    subtitle: '12 Min · 100 % ohne Geräte',
    badge: 'Reise-tauglich',
    accent: 'lime',
    durationLabel: '12 Min',
    goal: 'Funktioniert überall – im Hotelzimmer, Campervan oder zwischen zwei Schichten.',
    exerciseIds: [
      'adduktor-release-ellenbogen',
      'fuss-cycle',
      'z-sitz-pnf',
      'bws-drehung-lunge-squat',
      'nacken-stretches-3-richtungen',
      'bracing-atmung',
      'l-aktivierung'
    ]
  },
  {
    id: 'core-haltung',
    title: 'Rumpf- & Haltungs-Fundament',
    subtitle: '14 Min · TVA, Bracing & Wand-Kontrolle',
    badge: 'Haltung',
    accent: 'orchid',
    durationLabel: '14 Min',
    goal: 'Trainiert die tiefe Rumpfspannung für schmerzfreie LWS und aufrechten Stand.',
    exerciseIds: [
      'bauch-release-2-baelle',
      'seitlicher-bauch-release',
      'seitliche-oeffnung-bogen',
      'luftberge-welle',
      'ruecken-stabilisierung-bauchatmung',
      'ruecken-stabilisierung-hueftbeugung',
      'progressive-plank'
    ]
  }
];
