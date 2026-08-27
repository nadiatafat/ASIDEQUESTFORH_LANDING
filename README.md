# Squelette 

Squelette minimal validant la communication entre un frontend React/TypeScript
et un backend Django/DRF via une API REST.

À ce stade : une seule page affichant une phrase récupérée depuis le backend.
Aucune base de données métier, aucune authentification, aucun state manager,
aucune bibliothèque UI.

## Structure

```text
project/
├── frontend/   React + TypeScript + Vite
├── backend/    Django + Django REST Framework
└── README.md
```

## Parcours actuel

1. **`/`** — Le "Side Quest" : un petit parcours ludique obligatoire (texte
   libre, couleur préférée, mot à compléter, nombre préféré via un clavier,
   deux choix de consentement). Il envoie les réponses au backend puis
   affiche un écran "Welcome".
2. **`/home`** — La page actuelle (message "Hello, Speak Up 👋" récupéré
   depuis l'API), accessible uniquement après avoir complété le Side Quest.
   Le passage est mémorisé en `localStorage` : il n'est demandé qu'une fois
   par navigateur.

Endpoint backend dédié : `POST /api/quest-responses/`. Si la personne répond
NON à "Can we keep the data for you?", ses réponses personnelles (texte,
couleur, mot, nombre) sont vidées avant sauvegarde ; seuls les deux choix de
consentement et l'horodatage sont conservés.

## Prérequis

- Python 3.10+ (avec `python3-venv`)
- Node.js 18+ et npm

## Installation et lancement rapides (recommandé)

Deux scripts sont fournis à la racine du projet pour Linux/macOS :

```bash
# 1. Installation complète (backend + frontend) et vérifications
./setup.sh

# 2. Lancement du backend et du frontend en parallèle
./dev.sh
```

`setup.sh` crée l'environnement virtuel Python, installe les dépendances
backend et frontend, puis vérifie que Django démarre (`manage.py check`) et
que le frontend se build (`npm run build`).

`dev.sh` lance `python manage.py runserver` (port 8000) et `npm run dev`
(port 5173) en parallèle. Ctrl+C arrête les deux serveurs proprement.

Une fois `dev.sh` lancé, ouvrez http://localhost:5173.

Les sections suivantes détaillent les commandes manuelles équivalentes, si
vous préférez lancer le backend et le frontend séparément.

## Lancer le backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows : venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

Le backend est disponible sur **http://localhost:8000**.
Endpoint exposé : `GET http://localhost:8000/api/hello/`

Réponse attendue :

```json
{
  "message": "Hello, Speak Up 👋"
}
```

## Lancer le frontend (React)

Dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend est disponible sur **http://localhost:5173**.
Il appelle automatiquement `GET /api/hello/` sur le backend et affiche la
phrase reçue, centrée sur une page blanche.

## Configuration

- Le frontend lit l'URL du backend via la variable d'environnement
  `VITE_API_BASE_URL` (voir `frontend/.env.example`). Par défaut :
  `http://localhost:8000`.
- Le backend autorise les requêtes CORS depuis `http://localhost:5173`
  (voir `backend/config/settings.py`, section `CORS_ALLOWED_ORIGINS`).

## Vérifier que tout fonctionne

1. Lancer le backend (`python manage.py runserver`).
2. Lancer le frontend (`npm run dev`).
3. Ouvrir http://localhost:5173 dans un navigateur.
4. La phrase « Hello, Speak Up 👋 » doit s'afficher au centre de la page.

## Prochaines étapes possibles

Ce squelette est volontairement minimal. Il pourra être enrichi
progressivement : nouvelles pages/features côté frontend, nouveaux endpoints
côté backend, base de données, authentification, etc.
