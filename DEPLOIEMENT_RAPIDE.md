# Déploiement — guide rapide

Le strict nécessaire pour redéployer. Pour la première installation complète ou en cas de
problème, voir [DEPLOIEMENT.md](./DEPLOIEMENT.md).

## Se connecter au VPS

```bash
ssh root@191.215.38.212
cd /opt/projet-informeci
```

## Mettre à jour le site (cas le plus courant)

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

C'est tout. Les données (contenu Strapi, photos, certificats HTTPS) ne sont jamais touchées par
cette commande.

## Vérifier que tout va bien

```bash
docker compose -f docker-compose.prod.yml ps
```

Les 3 services (`backend`, `frontend`, `caddy`) doivent être `Up (healthy)`. Puis ouvrir
`https://www.interformci.com` dans un navigateur.

## Les 3 règles à ne jamais casser

1. **Toujours préciser `-f docker-compose.prod.yml`.** Le fichier sans suffixe
   (`docker-compose.yml`) existe aussi dans le dossier cloné sur le VPS — c'est celui du dev local
   (code monté en volume, pas d'image compilée). Ne jamais lancer `docker compose up` sans le `-f`,
   sinon c'est ce fichier-là qui démarre par défaut.
2. **Un build long lancé via SSH doit être détaché**, sinon une coupure réseau le tue :
   ```bash
   nohup docker compose -f docker-compose.prod.yml --env-file .env.prod build backend \
     > /root/backend-build.log 2>&1 < /dev/null &
   disown
   ```
3. **Si le frontend a besoin d'une nouvelle valeur dans `.env.prod`** (changement de domaine par
   exemple), il faut le **rebuilder**, pas juste le redémarrer — l'URL de l'API y est injectée au
   moment du build, pas au démarrage.

## En cas de pépin

→ [DEPLOIEMENT.md, section 13 "Dépannage rapide"](./DEPLOIEMENT.md#13-dépannage-rapide)
