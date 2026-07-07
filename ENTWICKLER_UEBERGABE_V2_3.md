# ENTWICKLERÜBERGABE V2.3

## Architektur

- `index.html`: Shell-Einstieg
- `assets/provoware-core.css`: Design, Workspace, Panels, responsive Verhalten
- `assets/provoware-core.js`: PV-Namespace, Store, Data, Layout, UI, Export, Suche, App
- `modules/_registry.js`: Moduldefinitionen und Renderlogik
- `daten/defaults/`: versionierte Standarddaten

## Daten

Prefix: `pv.mmt2026.*`. Export-Center sichert alle App-Daten als JSON. Import erstellt vorher `backup.beforeImport`.

## Nächste sinnvolle Arbeiten

1. echte V2.x-Alt-Daten importieren und Migrationsmatrix ergänzen
2. Panel-Reihenfolge per Drag&Drop speichern
3. Registry aus Manifest generieren
4. echte Screenreader- und Laientests durchführen
