import crypto from 'crypto';

const SECRET_KEY = crypto.createHash('sha256').update('blockchain-game-secure-2024').digest();
const IV_LENGTH = 16;

export function Etext(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', SECRET_KEY, iv);
  let Estring = cipher.update(text, 'utf8', 'hex');
  Estring += cipher.final('hex');
  return iv.toString('hex') + ':' + Estring;
}

export function Dtext(EstringText) {
  const parts = EstringText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const Estring = parts[1];
  const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, iv);
  let Dstring = decipher.update(Estring, 'hex', 'utf8');
  Dstring += decipher.final('utf8');
  return Dstring;
}

export default { Etext, Dtext };
