# MMT2026 — Provoware Modul Suite

Dieses Repository ist fuer die Weiterentwicklung der **Provoware Modul Suite** vorgesehen.
Die Suite soll eine lokale, offline nutzbare Creator-Websuite aus HTML, CSS und Vanilla JavaScript bleiben.

## Aktueller Repository-Status

Der aktuelle Arbeitsbaum enthaelt nur die Projekt- und Planungsdateien:

- `AGENTS.md` mit Zielbild, Regeln und Akzeptanzkriterien
- `README.md` als Einstieg fuer Entwicklerinnen und Entwickler
- `todo.txt` mit Recovery-Plan und naechsten Schritten

Die eigentliche Websuite ist im Arbeitsbaum aktuell **nicht vorhanden**. Deshalb duerfen noch keine Modul-, Layout-, Daten- oder Startskript-Aenderungen geraten oder kuenstlich rekonstruiert werden.

## Erwartete Basisstruktur der Suite

Nach dem Einspielen des echten Projektstands sollten mindestens diese Pfade vorhanden sein:

```text
index.html
assets/
  provoware-core.css
  provoware-core.js
modules/
  _registry.js
  modules.manifest.json
  module.songwriter.html
  module.genre-generator.html
  module.textblocks.html
  module.notes.html
  module.todo-calendar.html
daten/
sicherungen/
start_linux.sh
README_START_HIER.txt
```

## Naechster bester Schritt

1. Den echten aktuellen Stand der Provoware Modul Suite in dieses Repository uebernehmen.
2. Danach `git status --short` ausfuehren und unerwartete Dateien klaeren.
3. `start_linux.sh` pruefen, falls vorhanden.
4. `index.html` und alle Module lokal oeffnen.
5. Erst danach gezielt den ersten kleinen Workspace-Core-Patch planen.

## Arbeitsregeln fuer weitere Entwicklung

- Keine Framework-Migration ohne zwingenden Grund.
- Keine externen CDN-, Cloud- oder Tracking-Abhaengigkeiten.
- Keine vorhandenen Nutzerdaten ueberschreiben.
- Bestehende `localStorage`-Keys nur mit dokumentierter Migration aendern.
- Gemeinsame Logik in `assets/provoware-core.js` buendeln.
- Gemeinsames Styling in `assets/provoware-core.css` buendeln.
- Modul-spezifische Logik in den jeweiligen Moduldateien belassen.
- Registry und Manifest konsistent halten.

## Validierung nach Projektimport

Die erste sinnvolle Pruefung nach dem Projektimport ist bewusst klein:

```bash
git status --short
find . -maxdepth 3 -type f -not -path './.git/*' | sort
bash -n start_linux.sh
node --check assets/provoware-core.js
node --check modules/_registry.js
```

Nur vorhandene und direkt betroffene Dateien sollen geprueft werden. Volltests und Playwright-Smoke-Tests sind erst sinnvoll, wenn die App-Dateien vorhanden sind.

## Wichtige Dateien fuer die Uebergabe

- `AGENTS.md`: verbindliche Projekt- und Arbeitsregeln
- `todo.txt`: aktueller Recovery-Plan und offene Punkte
- `README.md`: dieser Einstieg und Entwicklerhinweise

## Nicht in diesem Zustand tun

- Keine Platzhalter-App erzeugen.
- Keine Moduldateien erfinden.
- Keine Standarddaten ohne echte Zielstruktur einbauen.
- Keine Testframeworks installieren, solange keine testbare App vorhanden ist.
- Keine kosmetischen Grossumbauten ohne vorhandenen Codebestand durchfuehren.
