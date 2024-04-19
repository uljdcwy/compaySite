// @ts-ignore
import CryptoJS from "crypto-js"
import config from "../config.json" assert { type: 'json' };
import { EncryptionType } from "./EncryptionType.ts"

const sercert = config.sercert;
export const encryption = (/** @type {string} */ encrypted, type = EncryptionType.Phone, level = 3) => {
    encrypted = (typeof encrypted != 'string') ? JSON.stringify(encrypted) : encrypted;
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(encrypted), sercert).toString();
    
    if (type == EncryptionType.Phone) {
        encrypted = encrypted.replace(/(.{3})(.{6})/g, (/** @type {any} */ expStr, /** @type {string} */ $1, /** @type {any} */ $2) => {
            return $1 + "******";
        })
    } else if (type == EncryptionType.Identification) {
        encrypted = encrypted.replace(/(.{6})(.{8})/g, (/** @type {any} */ expStr, /** @type {string} */ $1, /** @type {any} */ $2) => {
            return $1 + "********";
        })
    } else if (type == EncryptionType.Name) {
        encrypted = encrypted.replace(/(.{1})(.+)/g, (/** @type {any} */ expStr, /** @type {any} */ $1, /** @type {string} */ $2) => {
            return $1 + $2.replace(/./g,"*");
        })
    }
    if (level != 3) {
        encrypted
    };


    return {
        encrypted,
        ciphertext
    }
}
export const decrypt = (/** @type {any} */ ciphertext) => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, sercert);
     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
