# MMT2026 — Provoware Modul Suite V2.3

Lokale, offline nutzbare Creator-Websuite aus HTML, CSS und Vanilla JavaScript. Keine Cloudpflicht, kein Tracking, keine externen CDN-Abhängigkeiten.

## Status

Entwicklungsstand: ca. 78 %. Der vorherige Planungs-/Dummy-Stand wurde durch eine startbare V2.3-Basis ersetzt.

## Start

```bash
./start_linux.sh
```

Alternativ `index.html` direkt im Browser öffnen.

## Enthalten

- dynamisches Workspace-System: Auto, 1, 2, 3, 4, 6, 9, Fokus
- Panels intern scrollbar, einklappbar und maximierbar
- Dashboard, Songwriter, Generator, Bausteine, Notizen, ToDo/Kalender, Prompts, Hashtags, Media-Planer, Projekte, Export, Einstellungen, Hilfe
- Standarddaten unter `daten/defaults/`
- JSON-Export und Import mit Backup
- Command Palette über Strg+K
- Dark, Light und Kontrast

## Tests

```bash
npm test
```

## Grenzen

Alte V2.x-Nutzerdaten waren im Repository nicht vorhanden. Deshalb ist echte Migration gegen Altbestände vorbereitet, aber nicht real belegbar. Ein echter Test mit nicht-technischer Person und Screenreader wurde dokumentiert, aber nicht durchgeführt.
