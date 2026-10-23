# Release-Pflichtmatrix – MMT2026

Stand: 2026-10-24. PR: https://github.com/provoware/MMT2026/pull/26 (Entwurf). Entwicklungszweig: `codex/mmt2026-safe-import-20261024`. Zuletzt geprüfter PR-Head: `8abe7c24edb2bb90e0b9679dff5a8323da42fec4`; Grundlage: `main` bei `f32edbd7420203dbe21607e7b8b7625c2c8554d6`. Aktuellen Head stets über den PR-Link prüfen.
Aktuellen Head, Pull Request und Prüfläufe über den Zweig bzw. die PR in GitHub ermitteln; die Werte hier sind Momentaufnahmen und keine Freigabe.
Status: **PASS** nur mit überprüfbarer Evidenz; **TEILWEISE** = unvollständig; **OFFEN** = nicht geprüft; **BLOCKIERT** = Pflicht verhindert Vorrelease.

| Release-Pflicht | Soll | Ist / Nachweis | Status |
|---|---|---|---|
| Fachfunktionen | Alle zugesagten Module vollständig | `modules/_registry.js` enthält Module; einzelne Module enthalten noch Platzhalter | TEILWEISE |
| Grenzfälle | Leere, beschädigte, große und alte Eingaben | `browser-smoke.mjs` prüft ungültige Importe, Alt-Export und Speicherfehler; weitere Fälle fehlen | TEILWEISE |
| Datensicherheit | Kein stiller Datenverlust | Import mit vorab gesicherter Browserkopie, Rücksetzung bei Schreibfehlern; andere Speichervorgänge noch ohne Fehlerdialog | TEILWEISE |
| Wiederherstellung | Daten vor Import wiederherstellbar | `PV.Exporter.restoreBackup()` und Schaltfläche im Export-Center; Stromausfall nicht getestet | TEILWEISE |
| Fehlerbehandlung | Verständliche Fehler und sichere Abbrüche | Importfehler melden Sicherungs- und Rücksetzungsstatus; andere Module offen | TEILWEISE |
| Sicherheit | Keine fremden Skripte/HTML-Injektion | `PV.safe` vorhanden; vollständige Eingabe-/HTML-/Abhängigkeitsprüfung fehlt | TEILWEISE |
| Design und Lesbarkeit | Verständliche Oberfläche | Themes und Panel-Ansicht vorhanden; Sichtprüfung offen | TEILWEISE |
| 800 × 600, hohe Skalierung | Keine abgeschnittene Bedienung | Keine echte Prüfung belegt | OFFEN |
| Tastatur / Barrierefreiheit | Fokus, Dialoge, Screenreader | Strg+K vorhanden; echte Tastatur- und Screenreader-Prüfung fehlt | TEILWEISE |
| Performance | Messbare Grenzen bei großen Datenmengen | Keine Last- und Speichergrenztests belegt | OFFEN |
| Wartbarkeit | Gemeinsamer Kern, nachvollziehbare Module | `assets/provoware-core.js`, `modules/_registry.js`; Registry/Manifest-Abgleich offen | TEILWEISE |
| Installation / Paketierung | Offline-Start unter Linux | `start_linux.sh` vorhanden; Kubuntu-/Pakettest offen | TEILWEISE |
| Automatische Funktionstests | Datenpfade und Fehlermodi reproduzierbar | `browser-smoke.mjs` und `static-smoke.mjs`; tatsächliche CI-Ergebnisse im PR prüfen | TEILWEISE |
| Integration | Module und Datenübergaben geprüft | Laufzeit-Smoke vorhanden; vollständige Integrationsfälle fehlen | TEILWEISE |
| GUI / Browser | Echte Browser auf 800 × 600 und Skalierung | `tests/provoware-smoke.spec.js` ist Platzhalter; Node-VM-Test ist kein Browser-Test | BLOCKIERT |
| Regression | Alte Nutzerdaten bleiben lesbar | Import-Regressionen ergänzt; echte V2.x-Bestände fehlen | TEILWEISE |
| CI | Pflichtprüfungen grün, keine übersprungenen Tests | PR #26, Lauf 40042415022: Node 20 und 22 erfolgreich; nur Smoke-Tests, keine echten Browserprüfungen | TEILWEISE |
| Dokumentation | Start, Daten, Fehler, Wiederherstellung | README, TODO, Testprotokoll, diese Matrix; weitere Nachweise offen | TEILWEISE |
| Release-Vorbereitung | Vollständiger eingefrorener Kandidat | Kein Gesamt-Test, keine technische Freigabe, keine Veröffentlichung | BLOCKIERT |

## Arbeitspaket: Import mit Sicherung und Rücksetzung

Ziel: Ein fehlgeschlagener Import darf nicht als erfolgreich gelten und soll zuvor vorhandene Browserdaten nicht verändern. Betroffene Dateien: `assets/provoware-core.js`, `modules/_registry.js`, `browser-smoke.mjs`, Dokumentation. Kein Austausch des Speicherformats und keine Änderung an Nutzerdaten auf GitHub.

Umgesetzt: Browser-Speicher vor Import prüfen, Sicherung vor Schreibbeginn verbindlich erstellen, bei Fehlern bisherige Werte zurücksetzen, interne Sicherung aus Export ausschließen, Alt-Exporte mit internem Sicherungsschlüssel tolerieren, Wiederherstellungsaktion mit Bestätigung anbieten. Die Wiederherstellung entfernt auch erst durch den Import entstandene Schlüssel.

Nachweise: Testfälle in `browser-smoke.mjs` für erfolgreichen Import, ungültige Schlüssel, Speichermangel nach erstem Schreibvorgang, fehlgeschlagene Sicherung, Alt-Export, Wiederherstellung mit zusätzlichem Schlüssel. Vor GitHub-Übertragung zusätzlich Laufzeitlogik mit isoliertem Browser-Speicher simuliert (PASS). **GitHub-CI:** https://github.com/provoware/MMT2026/actions/runs/40042415022 – Node 20 und Node 22 erfolgreich für den zuvor genannten Head. Dies ersetzt keine Browser- und Gesamtprüfung.

Grenze: Browser-Speicher ist nicht transaktional. Bei Stromausfall mitten im Schreiben oder wenn selbst die Rücksetzung am Speichermangel scheitert, ist keine vollständige Wiederherstellung garantiert. In diesem Fall bleibt die zuletzt gespeicherte Sicherung nach Möglichkeit erhalten; zusätzlich ist ein externer JSON-Export erforderlich.

## Nächste unabhängige Pflichtarbeit

1. Echte Browser- und Tastaturtests statt Platzhalter ergänzen; 800 × 600 und hohe Skalierung automatisiert prüfen.
2. Fehlgeschlagene normale Speicheraktionen (`Data.add`/`Data.save`) sichtbar melden und Formularinhalt erhalten.
3. V2.x-Migration mit belegten Testdaten, Wiederherstellung nach Unterbrechung und große Datensätze prüfen.

Persönliche Kubuntu-/Sicht-Endabnahme erst nach vollständigem technischen Release-Kandidaten. Kein Merge ohne alle vorgeschriebenen grünen Prüfungen; keine Veröffentlichung ohne Freigabe.
