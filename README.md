# interformci

## Prérequis

- Node.js 20+ et npm
- Docker + Docker Compose

## Installation

1. Copier les fichiers d'environnement

   - backend : `backend/.env.example` → `backend/.env`
   - frontend : `frontend/.env.example` → `frontend/.env.local`

2. Installer les dépendances

   Ouvrir deux terminaux séparés :

   - Backend :
     ```bash
     cd backend
     npm install
     ```

   - Frontend :
     ```bash
     cd frontend
     npm install
     ```

## Lancer le projet

### Option 1 : Exécution locale

- Dans `backend` :
  ```bash
  npm run develop
  ```

- Dans `frontend` :
  ```bash
  npm run dev
  ```

### Option 2 : Avec Docker Compose

À la racine du projet :

```bash
docker compose up --build
```

## Adresses

- Frontend : http://localhost:3000 (exécution locale) ou http://localhost:3002 (Docker)
- Backend Strapi : http://localhost:1337

## Remarques

- Le frontend attend le backend Strapi sur `http://localhost:1337`.
- Si vous utilisez Docker, vérifiez que `backend/.env` existe avant de lancer `docker compose up`.
- Pour déployer en production sur un VPS, voir [DEPLOIEMENT.md](./DEPLOIEMENT.md).
