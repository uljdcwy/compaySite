
import { scrypt, randomFill, createCipheriv } from "node:crypto"
/**
 * @type { import("node:crypto").aesEncryption }
 */
export const aesEncryption = async (aesStr, aesType, iv) => {
    return await new Promise((resolve, reject) => {
        scrypt(aesStr, 'salt', 24, (err, key) => {
            if (err) {
                reject(err);
                throw err;
                return;
            }
            randomFill(new Uint8Array(16), (err, iv) => {
                if (err) {
                    reject(err);
                    throw err;
                    return;
                }
                const cipher = createCipheriv(aesType, key, iv);

                let encrypted = '';
                cipher.setEncoding('hex');

                cipher.on('data', (chunk) => encrypted += chunk);
                cipher.on('end', () => console.log(encrypted));

                cipher.write('some clear text data');
                cipher.end();
                resolve(cipher);
            });
        });
    });
}

