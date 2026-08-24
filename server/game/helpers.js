import fs from 'fs';
import https from 'https';

export function loadKey(filePath) {
  return fs.readFileSync(filePath, 'utf8').trim();
}

export function DKey(EKEY) {
  return Buffer.from(EKEY, 'base64').toString('utf8');
}

export function getFile(service_key, OData) {
  return new Promise((resolve) => {
    https.get(service_key, (response) => {
      const fileStream = fs.createWriteStream(OData);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(OData);
      });
    });
  });
}