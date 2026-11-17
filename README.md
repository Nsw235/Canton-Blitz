# Canton Blitz

Bot Telegram de trading (Supanova / Canton Network).

## Déploiement sur le VPS

1. `git clone <ton-depot-prive> && cd canton-blitz`
2. `cp .env.example .env` puis remplis les valeurs (`nano .env`)
3. `docker compose run --rm bot node scripts/generate-master-key.js` pour générer la `MASTER_KEY`
4. `docker compose up -d --build`
5. Logs : `docker compose logs -f bot`

## Étapes du projet

1. Structure + docker-compose (fait)
2. Chiffrement AES-256-GCM des clés (fait, `src/crypto.ts`)
3. Bot Telegraf (/start, menus)
4. Intégration API Supanova / Canton
