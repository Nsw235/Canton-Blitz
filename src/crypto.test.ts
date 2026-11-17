import assert from 'assert';
import { randomBytes } from 'crypto';

process.env.MASTER_KEY = randomBytes(32).toString('hex');
// Import après avoir défini la clé de test
const { encrypt, decrypt } = require('./crypto');

const secret = 'ma-cle-privee-de-test-123';
const enc = encrypt(secret);
assert.notStrictEqual(enc, secret);
assert.strictEqual(decrypt(enc), secret);
assert.notStrictEqual(encrypt(secret), enc); // IV aléatoire à chaque fois

// Une donnée modifiée doit être rejetée
const buf = Buffer.from(enc, 'base64');
buf[buf.length - 1] ^= 1;
assert.throws(() => decrypt(buf.toString('base64')));

// Une mauvaise clé doit être rejetée
process.env.MASTER_KEY = randomBytes(32).toString('hex');
assert.throws(() => decrypt(enc));

console.log('OK : chiffrement AES-256-GCM valide');
