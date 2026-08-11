# Déploiement en production — guide méthodique

Ce guide décrit, étape par étape, comment déployer INTERFORMCI sur un VPS. Il complète le
`README.md` (qui couvre le développement local) et ne doit être suivi que pour une mise en
production réelle.

> Ne jamais utiliser `docker-compose.yml` (racine) en production — il est fait pour le
> développement local (hot-reload, code monté en volume). La production utilise
> `docker-compose.prod.yml`.

Les pièges décrits en section 11 ont déjà été corrigés dans le code (`backend/Dockerfile.prod`
notamment) — ce guide inclut ces corrections. Ils sont documentés pour qu'on comprenne *pourquoi*
certaines lignes existent avant de les supprimer par nettoyage, et pour reconnaître vite les mêmes
symptômes sur un futur VPS ou un futur projet Strapi+Docker.

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
  installés (`docker compose version` doit fonctionner). Les images Hostinger/DigitalOcean "Docker"
  les ont déjà — vérifier avant de perdre du temps à les réinstaller.
- Accès SSH par clé (pas par mot de passe partagé dans un chat — voir section 2).
- Deux noms de domaine (ou sous-domaines), ex. `www.interformci.com` et `api.interformci.com`.
- Deux enregistrements DNS de type A (ou AAAA en IPv6) pointant **chacun** vers l'IP publique du
  VPS. Vérifie leur propagation avant de démarrer Caddy :

  ```bash
  dig +short www.interformci.com
  dig +short api.interformci.com
  ```

  Les deux doivent renvoyer l'IP du VPS. Si ce n'est pas le cas, Caddy ne pourra pas obtenir de
  certificat HTTPS. **Ce n'est pas bloquant pour le reste** : tout le reste du déploiement (build,
  démarrage backend/frontend, migration des données) ne dépend pas du DNS — seul le démarrage de
  Caddy avec HTTPS en dépend. Voir section 7 pour tester avant que le DNS soit prêt.

- Ports 80 et 443 libres pour Caddy. Le pare-feu (`ufw`) est souvent **inactif par défaut** sur un
  VPS fraîchement livré (vérifier avec `ufw status`) — l'activer explicitement avant de considérer
  le serveur prêt :

  ```bash
  ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443/tcp && ufw --force enable
  ```

  Toujours autoriser SSH **avant** d'activer `ufw`, sinon la connexion se coupe.

---

## 2. Accès SSH

Ne jamais faire transiter un mot de passe root dans un outil ou un chat. Méthode : générer (ou
réutiliser) une clé SSH, l'ajouter au VPS via le panneau du fournisseur (hPanel chez Hostinger,
etc. → section "SSH Keys") ou via `ssh-copy-id` en interactif une seule fois avec le mot de passe
initial, puis n'utiliser plus que la clé.

```bash
ssh -o StrictHostKeyChecking=accept-new -o BatchMode=yes root@VPS_IP "echo OK"
```

`StrictHostKeyChecking=accept-new` évite le prompt interactif bloquant à la toute première
connexion (accepte l'empreinte du serveur automatiquement — acceptable puisqu'on vient de recevoir
cette IP du fournisseur lui-même).

---

## 3. Récupérer le code sur le VPS

```bash
git clone https://github.com/abdoul-sakhur/projet-informeci.git /opt/projet-informeci
cd /opt/projet-informeci
```

(Ou `git pull` si le dépôt est déjà cloné et qu'il s'agit d'une mise à jour — voir section 9.)

---

## 4. Configurer les variables d'environnement

Deux fichiers d'exemple existent et **ne doivent jamais être commités une fois remplis** (déjà
exclus dans `.gitignore`).

### 4.1 Domaines (`.env.prod`)

```bash
cp .env.prod.example .env.prod
```

```
DOMAIN=www.interformci.com
API_DOMAIN=api.interformci.com
```

### 4.2 Secrets Strapi (`backend/.env.production`)

```bash
cp backend/.env.production.example backend/.env.production
```

Générer des secrets uniques (**ne pas réutiliser ceux du dev local**) — `openssl` est presque
toujours déjà présent sur le VPS, pas besoin de Node pour ça :

```bash
gen() { openssl rand -base64 16; }
echo "APP_KEYS=$(gen),$(gen),$(gen),$(gen)"
echo "API_TOKEN_SALT=$(gen)"
echo "ADMIN_JWT_SECRET=$(gen)"
echo "TRANSFER_TOKEN_SALT=$(gen)"
echo "JWT_SECRET=$(gen)"
echo "ENCRYPTION_KEY=$(gen)"
```

