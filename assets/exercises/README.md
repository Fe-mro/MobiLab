# Eigene Übungsfotos hinzufügen

MobiLab nutzt standardmäßig lizenzfreie, minimalistische SVG-Illustrationen und anatomische Zielkarten.

Wenn du später eigene Fotos für bestimmte Übungen ergänzen möchtest:

1. Lege das Foto als `.jpg` oder `.webp` in diesem Ordner ab, benannt nach der jeweiligen Übungs-ID (z. B. `tfl-release.jpg` oder `couch-stretch.jpg`).
2. Öffne `data/exercises.js`, suche die Übung mit dieser `id` und ändere `image: null` zu `image: './assets/exercises/tfl-release.jpg'`.
3. Erhöhe in `sw.js` die Cache-Version (z. B. `mobilab-v2`), damit installierte Handys das neue Bild laden.

Die App zeigt automatisch dein Foto im Detail-Sheet und im Workout-Player an – und fällt auf die SVG-Illustration zurück, falls eine Datei fehlt.
