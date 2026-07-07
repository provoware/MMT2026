# AGENTS.md — Provoware Modul Suite: CODEX-Auftrag für nächste Entwicklungsstufe

## 0. Rolle und Arbeitsmodus für CODEX

Du arbeitest als vorsichtiger, systematischer Entwickler an der **Provoware Modul Suite**.

Das Projekt ist eine lokale, offline nutzbare Creator-Websuite aus **HTML, CSS und Vanilla JavaScript**. Ziel ist nicht, das Projekt unnötig in ein schweres Framework umzubauen, sondern die vorhandene modulare Struktur professionell zu verbessern.

Arbeite immer nach diesem Grundsatz:

> Erst Stabilität sichern, dann Bedienung verbessern, dann Funktionen erweitern.

Keine Cloudpflicht. Keine Tracking-Funktionen. Keine externen CDN-Abhängigkeiten. Keine versteckten Online-Aufrufe. Alles muss lokal, transparent und für Laien bedienbar bleiben.

### 0.1 Planungs-, Patch- und Sparsamkeitsmodus

Arbeite strikt planungsbasiert, patchbasiert, codesparsam und traffic-sparsam. Vor jeder Änderung müssen kurz feststehen:

- Ziel der Iteration.
- Betroffene Dateien.
- Betroffene Zeilen, Abschnitte oder Blöcke, soweit ohne Zusatzaufwand ermittelbar.
- Patchgrund.
- Risiken.
- Bewusste Nicht-Änderungen.
- Konkrete Schrittliste.

Danach gilt:

- Nur begründet betroffene Dateien ändern.
- Nur exakt betroffene Stellen patchen.
- Keine globalen Umformatierungen.
- Keine kosmetischen Nebenanpassungen an stabilen Bereichen.
- Keine unnötigen Dateioperationen, Suchläufe, Downloads oder Netzwerkzugriffe.
- Keine Wiederholungsprüfungen ohne neue Änderung.
- Validierung erst am Ende einer kleinen Patch-Iteration ausführen.
- Nur relevante Prüfungen ausführen: Syntax, direkt betroffene Logik, direkt betroffene Ausgabe und vorhandene direkt betroffene Tests.
- Folgeprobleme, die nicht zum geplanten Patch gehören, in `todo.txt` notieren statt ungeplant mitzubearbeiten.

Alle Ausgaben sollen einfach verständlich sein. Fachbegriffe kurz erklären, wenn sie nötig sind.

---

## 1. Projektziel der nächsten Stufe

Baue die Suite zu einer deutlich besseren **offline Creator-Zentrale** aus:

1. Weniger Scrollen.
2. Bessere Modul-Anordnung.
3. Dynamisches 3x3-Grid / Workspace-System.
4. Ein-Klick-Start für Laien.
5. Mitgelieferte Standardinhalte.
6. Bessere Hilfen, Tooltips, Startführung und Fehlerhinweise.
7. Robustere Datenhaltung, Import/Export und Migrationen.
8. Saubere Tests und nachvollziehbare Übergabe.

---

## 1.1 Pflicht pro Entwicklungsrunde

Jede Entwicklungsrunde muss mindestens eine kleine, nachvollziehbare Verbesserung in einem dieser Bereiche liefern:

- [ ] Nutzerfreundlichkeit: einfachere Bedienung, klarere Hilfe, weniger Scrollen, verständlichere Fehler oder bessere Startführung.
- [ ] Robustheit: sichereres Speichern, defensivere Imports, bessere Fehlerisolierung, Migrationen, Backups oder Validierung.
- [ ] Vorlagen und Standardinhalte: mehr oder bessere Genres, Stimmungen, Stile, Songstrukturen, Promptvorlagen, Textbausteine, Hashtags oder Hilfetipps.

Wenn eine Runde nur Technik oder interne Struktur ändert, muss trotzdem mindestens ein kleiner sichtbarer Nutzen für Laien, Datensicherheit oder Vorlagenqualität enthalten sein. Diese Verbesserung wird im Änderungsprotokoll ausdrücklich genannt.

### 1.2 Iterationsgröße und Wartbarkeit

Jede Iteration soll klein genug bleiben, dass Ursache, Wirkung und Risiko nachvollziehbar sind. Empfohlene Grenzen:

- Hilfsdateien möglichst bis 150 Zeilen.
- Normale Module möglichst bis 300 Zeilen.
- Kernmodule möglichst bis 500 Zeilen.
- Funktionen möglichst unter 40 Zeilen halten; ab 60 Zeilen Teilbarkeit prüfen.

Bei Überschreitung nicht automatisch umbauen. Erst Nutzen, Risiko und passenden Schnitt planen. Logik, Konfiguration, Daten, Tests und Dokumentation getrennt halten.

