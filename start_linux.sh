#!/usr/bin/env bash
set -u
cd "$(dirname "$0")"
mkdir -p daten sicherungen logs
LOG="logs/start.log"
APP_DIR="$(pwd)"
INDEX_FILE="$APP_DIR/index.html"
open_index_fallback() {
  echo "Ersatzstart: versuche index.html direkt zu öffnen: $INDEX_FILE" | tee -a "$LOG"
  xdg-open "$INDEX_FILE" >/dev/null 2>&1 || echo "Bitte index.html per Doppelklick öffnen: $INDEX_FILE" | tee -a "$LOG"
}
echo "---- $(date '+%F %T') Start: $(pwd) ----" >> "$LOG"
if ! command -v python3 >/dev/null 2>&1; then
  echo "FEHLER: Python 3 fehlt. Bitte Python 3 installieren oder index.html direkt öffnen." | tee -a "$LOG"
  open_index_fallback
  exit 1
fi
PORT=""
for p in 8787 8788 8789 8790 8791; do
  python3 -c "import socket;s=socket.socket();s.bind(('127.0.0.1',$p));s.close()" >/dev/null 2>&1 || continue
  PORT="$p"; break
done
if [ -z "$PORT" ]; then
  echo "Kein freier lokaler Port zwischen 8787 und 8791 gefunden." | tee -a "$LOG"
  open_index_fallback
  exit 1
fi
URL="http://127.0.0.1:$PORT/index.html"
echo "Starte Provoware Modul Suite lokal: $URL" | tee -a "$LOG"
echo "Falls der Browser nicht automatisch startet, diese Adresse kopieren: $URL" | tee -a "$LOG"
(xdg-open "$URL" >/dev/null 2>&1 || echo "Browser manuell öffnen: $URL" | tee -a "$LOG") &
echo "Server läuft. Dieses Fenster offen lassen. Beenden mit Strg+C." | tee -a "$LOG"
echo "Daten bleiben lokal im Browser. Für Sicherungen bitte Export-Center nutzen." | tee -a "$LOG"
python3 -m http.server "$PORT" --bind 127.0.0.1
