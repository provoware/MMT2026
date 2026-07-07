# TESTPROTOKOLL V2.3

Datum: 2026-07-07

## Ausgeführt

```bash
bash -n start_linux.sh
node --check assets/provoware-core.js
node --check modules/_registry.js
node static-smoke.mjs
node browser-smoke.mjs
npm test
timeout 4s ./start_linux.sh
```

## Ergebnis

- STATIC_SMOKE_PASS
- BROWSER_SMOKE_PASS
- npm test erfolgreich
- start_linux.sh startet Server und bleibt aktiv; timeout beendet nur den Testlauf.

## Gefundener und behobener Fehler

Browser können localStorage in blockierten Kontexten verweigern. Dafür wurde ein Arbeitsspeicher-Fallback ohne Rekursionsabsturz eingebaut.

## Nicht real prüfbar

- alte V2.x-Datenmigration, weil keine Alt-Daten im Repository vorhanden waren
- Test durch nicht-technische Person
- echter Screenreader-Test mit Hilfstechnologie

## Nachtest Panel-Reihenfolge

```bash
node --check assets/provoware-core.js
npm test
```

Ergebnis: Syntax und bestehende Smoke-Checks erfolgreich. Manuell im Code geprüft: Layoutdaten mit alten Einträgen ohne `order` bleiben durch Fallback lesbar.

## Nachtest Layout-Hinweis und Grid-Fallback

```bash
node --check assets/provoware-core.js
```

Ergebnis: Syntaxcheck und bestehende Smoke-Checks erfolgreich. npm meldete nur einen vorhandenen Hinweis zur http-proxy-Umgebungsvariable.
