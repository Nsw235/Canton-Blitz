import 'dotenv/config';

// Vérifie la config au démarrage (échoue vite si quelque chose manque).
for (const name of ['TELEGRAM_BOT_TOKEN', 'MASTER_KEY', 'DATABASE_URL']) {
  if (!process.env[name]) {
    console.error(`Variable d'environnement manquante : ${name}`);
    process.exit(1);
  }
}

console.log('Canton Blitz : configuration OK. Le bot Telegram arrive à l’étape 3.');
