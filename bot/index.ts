import { Telegraf } from 'telegraf';
import { BOT_TOKEN, WEBAPP_URL } from './config.js';

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(BOT_TOKEN);

// Basic commands
bot.command('start', (ctx) => {
  ctx.reply('Welcome to CSecMiniApp🚀\nUse /help to see available commands.');
});

bot.command('help', (ctx) => {
  ctx.reply(
    'Available commands:\n' +
    '/start - Start the bot\n' +
    '/help - Show this help message\n' +
    '/webapp - Open the Mini App'
  );
});
const testUrl = 'https://t.me/CsecLabMiniApp2Bot/Home';

bot.command('webapp', (ctx) => {
  const webAppUrl = WEBAPP_URL || 'https://example.com'; // Ensure fallback URL is valid
  console.log('WebApp URL:', webAppUrl);

  ctx.reply('Open Web App', {
    reply_markup: {
      inline_keyboard: [[
        { text: "Open App", url: webAppUrl } // Directly using 'url' without 'web_app'
      ]]
    }
  });
});

bot.launch().then(() => {
  console.log('Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
