# Déploiement en production — guide méthodique

Ce guide décrit, étape par étape, comment déployer INTERFORMCI sur un VPS. Il complète le
`README.md` (qui couvre le développement local) et ne doit être suivi que pour une mise en
production réelle.

> Ne jamais utiliser `docker-compose.yml` (racine) en production — il est fait pour le
> développement local (hot-reload, code monté en volume). La production utilise
> `docker-compose.prod.yml`.

---

## 0. Vue d'ensemble

```
Internet ──▶ Caddy (80/443, HTTPS auto) ──▶ frontend (Next.js, port interne 3000)
                                        └──▶ backend  (Strapi,  port interne 1337)
```

- Caddy est le seul service exposé publiquement. Il obtient et renouvelle automatiquement les
  certificats TLS (Let's Encrypt) pour les deux domaines.
- `frontend` et `backend` tournent dans des images de production immuables (pas de code source
  monté, pas de dépendances de dev) — voir `frontend/Dockerfile.prod` et `backend/Dockerfile.prod`.
- Les données qui doivent survivre aux redéploiements (base SQLite, fichiers uploadés, état TLS de
  Caddy) sont dans des volumes Docker nommés.

---

## 1. Prérequis

- Un VPS Linux avec [Docker](https://docs.docker.com/engine/install/) et le plugin Docker Compose
  installés (`docker compose version` doit fonctionner).
- Deux noms de domaine (ou sous-domaines), ex. `www.interformci.com` et `api.interformci.com`.
- Deux enregistrements DNS de type A (ou AAAA en IPv6) pointant **chacun** vers l'IP publique du
  VPS. Vérifie leur propagation avant de démarrer la stack :

  ```bash
  dig +short www.interformci.com
  dig +short api.interformci.com
  ```

  Les deux doivent renvoyer l'IP du VPS. Si ce n'est pas le cas, Caddy ne pourra pas obtenir de
  certificat HTTPS et le déploiement échouera silencieusement sur ce point.

- Ports 80 et 443 libres et ouverts dans le pare-feu du VPS (`ufw allow 80,443/tcp` ou équivalent).

---

## 2. Récupérer le code sur le VPS

```bash
git clone https://github.com/abdoul-sakhur/projet-informeci.git
cd projet-informeci
```

(Ou `git pull` si le dépôt est déjà cloné et qu'il s'agit d'une mise à jour — voir section 6.)

---

## 3. Configurer les variables d'environnement

Deux fichiers d'exemple existent et **ne doivent jamais être commités une fois remplis** (déjà
exclus dans `.gitignore`).

### 3.1 Domaines (`.env.prod`)

```bash
cp .env.prod.example .env.prod
```

Éditer `.env.prod` :

```
DOMAIN=www.interformci.com
API_DOMAIN=api.interformci.com
```

### 3.2 Secrets Strapi (`backend/.env.production`)

```bash
cp backend/.env.production.example backend/.env.production
```

Générer des secrets uniques (**ne pas réutiliser ceux du dev local**) :

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Exécuter cette commande **4 fois** pour `APP_KEYS` (les 4 valeurs séparées par des virgules) et
**une fois** pour chacun de : `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`,
`JWT_SECRET`, `ENCRYPTION_KEY`.

Éditer `backend/.env.production` et remplacer chaque `changeme` par une valeur générée, puis
mettre à jour `URL` avec le vrai domaine API :

```
URL=https://api.interformci.com
```

Pour un trafic important, remplacer les lignes `DATABASE_CLIENT=sqlite` /
`DATABASE_FILENAME=.tmp/data.db` par une config Postgres (`DATABASE_CLIENT=postgres` +
`DATABASE_HOST/PORT/NAME/USERNAME/PASSWORD`). Non nécessaire pour un lancement initial.

---

## 4. Construire et démarrer la stack

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

Cette commande :
1. Construit l'image backend (`backend/Dockerfile.prod`) et l'image frontend
   (`frontend/Dockerfile.prod`, avec `NEXT_PUBLIC_STRAPI_URL` injecté au build à partir de
   `API_DOMAIN`).
2. Démarre `backend`, `frontend` et `caddy` en arrière-plan (`-d`).
3. Caddy demande automatiquement les certificats Let's Encrypt pour `DOMAIN` et `API_DOMAIN` au
   premier démarrage (peut prendre 30–60 secondes).

Le premier build peut prendre plusieurs minutes (installation des dépendances Strapi/Next.js dans
des conteneurs neufs).

---

## 5. Vérifier le déploiement

```bash
docker compose -f docker-compose.prod.yml ps
```

Les trois services doivent être `Up` (et `healthy` dès que les healthchecks passent, après ~30s).

```bash
docker compose -f docker-compose.prod.yml logs -f caddy
```

Vérifier l'absence d'erreur de certificat TLS dans les logs de Caddy.

Puis, depuis un navigateur :
- `https://www.interformci.com` → le site doit s'afficher, avec un cadenas HTTPS valide.
- `https://api.interformci.com/admin` → l'écran de création du premier compte administrateur
  Strapi doit s'afficher (**à faire immédiatement**, avant qu'un tiers ne le fasse à ta place —
  Strapi n'a pas d'admin tant que ce compte n'existe pas).

### 5.1 Créer le compte administrateur Strapi

Ouvrir `https://api.interformci.com/admin` et suivre le formulaire de création de compte
(email + mot de passe forts). C'est ce compte qui sert ensuite à gérer tout le contenu du site
(textes, photos, partenaires, messages de contact, etc.) depuis l'admin.

---

## 6. Mettre à jour après un changement de code

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

Docker ne reconstruit que ce qui a changé. Les volumes (`backend_data`, `backend_uploads`,
`caddy_data`, `caddy_config`) ne sont jamais touchés par cette commande — le contenu Strapi et les
certificats TLS sont conservés.

---

## 7. Sauvegardes

Les données qui comptent sont dans deux volumes Docker :
- `backend_data` — base SQLite (`backend/.tmp/data.db`), tout le contenu géré depuis l'admin.
- `backend_uploads` — tous les fichiers uploadés (photos, logos, attestations, etc.).

Sauvegarde manuelle (à adapter/planifier via un cron) :

```bash
docker run --rm \
  -v projet-informeci_backend_data:/data \
  -v $(pwd):/backup \
  debian tar czf /backup/backend-data-$(date +%F).tar.gz /data

docker run --rm \
  -v projet-informeci_backend_uploads:/data \
  -v $(pwd):/backup \
  debian tar czf /backup/backend-uploads-$(date +%F).tar.gz /data
```

> Le préfixe des noms de volumes (`projet-informeci_`) correspond au nom du dossier du dépôt sur
> le VPS. Vérifier avec `docker volume ls` si les noms diffèrent.

Restauration : recréer le volume vide puis extraire l'archive dedans avant de relancer
`docker compose up -d`.

---

## 8. Commandes utiles

| Action | Commande |
|---|---|
| Voir les logs en direct | `docker compose -f docker-compose.prod.yml logs -f [service]` |
| Redémarrer un service | `docker compose -f docker-compose.prod.yml restart backend` |
| Arrêter toute la stack | `docker compose -f docker-compose.prod.yml down` (les volumes sont conservés) |
| État des services | `docker compose -f docker-compose.prod.yml ps` |

---

## 9. Dépannage rapide

- **Caddy n'obtient pas de certificat HTTPS** → vérifier que les DNS pointent bien vers le VPS
  (`dig +short <domaine>`) et que les ports 80/443 sont ouverts et libres.
- **Le frontend affiche des erreurs de connexion à l'API** → vérifier que `API_DOMAIN` dans
  `.env.prod` correspond bien au domaine réellement utilisé par le backend, et que le build du
  frontend a bien été refait après tout changement de `.env.prod` (l'URL de l'API est injectée
  **au build**, pas au runtime, côté navigateur).
- **`docker compose ... up` échoue sur `npm install` (ECONNRESET / timeout réseau)** → problème
  réseau transitoire côté VPS ou registre npm ; relancer simplement la même commande.
