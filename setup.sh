#!/usr/bin/env bash
#
# setup.sh — Installation reproductible du squelette Speak Up (Linux)
#
# Ce script :
#   1. crée un environnement virtuel Python pour le backend
#   2. installe les dépendances backend (Django, DRF, django-cors-headers)
#   3. installe les dépendances frontend (npm)
#   4. vérifie que le backend démarre (Django check)
#   5. vérifie que le frontend se build correctement (tsc + vite build)
#
# Usage : ./setup.sh
# Prérequis : Python 3.10+, python3-venv, Node.js 18+, npm

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

log() {
    echo ""
    echo "==> $1"
}

# --------------------------------------------------------------------------
# 0. Vérification des prérequis
# --------------------------------------------------------------------------
log "Vérification des prérequis (python3, npm)"

if ! command -v python3 >/dev/null 2>&1; then
    echo "Erreur : python3 n'est pas installé." >&2
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "Erreur : npm n'est pas installé (Node.js requis)." >&2
    exit 1
fi

echo "python3 : $(python3 --version)"
echo "npm     : $(npm --version)"

# --------------------------------------------------------------------------
# 1 & 2. Backend : environnement virtuel + dépendances
# --------------------------------------------------------------------------
log "Backend : création de l'environnement virtuel Python"
cd "$BACKEND_DIR"

if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Environnement virtuel créé dans backend/venv"
else
    echo "Environnement virtuel déjà présent, réutilisation."
fi

# shellcheck disable=SC1091
source venv/bin/activate

log "Backend : installation des dépendances (requirements.txt)"
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet
echo "Dépendances backend installées."

# --------------------------------------------------------------------------
# 3. Frontend : dépendances npm
# --------------------------------------------------------------------------
log "Frontend : installation des dépendances npm"
cd "$FRONTEND_DIR"
npm install --silent
echo "Dépendances frontend installées."

# --------------------------------------------------------------------------
# 4. Vérification backend (Django check)
# --------------------------------------------------------------------------
log "Vérification backend (python manage.py check)"
cd "$BACKEND_DIR"
source venv/bin/activate
python manage.py check

# --------------------------------------------------------------------------
# 5. Vérification frontend (build)
# --------------------------------------------------------------------------
log "Vérification frontend (npm run build)"
cd "$FRONTEND_DIR"
npm run build

log "Setup terminé avec succès."
echo ""
echo "Pour lancer le projet : ./dev.sh"
echo "(ou consultez le README.md pour lancer backend/frontend séparément)"
