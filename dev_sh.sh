#!/usr/bin/env bash
#
# dev.sh — Lance le backend Django et le frontend Vite en parallèle.
#
# Usage : ./dev.sh
# Arrêt : Ctrl+C (arrête les deux serveurs proprement)
#
# Prérequis : avoir exécuté ./setup.sh au préalable.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

if [ ! -d "$BACKEND_DIR/venv" ]; then
    echo "Erreur : l'environnement virtuel backend est introuvable." >&2
    echo "Lancez d'abord ./setup.sh" >&2
    exit 1
fi

if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo "Erreur : les dépendances frontend sont introuvables." >&2
    echo "Lancez d'abord ./setup.sh" >&2
    exit 1
fi

PIDS=()

cleanup() {
    echo ""
    echo "Arrêt des serveurs..."
    for pid in "${PIDS[@]}"; do
        kill "$pid" 2>/dev/null || true
    done
    wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "==> Démarrage du backend Django (http://localhost:8000)"
(
    cd "$BACKEND_DIR"
    # shellcheck disable=SC1091
    source venv/bin/activate
    python manage.py runserver 8000
) &
PIDS+=($!)

sleep 2

echo "==> Démarrage du frontend Vite (http://localhost:5173)"
(
    cd "$FRONTEND_DIR"
    npm run dev -- --port 5173
) &
PIDS+=($!)

echo ""
echo "Backend  : http://localhost:8000/api/hello/"
echo "Frontend : http://localhost:5173"
echo "Ctrl+C pour arrêter les deux serveurs."
echo ""

wait
