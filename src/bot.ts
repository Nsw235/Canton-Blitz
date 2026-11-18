import { Telegraf, Markup } from 'telegraf';
import { prisma } from './db';

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('👛 Mon wallet', 'wallet')],
  [Markup.button.callback('🟢 Acheter', 'buy'), Markup.button.callback('🔴 Vendre', 'sell')],
  [Markup.button.callback('⚙️ Paramètres', 'settings')],
]);

const backMenu = Markup.inlineKeyboard([[Markup.button.callback('⬅️ Menu', 'menu')]]);

export function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);

  // Enregistre l'utilisateur à chaque interaction.
  bot.use(async (ctx, next) => {
    if (ctx.from) {
      await prisma.user.upsert({
        where: { telegramId: BigInt(ctx.from.id) },
        update: { username: ctx.from.username ?? null },
        create: { telegramId: BigInt(ctx.from.id), username: ctx.from.username ?? null },
      });
    }
    return next();
  });

  bot.start((ctx) =>
    ctx.reply('⚡ Bienvenue sur Canton Blitz.\nAchète et vends en un clic.', mainMenu),
  );

  bot.action('menu', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageText('⚡ Canton Blitz — menu principal', mainMenu);
  });

  bot.action('wallet', async (ctx) => {
    await ctx.answerCbQuery();
    const count = await prisma.wallet.count({
      where: { user: { telegramId: BigInt(ctx.from!.id) } },
    });
    await ctx.editMessageText(
      count === 0
        ? '👛 Aucun wallet pour l’instant.\nLa création arrive avec l’étape 4.'
        : `👛 Tu as ${count} wallet(s).`,
      backMenu,
    );
  });

  for (const [action, label] of [
    ['buy', '🟢 Achat'],
    ['sell', '🔴 Vente'],
    ['settings', '⚙️ Paramètres'],
  ] as const) {
    bot.action(action, async (ctx) => {
      await ctx.answerCbQuery();
      await ctx.editMessageText(`${label} : bientôt disponible (étape 4).`, backMenu);
    });
  }

  bot.catch((err) => console.error('Erreur bot :', err));
  return bot;
}
