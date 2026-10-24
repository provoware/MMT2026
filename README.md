# MMT2026 — Provoware Modul Suite V2.3

Lokale, offline nutzbare Creator-Websuite aus HTML, CSS und Vanilla JavaScript. Keine Cloudpflicht, kein Tracking, keine externen CDN-Abhängigkeiten.

## Status

Entwicklungsstand: startbare V2.3-Basis; **noch kein vollständig geprüfter Release-Kandidat**. Offene Pflichten und Nachweise: [Release-Pflichtmatrix](docs/RELEASE_PFLICHTMATRIX.md).

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
- JSON-Export und Import mit verpflichtender Sicherung, Rücksetzung bei Speicherfehlern und Wiederherstellungs-Schaltfläche
- Command Palette über Strg+K
- Dark, Light und Kontrast

## Tests

```bash
npm test
```

## Grenzen

Alte V2.x-Nutzerdaten waren im Repository nicht vorhanden. Deshalb ist echte Migration gegen Altbestände vorbereitet, aber nicht real belegbar. Ein echter Test mit nicht-technischer Person und Screenreader wurde dokumentiert, aber nicht durchgeführt.

**Speicherhinweis:** Bei einem Speicherfehler bleiben Formulareingaben sichtbar. Der Eintrag wurde dann **nicht dauerhaft gespeichert**. Speicherzugriff prüfen und erneut speichern; regelmäßig JSON exportieren.