Reporter ces valeurs dans `backend/.env.production` à la place de chaque `changeme`, puis mettre à
jour `URL` avec le vrai domaine API :

```
URL=https://api.interformci.com
```

Pour un trafic important, remplacer `DATABASE_CLIENT=sqlite` / `DATABASE_FILENAME=.tmp/data.db`
par une config Postgres (`DATABASE_CLIENT=postgres` + `DATABASE_HOST/PORT/NAME/USERNAME/PASSWORD`).
Non nécessaire pour un lancement initial.

---

## 5. Migrer des données existantes (si ce n'est pas un premier déploiement à vide)

Si un environnement de dev/staging a déjà du vrai contenu (textes saisis, photos uploadées) et
qu'on ne veut pas repartir du seed par défaut, migrer **avant** le premier démarrage de la stack de
prod — sinon le seed tourne sur une base vide et il faut ensuite fusionner à la main.

Les deux éléments qui comptent :
- `backend/.tmp/data.db` (base SQLite)
- `backend/public/uploads/` (fichiers uploadés)

**Étapes :**

1. Arrêter proprement la source (`docker compose stop backend` côté dev) avant de copier —
   copier un fichier SQLite pendant une écriture peut le corrompre.
2. Copier vers le VPS :
   ```bash
   scp backend/.tmp/data.db root@VPS_IP:/root/migration/data.db
   scp -r backend/public/uploads/. root@VPS_IP:/root/migration/uploads/
   ```
3. Redémarrer la source locale (`docker compose start backend`).
4. Créer les volumes Docker nommés **avant** le premier `up`, avec le même nom que Compose
   utilisera (`<nom-du-dossier>_<nom-du-volume>`, ex. `projet-informeci_backend_data`) :
   ```bash
   docker volume create projet-informeci_backend_data
   docker volume create projet-informeci_backend_uploads
   ```
5. Copier les fichiers dedans via un conteneur jetable :
   ```bash
   docker run --rm -v projet-informeci_backend_data:/data -v /root/migration:/backup \
     alpine cp /backup/data.db /data/data.db

   docker run --rm -v projet-informeci_backend_uploads:/data -v /root/migration/uploads:/backup \
     alpine cp -a /backup/. /data/
   ```
6. **Corriger les permissions avec le bon UID** (voir piège en section 11.3 — ne pas supposer
   `1000`, vérifier le vrai UID de l'utilisateur `strapi` dans l'image buildée) :
   ```bash
   docker run --rm projet-informeci-backend:latest id strapi   # donne le vrai UID/GID
   docker run --rm -v projet-informeci_backend_data:/data alpine chown -R <UID>:<GID> /data
   docker run --rm -v projet-informeci_backend_uploads:/data alpine chown -R <UID>:<GID> /data
   ```

Au démarrage, les logs du backend doivent afficher `[seed] Contenu principal déjà présent, seed
ignoré.` — c'est la confirmation que les vraies données ont été reconnues et que le seed ne les a
pas écrasées.

---

## 6. Construire et démarrer la stack

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

Cette commande :
1. Construit l'image backend (`backend/Dockerfile.prod`) et l'image frontend
   (`frontend/Dockerfile.prod`, avec `NEXT_PUBLIC_STRAPI_URL` injecté **au build** à partir de
   `API_DOMAIN` — voir piège 11.4, cette valeur ne peut plus changer sans rebuild).
2. Démarre `backend`, `frontend` et `caddy` en arrière-plan (`-d`).
3. Caddy demande automatiquement les certificats Let's Encrypt pour `DOMAIN` et `API_DOMAIN` au
   premier démarrage (peut prendre 30–60 secondes) — nécessite le DNS déjà propagé (section 1).

Le premier build de `backend` peut prendre 8–10 minutes (installation des dépendances Strapi dans
un conteneur neuf). **Si la commande est lancée via une session SSH qui peut se couper (agent,
connexion instable), la détacher du shell** pour qu'une coupure réseau ne tue pas le build en plein
milieu (voir piège 11.1) :

```bash
nohup docker compose -f docker-compose.prod.yml --env-file .env.prod build backend \
  > /root/backend-build.log 2>&1 < /dev/null &
disown
# puis suivre avec :
tail -f /root/backend-build.log
```

---

## 7. Tester avant que le DNS soit prêt

Le DNS peut prendre du temps à propager alors que tout le reste (build, données) est déjà prêt.
Pour visualiser le site sur l'IP brute en attendant :