---

## 2. Bestand schützen

Vor jeder Änderung:

- [ ] Prüfen, ob die erwarteten Projektdateien überhaupt vorhanden sind.
- [ ] Wenn die Websuite vorhanden ist: Projekt einmal vollständig öffnen.
- [ ] Wenn vorhanden und betroffen: `start_linux.sh` testen.
- [ ] Wenn vorhanden und betroffen: `index.html` öffnen.
- [ ] Wenn vorhanden und betroffen: alle betroffenen Module öffnen.
- [ ] Vorhandene Dateien nicht löschen, sondern versioniert verbessern.
- [ ] vor größeren Umbauten Backup-Ordner anlegen, z. B. `backup_before_v2_3/`.
- [ ] vorhandene `localStorage`-Keys nicht ohne Migration ändern.
- [ ] bestehende V2.x-Daten weiterhin lesbar halten.
- [ ] keine Nutzerdaten durch neue Standarddaten überschreiben.

---

## 3. Architektur nicht unnötig zerstören

Aktuelle Zielarchitektur beibehalten:

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

Verbesserung ist erlaubt, aber nur mit klarer Begründung.

### Regeln

- [ ] Vanilla JS bevorzugen.
- [ ] Keine externen Skripte.
- [ ] Keine CDN-Abhängigkeit.
- [ ] Gemeinsame Funktionen in `assets/provoware-core.js`.
- [ ] Gemeinsame Gestaltung in `assets/provoware-core.css`.
- [ ] Modul-spezifische Logik im jeweiligen Modul belassen.
- [ ] Modul-Metadaten pflegen.
- [ ] Registry und Manifest konsistent halten.
- [ ] Später prüfen: `_registry.js` automatisch aus `modules.manifest.json` generieren.

---

## 4. Hauptproblem: Zu viel Scrollen

Das größte UX-Problem ist die vertikale Länge. Die Lösung darf nicht einfach „alles kleiner machen“ sein. Es braucht ein echtes Workspace-System.

### Ziel

Der Nutzer soll auf einem normalen Desktop-Bildschirm die wichtigsten Arbeitsbereiche gleichzeitig sehen können, ohne endlos zu scrollen.

### Aufgaben

- [ ] Topbar kompakter machen.
- [ ] Navigation einklappbar machen.
- [ ] Seitenleisten als Drawer / einklappbare Panels anbieten.
- [ ] Panels intern scrollbar machen, nicht die ganze Seite.
- [ ] `height: calc(100vh - topbar)` für Arbeitsbereiche verwenden.
- [ ] Sticky Mini-Toolbar je Modul einbauen.
- [ ] Lange Listen in eigene scrollbare Boxen verschieben.
- [ ] Editorbereiche flexibel höhenverstellbar machen.
- [ ] Schnellaktionen sichtbar halten.
- [ ] unwichtige Bereiche in einklappbare `details`-Panels verschieben.

---

## 5. Neues dynamisches 3x3-Grid / Workspace-System

Implementiere einen neuen Layout-Modus:

```text
Workspace: Auto / 1 / 2 / 3 / 4 / 6 / 9 / Fokus
```

### Grundidee

Jedes Modul besteht künftig aus Panels. Diese Panels werden nicht starr untereinander angezeigt, sondern in einem dynamischen Grid.

Beispiel:

```text
┌─────────────┬─────────────┬─────────────┐
│ Panel 1     │ Panel 2     │ Panel 3     │
├─────────────┼─────────────┼─────────────┤
│ Panel 4     │ Panel 5     │ Panel 6     │
├─────────────┼─────────────┼─────────────┤
│ Panel 7     │ Panel 8     │ Panel 9     │
└─────────────┴─────────────┴─────────────┘
```

### Verhalten nach Panel-Anzahl

- [ ] 1 Panel: Vollbreite.
- [ ] 2 Panels: 50/50 oder Hauptbereich + Seitenbereich.
- [ ] 3 Panels: klassische Drei-Spalten-Ansicht.
- [ ] 4 Panels: 2x2.
- [ ] 5–6 Panels: 3 Spalten, 2 Reihen.
- [ ] 7–9 Panels: echtes 3x3-Grid.
- [ ] mehr als 9 Panels: unwichtige Panels in Tabs, Drawer oder „Mehr“-Bereich verschieben.

### Nutzerwille

Der Nutzer muss selbst entscheiden können:

- [ ] Panel anpinnen.
- [ ] Panel einklappen.
- [ ] Panel maximieren.
- [ ] Panel minimieren.
- [ ] Panel-Reihenfolge ändern.
- [ ] Layout speichern.
- [ ] Layout zurücksetzen.
- [ ] Layout pro Modul speichern.
- [ ] Layout global speichern.
- [ ] Layout-Presets anbieten:
  - `Ein Bildschirm`
  - `Kompakt`
  - `Studio`
  - `Schreiben`
  - `Generator`
  - `Kalender`
  - `Laienmodus`
  - `Profi-Modus`

