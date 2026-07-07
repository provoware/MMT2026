# Importprotokoll — Provoware Modul Suite

Dieses Protokoll wird ausgefuellt, sobald der echte aktuelle Projektstand der
Provoware Modul Suite in dieses Repository uebernommen wird. Es soll verhindern,
dass Herkunft, fehlende Dateien oder Risiken beim Import verloren gehen.

## 1. Importquelle

- Quelle / Archivname: keine Importquelle im Arbeitsbaum gefunden
- Erhalten von: offen
- Importiert am: noch nicht importiert; Pruefversuch am 2026-07-07 02:13 UTC
- Importiert durch: Codex
- Bemerkungen zur Quelle: Im Repository liegt kein Archiv und kein entpackter Projektstand vor. Deshalb wurde nichts in die App-Struktur kopiert und keine Platzhalter-App erzeugt.

## 2. Vor dem Import geprueft

- [ ] Aktueller Git-Status wurde gesichert oder notiert.
- [ ] Es wurden keine vorhandenen Nutzer- oder Beispieldaten umbenannt.
- [ ] Es wurden keine vorhandenen Nutzer- oder Beispieldaten bereinigt.
- [ ] Falls bereits App-Dateien vorhanden waren: Backup-Ordner wurde angelegt.
- [ ] Import wurde zuerst in einem separaten Ordner entpackt und grob geprueft.
- [ ] Es wurden keine versteckten Cloud-, CDN- oder Tracking-Abhaengigkeiten uebernommen.

## 3. Erwartete Basisdateien nach dem Import

- [ ] `index.html`
- [ ] `assets/provoware-core.css`
- [ ] `assets/provoware-core.js`
- [ ] `modules/_registry.js`
- [ ] `modules/modules.manifest.json`
- [ ] `modules/module.songwriter.html`
- [ ] `modules/module.genre-generator.html`
- [ ] `modules/module.textblocks.html`
- [ ] `modules/module.notes.html`
- [ ] `modules/module.todo-calendar.html`
- [ ] `daten/`
- [ ] `sicherungen/`
- [ ] `start_linux.sh`
- [ ] `README_START_HIER.txt`

## 4. Minimaler Importablauf

1. Archiv oder Quellordner ausserhalb des Repositories entpacken.
2. Enthaltene Dateien grob mit der erwarteten Basisstruktur vergleichen.
3. Dateien erst danach in dieses Repository kopieren.
4. `IMPORTPROTOKOLL.md` sofort mit Quelle, Datum und Abweichungen ausfuellen.
5. Keine Daten bereinigen, umbenennen oder verschieben, bevor die App einmal geprueft wurde.
6. Nach dem Kopieren `git status --short` ausfuehren und unerwartete Pfade hier notieren.

## 5. Abweichungen oder fehlende Dateien

| Pfad | Befund | Entscheidung |
| --- | --- | --- |
| Importarchiv | kein `.zip`, `.tar`, `.tar.gz`, `.tgz`, `.7z` oder `.rar` bis Tiefe 3 gefunden | Echten Projektstand separat bereitstellen, dann ausserhalb des Zielbaums entpacken |
| `index.html` | fehlt | nicht raten; echten Projektstand importieren |
| `assets/provoware-core.css` | fehlt | nicht raten; echten Projektstand importieren |
| `assets/provoware-core.js` | fehlt | nicht raten; echten Projektstand importieren |
| `modules/_registry.js` | fehlt | nicht raten; echten Projektstand importieren |
| `modules/modules.manifest.json` | fehlt | nicht raten; echten Projektstand importieren |
| `modules/module.songwriter.html` | fehlt | nicht raten; echten Projektstand importieren |
| `modules/module.genre-generator.html` | fehlt | nicht raten; echten Projektstand importieren |
| `modules/module.textblocks.html` | fehlt | nicht raten; echten Projektstand importieren |
| `modules/module.notes.html` | fehlt | nicht raten; echten Projektstand importieren |
| `modules/module.todo-calendar.html` | fehlt | nicht raten; echten Projektstand importieren |
| `daten/` | fehlt | nicht raten; echten Projektstand importieren |
| `sicherungen/` | fehlt | nicht raten; echten Projektstand importieren |
| `start_linux.sh` | fehlt | nicht raten; echten Projektstand importieren |
| `README_START_HIER.txt` | fehlt | nicht raten; echten Projektstand importieren |

## 6. Erste Pruefungen nach dem Import

Nur vorhandene Dateien pruefen. Fehlende Dateien nicht durch Platzhalter ersetzen.

```bash
git status --short
find . -maxdepth 3 -type f -not -path './.git/*' | sort
bash -n start_linux.sh
node --check assets/provoware-core.js
node --check modules/_registry.js
```

## 7. Offene Risiken nach dem Import

- [ ] localStorage-Keys muessen noch erfasst werden.
- [ ] V2.x-Datenmodelle muessen noch dokumentiert werden.
- [ ] Import-/Export-Verhalten muss noch getestet werden.
- [ ] Standarddaten duerfen vorhandene Nutzerdaten nicht ueberschreiben.
- [ ] Registry und Manifest muessen noch verglichen werden.

## 8. Naechste geplante Klein-Iteration

- Ziel: Echten Projektstand oder Archiv bereitstellen und zuerst separat entpacken.
- Betroffene Dateien: zunaechst nur Importquelle ausserhalb des Repositories, danach echte App-Dateien.
- Patchgrund: Ohne Basisdateien kann keine stabile Websuite-Analyse oder Umsetzung erfolgen.
- Risiken: Falsche oder unvollstaendige Quelle koennte Nutzerdaten verdecken; deshalb zuerst separat pruefen.
- Bewusste Nicht-Aenderungen: Keine Platzhalter-App, keine geratenen Module, keine Testframework-Installation.