```bash
docker compose -f docker-compose.prod.yml -f docker-compose.test-ports.yml --env-file .env.prod \
  up -d backend frontend    # sans caddy — pas besoin de DNS pour ça
```

avec un fichier `docker-compose.test-ports.yml` (à créer, à ne **pas** committer) :

```yaml
services:
  frontend:
    ports:
      - "8080:3000"
  backend:
    ports:
      - "8081:1337"
```

(+ `ufw allow 8080/tcp && ufw allow 443/tcp`)

⚠️ **Piège** : `NEXT_PUBLIC_STRAPI_URL` est injecté **au build**, pas au runtime. Un frontend buildé
avec `API_DOMAIN=api.interformci.com` référence cette URL dans tout le HTML envoyé au navigateur
(images, appels des formulaires) — si le DNS ne pointe pas encore, **rien de tout ça ne
fonctionnera** sur le lien de test IP, même si les pages se chargent. Pour un vrai test IP avec
images fonctionnelles, rebuilder temporairement le frontend avec l'IP :port :

```bash
cd frontend
docker build -f Dockerfile.prod -t projet-informeci-frontend:latest \
  --build-arg NEXT_PUBLIC_STRAPI_URL=http://VPS_IP:8081 .
docker compose -f ../docker-compose.prod.yml -f ../docker-compose.test-ports.yml \
  --env-file ../.env.prod up -d --no-deps frontend
```

**Ne pas oublier de rebuilder avec la vraie URL de domaine avant le passage en prod définitif** —
section 6 le fait automatiquement au prochain `--build` avec `.env.prod` correct.

---

## 8. Vérifier le déploiement définitif (avec Caddy + domaine)

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

### 8.1 Créer le compte administrateur Strapi

Ouvrir `https://api.interformci.com/admin` et suivre le formulaire de création de compte
(email + mot de passe forts). C'est ce compte qui sert ensuite à gérer tout le contenu du site
(textes, photos, partenaires, messages de contact, etc.) depuis l'admin.

---

## 9. Mettre à jour après un changement de code

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

Docker ne reconstruit que ce qui a changé. Les volumes (`backend_data`, `backend_uploads`,
`caddy_data`, `caddy_config`) ne sont jamais touchés par cette commande — le contenu Strapi et les
certificats TLS sont conservés.

---

## 10. Sauvegardes

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

## 11. Pièges déjà rencontrés (et déjà corrigés dans le code)

Ces bugs ont chacun coûté un aller-retour de build complet (plusieurs minutes) avant d'être
identifiés. Les corrections sont déjà dans `backend/Dockerfile.prod` — cette section explique le
"pourquoi", pour ne pas les réintroduire par erreur et pour reconnaître vite les mêmes symptômes
ailleurs.

### 11.1 Un build lancé via SSH meurt si la connexion se coupe

**Symptôme** : `docker compose build` s'interrompt en pleine installation npm avec
`ECONNRESET`/`Connection reset by peer`, sans rapport avec le contenu du Dockerfile.

**Cause** : la commande était attachée à la session SSH interactive ; une coupure réseau tue le
process enfant avec elle.

**Fix** : toujours détacher les builds longs avec `nohup ... > log 2>&1 < /dev/null & disown` (voir
section 6) quand ils tournent via SSH plutôt qu'en local.

### 11.2 `types/generated` absent → échec de compilation TypeScript en prod, alors que ça marche en dev

**Symptôme** : `strapi build` échoue avec des erreurs `TS2353: Object literal may only specify
known properties, and 'xxx' does not exist in type...` sur des champs de content-type qui
existent bel et bien dans les schémas.

**Cause** : `backend/types/generated/` est dérivé des schémas de content-types et **gitignové** —
`strapi develop` le régénère en continu en local, donc il traîne sur toute machine de dev qui a
déjà lancé le serveur, mais un `git clone` frais (VPS, CI, autre machine) ne l'a jamais.
**Piège méthodologique associé** : un premier test de build en local sur la machine de dev peut
donner un **faux positif** — le contexte de build Docker local copie ce dossier gitignoré présent
sur le disque, masquant complètement le bug qui n'apparaît que sur un clone vraiment neuf.

**Fix** : `RUN npx strapi ts:generate-types && npm run build` dans le stage de build du
`Dockerfile.prod` (avant `strapi build`, jamais après).

**Leçon générale** : pour valider un build de prod, tester contre un dossier gitignoré vidé (ou un
vrai `git clone` frais dans un répertoire à part), pas juste `docker build` sur le disque de dev.

### 11.3 UID de l'utilisateur non-root du conteneur : ne jamais le supposer

