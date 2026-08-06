# INTERFORMCI — Site vitrine

Site vitrine du cabinet **INTERFORMCI** (International Formation Côte d'Ivoire), construit avec
**Next.js 16 (App Router, TypeScript, Tailwind CSS v4, Framer Motion)** pour le frontend et
**Strapi v5 (TypeScript, SQLite)** pour le backend/CMS.

## Structure du projet

```
interformci/
├── docker-compose.yml
├── backend/     # API Strapi v5 (content types, permissions, seed)
└── frontend/    # Application Next.js (App Router)
```

## Option A — Avec Docker (recommandé sur Windows)

Sur Windows, `better-sqlite3` (utilisé par Strapi) doit être compilé nativement si aucun binaire
précompilé n'existe pour ta version de Node — ce qui nécessite Visual Studio Build Tools. Docker
évite complètement ce problème en installant les dépendances dans un conteneur Linux.

Prérequis : [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
cp backend/.env.example backend/.env   # puis complète APP_KEYS, JWT_SECRET, etc.
docker compose up --build
```

- Backend : [http://localhost:1337/admin](http://localhost:1337/admin)
- Frontend : [http://localhost:3000](http://localhost:3000) (remappé sur `3002` dans
  `docker-compose.yml` si le port 3000 est déjà utilisé sur ta machine)

Le code source est monté en volume (`./backend` et `./frontend`), donc le hot-reload fonctionne
normalement. `node_modules` reste dans des volumes Docker nommés (`backend_node_modules`,
`frontend_node_modules`) pour ne pas mélanger les binaires natifs Linux du conteneur avec ceux de
Windows.

Pour arrêter : `docker compose down`. Pour reconstruire après un changement de dépendances :
`docker compose up --build`.

> Sur Windows, la détection de changements de fichiers à travers un volume Docker n'est pas
> toujours fiable (limite de Docker Desktop, pas du projet). Si une modification de code ne
> semble pas prise en compte, force un redémarrage du conteneur concerné :
> `docker compose restart frontend` (ou `backend`).

## Option B — En local (sans Docker)

Nécessite Node.js 20+ et, sur Windows, Visual Studio Build Tools (workload "Desktop development
with C++") si `better-sqlite3` n'a pas de binaire précompilé pour ta version de Node.

### 1. Backend (Strapi)

```bash
cd backend
npm install
cp .env.example .env   # puis complète APP_KEYS, JWT_SECRET, etc. avec des valeurs uniques
npm run develop
```

Au premier démarrage, Strapi va automatiquement :

- Créer la base SQLite dans `backend/.tmp/data.db`
- Configurer les permissions publiques (lecture sur les collections de contenu, création sur
  `contact-message`)
- Insérer le contenu réel d'INTERFORMCI (pôles de service, domaines, catégories de formation,
  partenaires, témoignages, références, page d'accueil, infos du cabinet) — voir
  `backend/src/seed.ts`

Ouvre ensuite [http://localhost:1337/admin](http://localhost:1337/admin) pour créer ton compte
administrateur.

> Le seed ne s'exécute qu'une seule fois (il vérifie si des pôles de service existent déjà). Pour
> reseeder, arrête le serveur, supprime `backend/.tmp/data.db`, puis relance `npm run develop`.

> Les paquets `@strapi/*` doivent tous rester sur la même version (voir `overrides` dans
> `backend/package.json`). Un décalage de version (ex. `@strapi/admin` en 5.51.2 pendant que
> `@strapi/content-manager` reste en 5.51.1) casse le panneau d'administration avec une erreur
> `useRBAC must be used within Auth` et un spinner infini. En cas de doute, supprime
> `node_modules` et `package-lock.json`, puis relance `npm install`.

### 2. Frontend (Next.js)

Dans un second terminal :

```bash
cd frontend
npm install
cp .env.example .env.local   # NEXT_PUBLIC_STRAPI_URL=http://localhost:1337 par défaut
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000) (ou le premier port
disponible si 3000 est occupé).

## Logo

Le logo officiel INTERFORMCI se trouve à `frontend/public/logo.png` (header et footer le
référencent directement). L'icône seule (favicon, `frontend/app/icon.png` et
`frontend/app/apple-icon.png`) a été recadrée à partir de ce même logo.

## Contenu géré depuis Strapi

Les pages du site consomment l'API publique de Strapi (`/api/...`) avec revalidation ISR (60s).
Pour modifier le contenu (textes, domaines de formation, partenaires, témoignages, coordonnées...),
utilise l'admin Strapi plutôt que d'éditer le code.

| Content type | Utilisation |
|---|---|
| `service-pole` | Les 3 pôles d'activité (accueil, /services) |
| `domaine` | Domaines d'intervention du pôle Études & projets |
| `formation-categorie` | Catégories et formations du pôle Formation continue |
| `temoignage` | Témoignages affichés sur l'accueil |
| `reference-projet` | Projets/références affichés sur /references |
| `partenaire` | Agréments et partenariats |
| `contact-message` | Messages soumis via le formulaire /contact |
| `page-accueil` (single type) | Titre du hero, **image de fond du hero** (`hero_background`, upload optionnel dans l'admin) et chiffres clés animés |
| `infos-cabinet` (single type) | Coordonnées du cabinet (adresse, téléphones, email, horaires) |

### Logos des partenaires/agréments

Les logos affichés pour les partenaires (bandeau accueil + page /references) sont mappés par
acronyme dans `frontend/lib/partenaireLogos.ts`, à partir des fichiers dans
`frontend/public/partenaires/`. Actuellement disponibles : FDFP, FIRCA, ANADER (logos officiels
récupérés depuis leurs sites respectifs). APEX-CI, FDPCC et Réseau GERME n'ont pas de logo propre
identifié (site indisponible ou absence d'identité visuelle distincte) — un placeholder générique
s'affiche à la place. Pour ajouter un logo, dépose le fichier dans `frontend/public/partenaires/`
et ajoute l'entrée correspondante dans `partenaireLogos.ts`.

## Notes techniques

- Les permissions publiques et le seed sont configurés dans `backend/src/index.ts` (bootstrap) et
  `backend/src/seed.ts`.
- Le frontend désactive les animations si `prefers-reduced-motion` est activé côté utilisateur.
- Toutes les images sont des placeholders (`ImagePlaceholder`) en attendant les vraies photos.
- En mode Docker, le frontend utilise deux URLs différentes vers Strapi : `STRAPI_INTERNAL_URL`
  (`http://backend:1337`, via le réseau interne Docker) pour les appels serveur (Server Components,
  SSR/ISR), et `NEXT_PUBLIC_STRAPI_URL` (`http://localhost:1337`) pour les appels navigateur (le
  formulaire de contact). Voir `frontend/lib/strapi.ts`.
