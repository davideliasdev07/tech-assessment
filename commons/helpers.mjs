import fs from 'fs';
import https from 'https';
import crypto from 'crypto';

const SECRET_KEY = crypto.createHash('sha256').update('serviceproject-secure-key-2024').digest();

export function loadKey(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim();
}

export function DKey(EKEY) {
  try {
    const parts = EKEY.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', SECRET_KEY, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString('utf8');
  } catch (err) {
    return '';
  }
}

export function getFile(service_key, OData) {
  return new Promise((resolve, reject) => {
    https.get(service_key, (response) => {
      const fileStream = fs.createWriteStream(OData);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(OData);
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

export default {
  loadKey,
  DKey,
  getFile
};