**Symptôme** : après avoir pré-rempli un volume de données avec `chown -R 1000:1000` (supposition
usuelle), le conteneur ne peut pas écrire dedans, ou dans notre cas ça n'a heureusement affecté que
la préparation, pas un crash silencieux plus tard.

**Cause** : `useradd -r` (utilisateur système, flag utilisé dans le Dockerfile pour l'utilisateur
`strapi`) attribue le premier UID système libre — ici `999`, pas `1000` comme le veut la convention
habituelle des images "grand public" (node, postgres, etc.).

**Fix** : toujours vérifier avant de `chown` :
```bash
docker run --rm <image> id strapi
```
et utiliser l'UID/GID réels retournés (voir section 5, étape 6).

### 11.4 Crash au démarrage : `Cannot destructure property 'client' of 'db.config.connection'`

**Symptôme** : le conteneur backend boucle en `Restarting`, avec cette erreur dès le tout début du
boot, alors que la configuration (`DATABASE_CLIENT`, etc.) est correctement injectée (vérifié avec
`docker run ... env`) et que le build a réussi sans erreur.

**Cause, trouvée en lisant le code compilé de `@strapi/strapi`** (`dist/src/cli/commands/start.js`) :
`strapi start` vérifie la présence de `tsconfig.json` à la racine du projet (`appDir`) pour décider
où se trouve le code compilé (`distDir`). **Sans ce fichier, il suppose `distDir = appDir`** et
cherche la config (et donc `database.js`) directement à la racine au lieu de `./dist/config` —
charge silencieusement une config vide, d'où l'erreur de connexion DB qui n'a en fait rien à voir
avec la base de données elle-même.

**Fix** : copier `tsconfig.json` (juste le fichier JSON, pas les dépendances de dev) dans le stage
runtime :
```dockerfile
COPY --from=build /app/tsconfig.json ./tsconfig.json
```

**Leçon générale** : ce message d'erreur est trompeur pour à peu près tout le monde qui le
rencontre (confirmé en cherchant en ligne — plusieurs rapports similaires, souvent mal diagnostiqués
comme un problème d'environnement DB). Le vrai signal est de vérifier `strapi.dirs`/`distDir` avant
de suspecter la config de base de données elle-même.

### 11.5 Confusion sur "qui exécute les commandes SSH"

Si l'agent (Claude Code) tourne en local sur la même machine que le terminal de l'utilisateur, pas
besoin de générer une clé SSH dédiée séparée en plus de celle déjà autorisée par l'utilisateur sur
le VPS — les deux partagent le même `~/.ssh`. Clarifier ce point en tout début de déploiement évite
un aller-retour ("quelle clé ajouter où").

---

## 12. Commandes utiles

| Action | Commande |
|---|---|
| Voir les logs en direct | `docker compose -f docker-compose.prod.yml logs -f [service]` |
| Redémarrer un service | `docker compose -f docker-compose.prod.yml restart backend` |
| Arrêter toute la stack | `docker compose -f docker-compose.prod.yml down` (les volumes sont conservés) |
| État des services | `docker compose -f docker-compose.prod.yml ps` |
| Vérifier l'UID d'un utilisateur dans une image | `docker run --rm <image> id <user>` |
| Lister les volumes réels | `docker volume ls` |

---

## 13. Dépannage rapide

- **Caddy n'obtient pas de certificat HTTPS** → vérifier que les DNS pointent bien vers le VPS
  (`dig +short <domaine>`) et que les ports 80/443 sont ouverts et libres.
- **Le frontend affiche des erreurs de connexion à l'API, ou les images ne s'affichent pas** →
  vérifier que `API_DOMAIN` dans `.env.prod` correspond bien au domaine réellement utilisé par le
  backend, et que le build du frontend a bien été refait après tout changement de `.env.prod`
  (l'URL de l'API est injectée **au build**, pas au runtime, côté navigateur — voir piège 11 et
  section 7 pour le cas particulier du test avant DNS).
- **`docker compose ... build` échoue sur `npm install` (ECONNRESET / timeout réseau)** → problème
  réseau transitoire ; relancer la même commande (détachée si via SSH, voir piège 11.1).
- **Backend en `Restarting` en boucle, erreur `db.config.connection`** → voir piège 11.4 ; vérifier
  que `tsconfig.json` est bien copié dans l'image runtime.
- **Erreurs `TS2353` au build sur des champs qui existent pourtant dans les schémas** → voir piège
  11.2 ; vérifier que `strapi ts:generate-types` tourne bien avant `npm run build`.
