// Génère une Master Key AES-256 (64 caractères hex).
// À lancer UNE fois sur ton serveur : npm run genkey
// Colle le résultat dans .env (MASTER_KEY=...) et sauvegarde-le aussi ailleurs :
// si tu perds cette clé, toutes les clés chiffrées en base sont perdues.
const { randomBytes } = require('crypto');
console.log('MASTER_KEY=' + randomBytes(32).toString('hex'));
