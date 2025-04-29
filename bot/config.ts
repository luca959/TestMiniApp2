import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carica il file .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const WEBAPP_URL = process.env.WEBAPP_URL;
