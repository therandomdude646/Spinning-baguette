Drehendes Bagett — einfache Webapp

Dieses kleine Projekt enthält eine einzelne Seite, die ein sich drehendes Bagett (SVG) anzeigt.

Dateien
- index.html — die Hauptseite (verlinkt mit styles.css und script.js)
- styles.css — CSS für Layout und Animation
- script.js — kleine JavaScript‑Logik (Regler steuert Drehdauer)

Lokale Vorschau
1. Öffne eine PowerShell in diesem Ordner (`c:\Users\Nico Mocnik\Desktop\website`).
2. Falls Python installiert ist, starte einen einfachen Server:

   python -m http.server 8000

3. Öffne im Browser: http://localhost:8000

Alternativ kannst du `index.html` direkt öffnen, aber für einige Browser ist ein HTTP‑Server zuverlässiger.

Hinweis
- Die Animation respektiert `prefers-reduced-motion` und pausiert, wenn diese Einstellung aktiv ist.
- Mit dem Regler auf der Seite kannst du die Drehdauer (Sekunden pro Umdrehung) einstellen.