### Technische Umsetzung

In `provoware-core.css`:

```css
.pv-workspace {
  display: grid;
  gap: var(--gap);
  height: calc(100vh - var(--topbar-h) - 24px);
  min-height: 0;
}

.pv-workspace[data-grid="auto"] {
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
}

.pv-workspace[data-grid="3x3"] {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
}

.pv-panel {
  min-height: 0;
  overflow: hidden;
}

.pv-panel-body {
  height: 100%;
  min-height: 0;
  overflow: auto;
}
```

In `provoware-core.js`:

- [ ] `PV.Layout.get(moduleId)`
- [ ] `PV.Layout.set(moduleId, layout)`
- [ ] `PV.Layout.reset(moduleId)`
- [ ] `PV.Layout.togglePanel(moduleId, panelId)`
- [ ] `PV.Layout.maximizePanel(moduleId, panelId)`
- [ ] `PV.Layout.registerPanels(moduleId, panelList)`
- [ ] `PV.Layout.applyWorkspace(root, moduleId)`

Speicherung:

```js
PV.Store.set('layoutSettings', {
  globalMode: 'auto',
  modules: {
    songwriter: {
      grid: '3x3',
      collapsed: [],
      maximized: null,
      order: ['meta', 'editor', 'preview', 'archive', 'snippets']
    }
  }
});
```

---

## 6. Konkrete Panel-Aufteilung pro Modul

### 6.1 Dashboard

Panels:

- [ ] Modulübersicht
- [ ] globale Suche
- [ ] Mini-Kalender
- [ ] Schnellstart
- [ ] Statistik
- [ ] letzte Änderungen
- [ ] Import/Export
- [ ] Hilfe / Erste Schritte
- [ ] Systemstatus

Empfohlenes Layout:

- Laienmodus: Schnellstart, Module, Hilfe.
- Profi-Modus: 3x3 mit Suche, Kalender, Statistik, Export, Logs.

---

### 6.2 Songwriter

Panels:

- [ ] Metadaten: Titel, Autor, Projekt, BPM.
- [ ] Genre/Stimmung/Stil.
- [ ] Songtext-Editor.
- [ ] Live-Vorschau.
- [ ] Songstruktur-Vorlagen.
- [ ] Textbausteine.
- [ ] gespeicherte Songs.
- [ ] Export / Kopieren.
- [ ] Snapshots / Versionen.

Empfohlen:

- Haupteditor größer als Nebenpanels.
- Vorschau und Bausteine rechts.
- Metadaten oben oder links einklappbar.
- Archiv intern scrollbar.

---

### 6.3 Genre-Generator

Panels:

- [ ] Schnelltaster 3/6/9/12.
- [ ] Kategorien / Buckets.
- [ ] Ausgabe.
- [ ] Favoriten.
- [ ] Verlauf.
- [ ] eigene Begriffe.
- [ ] Standardbibliothek.
- [ ] Import/Export.
- [ ] Statistik / Wiederholungsschutz.

Wichtig:

- Ausgabe immer sichtbar halten.
- „In Song übernehmen“ immer sichtbar halten.
- Favoriten und Verlauf intern scrollbar machen.

---

### 6.4 Textbausteine / Promptvorlagen

Panels:

- [ ] Baustein anlegen.
- [ ] Suchfeld.
- [ ] Kategorie-Leiste.
- [ ] Button-Raster.
- [ ] Vorschau.
- [ ] Bearbeiten.
- [ ] Import/Export.
- [ ] Standardpakete.
- [ ] Nutzungsstatistik.

Wichtig:

- Button-Raster muss groß, klar und direkt kopierbar sein.
- Kategorien als Chips.
- Jeder Baustein: Titel, Kategorie, Text, Farbe, Tags, Nutzung, erstellt, geändert.

---

### 6.5 Notizen

Panels:

- [ ] neue Notiz.
- [ ] Notizliste.
- [ ] Suche.
- [ ] Tags.
- [ ] Projektfilter.
- [ ] Export TXT.
- [ ] Schnellspeichern.
- [ ] Vorschau.
- [ ] Archiv.

---

### 6.6 ToDo / Kalender

Panels:

- [ ] Aufgabe anlegen.
- [ ] Tagesliste.
- [ ] Monatskalender.
- [ ] Farblegende.
- [ ] Filter.
- [ ] offene Aufgaben.
- [ ] erledigte Aufgaben.
- [ ] Archiv.
- [ ] Export CSV/JSON.

Wichtig:

- Klick auf Tag muss sofort vier Farboptionen zeigen.
- Farbnamen editierbar.
- Tagesaufgaben bei Klick auf Kalenderdatum anzeigen.
- Dashboard-Mini-Kalender muss synchron bleiben.

---

## 7. Neue Module, die gleich mitgedacht werden sollen

### Priorität hoch

- [ ] `module.prompt-library.html` — Promptvorlagen, Megaprompts, Satzbausteine.
- [ ] `module.hashtags.html` — Hashtags, Suchtags, SEO-Taggruppen.
- [ ] `module.media-planner.html` — Veröffentlichungsplanung für YouTube/TikTok/Instagram.
- [ ] `module.project-center.html` — Projekte, Status, nächste Schritte, Dateien.
- [ ] `module.export-center.html` — zentraler Export aller Inhalte.

### Priorität mittel

- [ ] `module.rhyme-lab.html` — Reimwörter, Hook-Varianten, Endwortprüfung.
- [ ] `module.song-structure.html` — Intro/Hook/Verse/Bridge/Outro-Vorlagen.
- [ ] `module.batch-notes.html` — schnelle Notizen mit Zeitstempel.
- [ ] `module.style-mixer.html` — Genre/Stimmung/Stil-Matrix.
- [ ] `module.release-checklist.html` — Checkliste vor Veröffentlichung.

### Priorität später

- [ ] `module.ffmpeg-helper.html` — Video-/Audio-Helfer.
- [ ] `module.local-file-index.html` — lokale Dateiübersicht nach Projektordner-Freigabe.
- [ ] `module.backup-manager.html` — Sicherungen, Wiederherstellung, Exportrotation.

---

## 8. Standardinhalte mitliefern

Ja: Genres, Stimmungen, Stile, Promptvorlagen, Textbausteine und Beispielstrukturen sollen als Standardpakete mitgeliefert werden.

Aber: Standarddaten dürfen vorhandene Nutzerdaten niemals überschreiben.

### Lösung

Lege Standardpakete in `daten/defaults/` ab:

```text
daten/defaults/
  genres.default.json
  moods.default.json
  styles.default.json
  prompt_templates.default.json
  textblocks.default.json
  song_structures.default.json
  hashtags.default.json
  calendar_colors.default.json
  todo_categories.default.json
  help_tips.default.json
```

### Optimale Speicherstruktur für wachsende Vorlagen

Standardinhalte müssen separat, versionierbar und ohne Überschreiben von Nutzerdaten wachsen können. Dafür wird die Vorlagenbasis in kleine Dateien aufgeteilt:

```text
daten/defaults/
  manifest.default.json                 # Übersicht, Versionen, Reihenfolge, Kategorien
  genres/
    base.default.json                    # stabile Grundliste
    extensions.default.json              # neue Ergänzungen je Version
  moods/
    base.default.json
    extensions.default.json
  styles/
    base.default.json
    extensions.default.json
  prompts/
    songwriting.default.json
    seo.default.json
    image.default.json
    developer.default.json
  textblocks/
    hooks.default.json
    bridges.default.json
    outros.default.json
  song_structures/
    suno.default.json
    experimental.default.json
  hashtags/
    music.default.json
    platform.default.json
  help/
    tips.default.json
    onboarding.default.json
```

Regeln für diese Struktur:

- [ ] Große Sammeldateien vermeiden; lieber kleine, fachlich getrennte Dateien.
- [ ] Jede Vorlagendatei enthält `schemaVersion`, `packId`, `title`, `updatedAt`, `items`.
- [ ] Jeder Eintrag enthält mindestens `id`, `name`, `category`, `tags`, `source`, `version`.
- [ ] IDs stabil halten, damit spätere Updates nur fehlende oder neuere Standard-Einträge ergänzen.
- [ ] Neue Vorlagen zuerst als `extensions.default.json` oder eigenes Themenpaket ergänzen, nicht ungeprüft in Basislisten mischen.
- [ ] Nutzerdefinierte Inhalte bleiben getrennt in den bestehenden App-Speichern und werden nie durch Defaults ersetzt.
- [ ] Import/Seed-Logik arbeitet paketweise und protokolliert, welche Packs ergänzt wurden.

### Seed-Regel

- [ ] Beim ersten Start Standards importieren.
- [ ] Danach Flag setzen: `defaultsSeededVersion`.
- [ ] Wenn neue Standards kommen, nur fehlende Einträge ergänzen.
- [ ] Keine Dopplungen.
- [ ] Nutzereinträge nie löschen.
- [ ] Standardpakete manuell erneut importierbar machen.
- [ ] Nutzer kann Standardpakete deaktivieren.

Beispiel:

```js
PV.Defaults.seedOnce({
  version: '2026-07-v2.3',
  target: 'genreGenerator',
  items: defaults,
  mergeBy: ['type', 'name']
});
```

---

## 9. Inhaltliche Standardpakete

### 9.1 Genre-Basis

Mitliefern:

- Hard Techno
- Acid Techno
- Schranz
- Peak Time Techno
- Industrial Techno
- Dark Rave
- Rave Punk
- Doom Pop
- Gothic Industrial
- Boom Bap
- Punk Rap
- Trap Metal
- Electro Punk
- EBM
- Noise Techno
- Glitch
- Breakbeat
- Drum and Bass
- Gabber
- Hardcore
- Experimental
- Spoken Word
- Satire Rap
- Minimal Lyrics
- Black Humor Delivery

### 9.2 Stimmungen

Mitliefern:

- roh
- dunkel
- treibend
- bissig
- zynisch
- kalt
- verschwitzt
- mechanisch
- provokant
- systemkritisch
- schwarz
- hektisch
- hypnotisch
- aggressiv
- absurd
- trashig
- ironisch
- dystopisch
- aufbauend
- eskalierend
- trocken
- direkt
- tiefgründig
- unterirdisch
- clubtauglich

### 9.3 Produktionsstile

Mitliefern:

- vocalloops
- underground
- distorted vocals
- chopped vocals
- spoken distorted intro
- short punch lines
- hard kick
- sub bass pressure
- glitch cuts
- black humor delivery
- call and response
- industrial percussion
- rave siren
- broken machine rhythm
- cold synth stab
- dirty low-end
- warehouse reverb
- stutter hook
- minimal lyrics
- escalating drop
- whispered bridge
- shouted hook

### 9.4 Songstruktur-Vorlagen

Mitliefern:

- Suno Hardtechno Standard
- Suno Kurzform
- Hook zuerst
- Drop am Ende
- 3 Verse / 1 Hook
- Spoken Intro / Distorted Hook
- Minimal Lyrics / Punchline
- Satire-Rant
- Philosophischer Aufbau
- Call-and-Response

Beispielstruktur:

```text
[INTRO:]
[BUILD-UP:]
[VERSE 1:]
[PRE-HOOK:]
[HOOK:]
[DROP 1:]
[VERSE 2:]
[BRIDGE:]
[FINAL HOOK:]
[OUTRO:]
```

### 9.5 Promptvorlagen / Textbausteine

Mitliefern:

- Songtext verbessern
- 5-fach Verbesserungsschleife
- Suno-kompatibel machen
- Reimform prüfen
- Hook verdichten
- Doppeldeutigkeit verstärken
- Metaphern ergänzen
- SEO-Beschreibung erstellen
- YouTube-Titelvarianten
- YouTube-Tags
- Bildprompt Hardtechno
- Bildprompt trashig
- Bildprompt provokant
- Projektübergabe für Entwickler
- UI/UX-Audit
- Testprotokoll
- Changelog
- README für Laien
- Bugreport-Vorlage
- Feature-Auftrag für Codex

### 9.6 Kalenderfarben

Mitliefern:

```json
[
  {"name": "Content YouTube fertig", "value": "#58f5d5"},
  {"name": "Songidee offen", "value": "#ff8a3d"},
  {"name": "Aufnahme / Produktion", "value": "#b27cff"},
  {"name": "Blockiert / Warten", "value": "#ff6576"}
]
```

---

## 10. Ein-Klick-Start für Laien

Ziel: Nutzer soll nicht wissen müssen, was ein Terminal, Server oder Pfad ist.

### Linux

Verbessere `start_linux.sh`:

- [ ] prüft, ob Python vorhanden ist.
- [ ] nutzt `python3 -m http.server`.
- [ ] sucht freien Port, z. B. 8787, 8788, 8789.
- [ ] öffnet Browser automatisch mit `xdg-open`.
- [ ] legt fehlende Ordner an.
- [ ] zeigt klare Fehlermeldungen.
- [ ] schreibt Startlog in `logs/start.log`.
- [ ] beendet nicht sofort, damit der Server aktiv bleibt.
- [ ] bietet fallback: direkte `index.html` öffnen.

Beispielanforderung:

```bash
./start_linux.sh
```

Muss genügen.

### Desktop-Starter

Optional erstellen:

```text
Provoware Modul Suite.desktop
```

Aufgaben:

- [ ] Starter erzeugen.
- [ ] ausführbar machen.
- [ ] Icon optional lokal hinterlegen.
- [ ] Anleitung in README ergänzen.

### README

`README_START_HIER.txt` laiengerecht schreiben:

1. Doppelklick auf `start_linux.sh`.
2. Wenn nichts passiert: Rechtsklick → Als Programm ausführen.
3. Browser öffnet sich automatisch.
4. Wenn Browser nicht öffnet: Adresse aus dem Terminal kopieren.
5. Daten bleiben lokal.
6. Regelmäßig JSON sichern.

---

## 11. Hilfe-System perfektionieren

Aktuelle Hilfe ist gut, aber noch nicht perfekt.

### Ziel

Der Nutzer muss ohne Vorwissen verstehen:

- Was ist dieses Modul?
- Was muss ich zuerst tun?
- Was ist optional?
- Wo wird gespeichert?
- Wie bekomme ich mein Ergebnis heraus?
- Was mache ich bei Fehlern?

### Aufgaben

- [ ] Erster-Start-Assistent.
- [ ] Modul-Startkarten.
- [ ] Tooltips an allen wichtigen Buttons.
- [ ] Mini-Erklärungen unter Eingabefeldern.
- [ ] Beispielinhalt einfügbar.
- [ ] „Demo laden“-Button.
- [ ] „Alles zurücksetzen“-Button deutlich warnen.
- [ ] „Was passiert mit meinen Daten?“-Infobox.
- [ ] Fehler verständlich übersetzen.
- [ ] Hilfe-Overlay mit Fokusfalle.
- [ ] Tastaturbedienung dokumentieren.
- [ ] „Laienmodus“ mit reduzierten Optionen.
- [ ] „Profi-Modus“ mit allen Optionen.

### Hilfe-Texte müssen kurz sein

Nicht:

> Mit diesem Modul kann man potenziell verschiedene Operationen...

Sondern:

> Schreibe hier deinen Songtext. Rechts siehst du Vorschau, Bausteine und Export.

---

## 12. Bessere Aufteilung / Informationsarchitektur

### Neue Hauptnavigation

Empfohlen:

```text
Start
Schreiben
Generator
Bausteine
Kalender
Projekte
Export
Einstellungen
Hilfe
```

### Dashboard nicht überladen

Dashboard soll keine zweite komplette App sein. Es soll sein:

- Einstieg
- Status
- Suche
- Schnellzugriff
- heutige Aufgaben
- zuletzt bearbeitet
- globale Sicherung

### Module müssen stärker fokussieren

Jedes Modul bekommt:

- oben: Name, Zweck, wichtigste Aktion.
- Mitte: Hauptarbeit.
- rechts/seitlich: Hilfe, Verlauf, Export.
- unten oder Drawer: seltene Einstellungen.

---

## 13. Datenmodell verbessern

### Kurzfristig

- [ ] bestehendes localStorage-System beibehalten.
- [ ] Schemas pro Modul dokumentieren.
- [ ] Migrationen ergänzen.
- [ ] Importdaten defensiv prüfen.
- [ ] fehlerhafte Daten isolieren, nicht komplette App crashen.
- [ ] Export mit Versionsnummer.
- [ ] Import-Vorschau anzeigen.
- [ ] Backup vor Import automatisch anbieten.

### Mittelfristig

- [ ] IndexedDB als optionales Speicherbackend prüfen.
- [ ] lokale Projektdatei mit File System Access API prüfen.
- [ ] Backup-Rotation:
  - letzte 5 manuelle Exporte
  - letzte 10 Snapshots
  - Import-Sicherung

### Migrationsschema

```js
PV.Migrations.register('2.3.0', function(store) {
  // alte Daten lesen
  // neue Defaults ergänzen
  // Layoutdaten initialisieren
  // nichts überschreiben
});
```

---

## 14. Sicherheit und Robustheit

Pflicht:

- [ ] Nutzereingaben beim Rendern escapen.
- [ ] keine HTML-Injection durch gespeicherte Texte.
- [ ] Importdaten validieren.
- [ ] Drag&Drop-Dateien prüfen.
- [ ] postMessage-Origin härten, falls nicht nur lokal.
- [ ] Clipboard-Fehler sauber melden.
- [ ] Browser ohne File System Access API unterstützen.
- [ ] `file://` und `localhost` testen.
- [ ] Speichern darf bei einzelnen defekten Einträgen nicht komplett ausfallen.
- [ ] Fehlerlog sichtbar machen.

---

## 15. Barrierearmut / Bedienbarkeit

Pflicht:

- [ ] echte Labels für alle Formularfelder.
- [ ] ARIA für Tabs, dynamische Listen, Modale.
- [ ] Fokusfalle in Modalen.
- [ ] Escape schließt Dialoge.
- [ ] sichtbarer Fokusrahmen.
- [ ] Buttons groß genug.
- [ ] Kontrastmodus erhalten.
- [ ] Schriftgrößen getrennt einstellbar:
  - UI
  - Überschriften
  - Normaltext
  - Editor
- [ ] Tastaturbedienung:
  - Speichern
  - Export
  - Suche
  - Hilfe
  - Panel maximieren
- [ ] Screenreader-Basistest durchführen.

---

## 16. Visuelle Verbesserung

Ziel: Klarer, ruhiger, weniger überladen, trotzdem Provoware-Charakter.

### Aufgaben

- [ ] Design-Tokens dokumentieren.
- [ ] Farbsystem vereinheitlichen.
- [ ] Eingabefelder deutlicher abheben.
- [ ] Hover/Fokus/Active-Zustände angleichen.
- [ ] kompaktere Cards.
- [ ] bessere Abstände.
- [ ] klare Überschriftenhierarchie.
- [ ] Panels nicht optisch gleich wichtig machen.
- [ ] Warnungen, Erfolg, Fehler farblich eindeutig.
- [ ] Dark/Light/High Contrast testen.

---

## 17. Profi-Funktionen für höhere Stufe

### Command Palette

Einbauen:

```text
Strg+K
```

Funktionen:

- Modul öffnen
- Song suchen
- Baustein suchen
- Vorlage einfügen
- Export starten
- Layout wechseln
- Hilfe öffnen
- neue Notiz
- neue Aufgabe

### Globale Suche

Verbessern:

- [ ] Suche über Songs, Notizen, Textbausteine, Aufgaben, Favoriten.
- [ ] Filter nach Typ.
- [ ] Treffer anklickbar.
- [ ] Treffer öffnet Modul und Eintrag.
- [ ] Suchindex lokal generieren.

### Schnelle Vorlagen

- [ ] Button „Neuer Suno-Song“.
- [ ] Button „Hook verbessern“.
- [ ] Button „Hardtechno-Bildprompt“.
- [ ] Button „YouTube SEO“.
- [ ] Button „Tagesaufgabe Content“.

### Projektmodus

- [ ] Projekt anlegen.
- [ ] Projekt wählen.
- [ ] Inhalte Projekt zuweisen.
- [ ] Export pro Projekt.
- [ ] Dashboard nach Projekt filtern.

---

## 18. Tests

### Statische Tests

- [ ] `node --check assets/provoware-core.js`
- [ ] `node --check modules/_registry.js`
- [ ] Inline-Skripte aus HTML extrahieren und prüfen.
- [ ] doppelte IDs prüfen.
- [ ] fehlende Labels prüfen.
- [ ] lokale Asset-Links prüfen.
- [ ] Manifest/Registry vergleichen.

### Playwright-Smoke-Tests

Einbauen:

```bash
npm init -y
npm i -D @playwright/test
npx playwright install chromium
```

Testfälle:

- [ ] App startet.
- [ ] alle Module sichtbar.
- [ ] jedes Modul öffnet.
- [ ] Themewechsel funktioniert.
- [ ] Layoutwechsel funktioniert.
- [ ] 3x3-Grid funktioniert.
- [ ] Panel maximieren funktioniert.
- [ ] Song speichern.
- [ ] Genre generieren.
- [ ] Textbaustein speichern/kopieren.
- [ ] Notiz speichern/exportieren.
- [ ] ToDo speichern.
- [ ] Kalenderfarbe setzen.
- [ ] globaler Export.
- [ ] globaler Import.
- [ ] Browserdaten löschen → Import wiederherstellen.

### Manuelle Laienprüfung

Eine nicht-technische Person soll testen:

- [ ] Findet sie den Start?
- [ ] Versteht sie den ersten Schritt?
- [ ] Kann sie einen Song anlegen?
- [ ] Kann sie Genres erzeugen?
- [ ] Kann sie einen Baustein kopieren?
- [ ] Kann sie eine Aufgabe anlegen?
- [ ] Kann sie Daten exportieren?
- [ ] Weiß sie, wo die Daten bleiben?
- [ ] Versteht sie Fehlermeldungen?

---

## 19. Akzeptanzkriterien

Die nächste Version ist erst fertig, wenn:

- [ ] Start per `./start_linux.sh` funktioniert.
- [ ] Browser automatisch öffnet.
- [ ] `index.html` direkt zumindest grundlegend nutzbar bleibt.
- [ ] Dashboard sichtbar und verständlich ist.
- [ ] alle Module ohne Fehler öffnen.
- [ ] dynamisches Workspace-Layout funktioniert.
- [ ] 3x3-Grid funktioniert.
- [ ] Panels einklappbar sind.
- [ ] Panel-Maximierung funktioniert.
- [ ] Layout pro Modul gespeichert wird.
- [ ] Standarddaten beim ersten Start verfügbar sind.
- [ ] Standarddaten keine Nutzerdaten überschreiben.
- [ ] Genres, Stimmungen, Stile, Promptvorlagen und Textbausteine mitgeliefert werden.
- [ ] Hilfen deutlich besser sind.
- [ ] Laienmodus vorhanden ist.
- [ ] Profi-Modus vorhanden ist.
- [ ] Import/Export weiterhin funktioniert.
- [ ] Kalenderfarben weiterhin funktionieren.
- [ ] globale Suche weiterhin funktioniert.
- [ ] alte V2.x-Daten lesbar bleiben.
- [ ] Tests dokumentiert sind.
- [ ] Changelog erstellt ist.
- [ ] README aktualisiert ist.

---

## 20. Dateien, die CODEX am Ende liefern soll

Pflicht:

```text
index.html
assets/provoware-core.css
assets/provoware-core.js
modules/_registry.js
modules/modules.manifest.json
modules/*.html
daten/defaults/*.json
start_linux.sh
README_START_HIER.txt
CHANGELOG_V2_3.md
TESTPROTOKOLL_V2_3.md
ENTWICKLER_UEBERGABE_V2_3.md
```

Optional:

```text
package.json
playwright.config.js
tests/*.spec.js
Provoware Modul Suite.desktop
```

---

## 21. Arbeitsreihenfolge für CODEX

### Phase 1 — Analyse

- [ ] Projektstruktur mit kleinstem sinnvollem Suchumfang prüfen.
- [ ] Wenn Basisdateien fehlen: keine App-Dateien raten, sondern Befund in `todo.txt` und `IMPORTPROTOKOLL.md` festhalten.
- [ ] Module erfassen.
- [ ] CSS-Layout analysieren.
- [ ] Scroll-Probleme markieren.
- [ ] Datenmodelle erfassen.
- [ ] bestehende Tests prüfen.

### Phase 2 — Layoutsystem

- [ ] Workspace-CSS einbauen.
- [ ] Panel-Komponenten definieren.
- [ ] Layoutspeicherung im Core einbauen.
- [ ] 3x3-Modus einbauen.
- [ ] Fokusmodus einbauen.
- [ ] Panels intern scrollbar machen.

### Phase 3 — Module umbauen

- [ ] Dashboard umbauen.
- [ ] Songwriter umbauen.
- [ ] Generator umbauen.
- [ ] Textbausteine umbauen.
- [ ] Notizen umbauen.
- [ ] ToDo/Kalender umbauen.

### Phase 4 — Standarddaten

- [ ] Defaults-Ordner anlegen.
- [ ] JSON-Dateien erstellen.
- [ ] Seed-Logik einbauen.
- [ ] Duplikatschutz einbauen.
- [ ] Reimport-Button einbauen.

### Phase 5 — Laienstart

- [ ] `start_linux.sh` verbessern.
- [ ] README neu schreiben.
- [ ] Erster-Start-Assistent.
- [ ] Demo-Daten optional.
- [ ] Hilfe-Overlay verbessern.

### Phase 6 — Tests

- [ ] Nur vorhandene und direkt betroffene Dateien prüfen.
- [ ] statische Checks.
- [ ] Playwright-Smoke-Test erst nach vorhandener startbarer App.
- [ ] manueller Laientest.
- [ ] Import/Export-Test.
- [ ] alte Datenmigration testen.

### Phase 7 — Übergabe

- [ ] Kompaktes Änderungsprotokoll pro Iteration.
- [ ] Zwei konstruktive Empfehlungen für die nächste sinnvolle Arbeit.
- [ ] Changelog.
- [ ] Testprotokoll.
- [ ] Entwicklerübergabe.
- [ ] bekannte Grenzen.
- [ ] nächste Empfehlungen.

---

## 22. Nicht tun

- [ ] Kein Framework-Wechsel ohne zwingenden Grund.
- [ ] Kein React/Vue/Svelte nur aus Bequemlichkeit.
- [ ] Keine Cloud.
- [ ] Kein Tracking.
- [ ] Keine externen Fonts von Google/CDN.
- [ ] Keine Nutzerdaten überschreiben.
- [ ] Keine Features ohne sichtbare Bedienlogik.
- [ ] Keine versteckten automatischen Uploads.
- [ ] Keine komplizierte Installation als Pflicht.
- [ ] Keine Terminalpflicht für normale Nutzung, wenn vermeidbar.
- [ ] Keine Platzhalter-App erzeugen, solange der echte Projektstand fehlt.
- [ ] Keine Tests installieren, solange keine testbare App vorhanden ist.

---

## 23. Abschlussmeldung von CODEX

Am Ende soll CODEX kurz berichten:

```text
Erledigt:
- ...

Geändert:
- ...

Getestet:
- ...

Nicht erledigt / offen:
- ...

Start:
- ./start_linux.sh

Wichtig:
- Daten bleiben lokal.
- Alte V2.x-Daten wurden nicht überschrieben.

Empfehlungen:
- ...
- ...
```
