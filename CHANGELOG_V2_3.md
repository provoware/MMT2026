# CHANGELOG V2.3

- Dummy-/Planungsstand durch startbare Offline-Suite ersetzt.
- Workspace-System mit Auto/1/2/3/4/6/9/Fokus ergänzt.
- Panels intern scrollbar, einklappbar und maximierbar.
- Module für Schreiben, Generator, Bausteine, Notizen, Kalender, Prompts, Hashtags, Planung, Projekte, Export, Einstellungen und Hilfe ergänzt.
- Standarddaten, Startskript, README, Testprotokoll und Entwicklerübergabe ergänzt.
- localStorage-Fallback gegen blockierte Browser-Speicher eingebaut.
- Tests: bash -n, node --check, statischer Smoke-Test, Browser-Runtime-Smoke-Test.
- Panel-Reihenfolge kann jetzt je Modul mit ↑/↓ angepasst und lokal gespeichert werden; das hilft, wichtige Arbeitsbereiche ohne langes Scrollen nach vorne zu holen.
- Standardpakete können auf der Startseite erneut ergänzt werden; dabei werden nur fehlende Vorlagen hinzugefügt und eigene Daten nicht überschrieben.
- README für den Laienstart erweitert: Startwege, Datenort, Sicherung, Fehlerhilfe und Entwicklerprüfungen sind jetzt klarer getrennt.
- Startskript meldet Browseradresse, Fallback und Datensicherungs-Hinweis verständlicher.
- Layout-Auswahl laienfreundlicher beschriftet und mit kurzem Sicherheitshinweis ergänzt: Der Reset betrifft nur die Ansicht, nicht die gespeicherten Inhalte.
- Layoutspeicherung robuster gemacht: ungültige gespeicherte Grid-Werte fallen auf `auto` zurück.

## 2026-10-24 – Vorrelease-Importabsicherung
- Import prüft verfügbaren Browser-Speicher und legt vor Änderungen eine Sicherung an; bei Fehlern wird zurückgesetzt.
- Export schließt die interne Import-Sicherung aus, damit Sicherungen nicht immer größer werden.
- Import-Sicherung lässt sich im Export-Center mit Bestätigung wiederherstellen, einschließlich Entfernung erst durch den Import entstandener Schlüssel.
- Alte Exporte mit interner Sicherung bleiben importierbar; Regressionstests für Speicherfehler und Wiederherstellung ergänzt.
- Grenzen und offene Release-Pflichten in docs/RELEASE_PFLICHTMATRIX.md dokumentiert.
