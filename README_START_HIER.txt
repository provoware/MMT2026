PROVOWARE MODUL SUITE V2.3 — START HIER

KURZSTART FÜR ALLE

1. Datei start_linux.sh doppelt anklicken.
2. Wenn nichts passiert: Rechtsklick auf start_linux.sh → Als Programm ausführen.
3. Alternativ im Terminal im Projektordner starten:
   ./start_linux.sh
4. Der Browser öffnet sich automatisch.
5. Wenn der Browser nicht aufgeht: Adresse aus dem Terminal kopieren, z. B.
   http://127.0.0.1:8787/index.html

WAS DU DANACH TUN KANNST

- Links ein Modul wählen: Schreiben, Generator, Bausteine, Kalender, Projekte oder Export.
- Oben das Layout wählen: Auto, 1, 2, 3, 4, 6, 9 oder Fokus.
- Panels einklappen oder maximieren, wenn der Bildschirm zu voll ist.
- Standardpakete auf der Startseite erneut ergänzen, falls Vorlagen fehlen.
- Regelmäßig im Export-Center eine JSON-Sicherung speichern.

WO BLEIBEN MEINE DATEN?

- Die Suite arbeitet lokal im Browser.
- Es gibt keine Cloudpflicht, kein Tracking und keine versteckten Uploads.
- Deine Arbeitsdaten liegen im lokalen Browserspeicher.
- Wichtig: Wenn Browserdaten gelöscht werden, können lokale App-Daten verloren gehen.
- Sichere deshalb regelmäßig über das Export-Center als JSON-Datei.

WENN ETWAS NICHT STARTET

1. Prüfe, ob Python 3 installiert ist:
   python3 --version
2. Starte im Terminal:
   ./start_linux.sh
3. Lies die Meldung im Terminal. Dort steht auch die Adresse für den Browser.
4. Prüfe das Startlog:
   logs/start.log
5. Wenn kein lokaler Server startet, öffnet das Skript ersatzweise index.html direkt.

HÄUFIGE FRAGEN

- Muss ich etwas installieren?
  Normalerweise nur Python 3, das auf vielen Linux-Systemen bereits vorhanden ist.

- Funktioniert die Suite offline?
  Ja. Die App nutzt lokale Dateien und keine externen CDN-Skripte.

- Überschreiben Standardpakete meine eigenen Inhalte?
  Nein. Standardpakete ergänzen nur fehlende Einträge.

- Was ist eine JSON-Sicherung?
  Eine Textdatei mit deinen App-Daten. Sie kann später wieder importiert werden.

AUTOMATISCHE PRÜFUNG FÜR ENTWICKLER

- Sicher prüfen und einfache Strukturprobleme selbst beheben:
  npm run check:selfheal
- Danach alle lokalen Prüfungen ausführen:
  npm run check:autonomous

Diese Prüfung arbeitet offline. Sie legt nur fehlende Arbeitsordner an, normalisiert JSON-Dateien und stoppt bei riskanten Fehlern mit klarer Meldung.
