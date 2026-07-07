# Importprotokoll — Provoware Modul Suite

Dieses Protokoll wird ausgefuellt, sobald der echte aktuelle Projektstand der
Provoware Modul Suite in dieses Repository uebernommen wird. Es soll verhindern,
dass Herkunft, fehlende Dateien oder Risiken beim Import verloren gehen.

## 1. Importquelle

- Quelle / Archivname:
- Erhalten von:
- Importiert am:
- Importiert durch:
- Bemerkungen zur Quelle:

## 2. Vor dem Import geprueft

- [ ] Aktueller Git-Status wurde gesichert oder notiert.
- [ ] Es wurden keine vorhandenen Nutzer- oder Beispieldaten umbenannt.
- [ ] Es wurden keine vorhandenen Nutzer- oder Beispieldaten bereinigt.
- [ ] Falls bereits App-Dateien vorhanden waren: Backup-Ordner wurde angelegt.

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

## 4. Abweichungen oder fehlende Dateien

| Pfad | Befund | Entscheidung |
| --- | --- | --- |
|  |  |  |

## 5. Erste Pruefungen nach dem Import

Nur vorhandene Dateien pruefen. Fehlende Dateien nicht durch Platzhalter ersetzen.

```bash
git status --short
find . -maxdepth 3 -type f -not -path './.git/*' | sort
bash -n start_linux.sh
node --check assets/provoware-core.js
node --check modules/_registry.js
```

## 6. Offene Risiken nach dem Import

- [ ] localStorage-Keys muessen noch erfasst werden.
- [ ] V2.x-Datenmodelle muessen noch dokumentiert werden.
- [ ] Import-/Export-Verhalten muss noch getestet werden.
- [ ] Standarddaten duerfen vorhandene Nutzerdaten nicht ueberschreiben.
- [ ] Registry und Manifest muessen noch verglichen werden.

## 7. Naechste geplante Klein-Iteration

- Ziel:
- Betroffene Dateien:
- Patchgrund:
- Risiken:
- Bewusste Nicht-Aenderungen:
