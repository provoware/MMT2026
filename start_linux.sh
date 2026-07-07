#!/usr/bin/env bash
set -u
cd "$(dirname "$0")"
mkdir -p daten sicherungen logs
LOG="logs/start.log"
echo "---- $(date '+%F %T') Start: $(pwd) ----" >> "$LOG"
if ! command -v python3 >/dev/null 2>&1; then
  echo "FEHLER: python3 fehlt. Öffne index.html direkt." | tee -a "$LOG"
  xdg-open "index.html" >/dev/null 2>&1 || true
  exit 1
fi
PORT=""
for p in 8787 8788 8789 8790 8791; do
  python3 -c "import socket;s=socket.socket();s.bind(('127.0.0.1',$p));s.close()" >/dev/null 2>&1 || continue
  PORT="$p"; break
done
if [ -z "$PORT" ]; then
  echo "Kein freier Port gefunden. Öffne index.html direkt." | tee -a "$LOG"
  xdg-open index.html >/dev/null 2>&1 || true
  exit 1
fi
URL="http://127.0.0.1:$PORT/index.html"
echo "Starte Provoware Modul Suite: $URL" | tee -a "$LOG"
(xdg-open "$URL" >/dev/null 2>&1 || echo "Browser manuell öffnen: $URL") &
echo "Server läuft. Beenden mit Strg+C. Daten bleiben lokal." | tee -a "$LOG"
python3 -m http.server "$PORT" --bind 127.0.0.1
