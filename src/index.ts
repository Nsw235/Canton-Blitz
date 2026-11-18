import 'dotenv/config';
import { createBot } from './bot';
import { prisma } from './db';

// Vérifie la config au démarrage (échoue vite si quelque chose manque).
for (const name of ['TELEGRAM_BOT_TOKEN', 'MASTER_KEY', 'DATABASE_URL']) {
  if (!process.env[name]) {
    console.error(`Variable d'environnement manquante : ${name}`);
    process.exit(1);
  }
}

const bot = createBot(process.env.TELEGRAM_BOT_TOKEN!);

bot.launch().then(() => console.log('Canton Blitz : bot démarré.'));

const stop = async (signal: string) => {
  bot.stop(signal);
  await prisma.$disconnect();
};
process.once('SIGINT', () => stop('SIGINT'));
process.once('SIGTERM', () => stop('SIGTERM'));
