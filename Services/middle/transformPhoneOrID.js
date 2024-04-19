import { encryption, decrypt } from "./desensitization.js"
import { EncryptionType } from "./EncryptionType.ts"
export const transformMiddle = async (/** @type {{ request: { body: { phone: string; cardID: string; phoneEncryption: any; cardIDEncryption: any; }; }; }} */ ctx,/** @type {() => any} */ next) => {
    let params,
    phoneSercert,
    cardIDSercert
    params = ctx.request.body;
    phoneSercert = encryption(params.phone);
    cardIDSercert = encryption(params.cardID, EncryptionType.Identification);
    ctx.request.body.phone =  phoneSercert.encrypted;
    ctx.request.body.cardID =  cardIDSercert.encrypted;
    ctx.request.body.phoneEncryption =  phoneSercert.ciphertext;
    ctx.request.body.cardIDEncryption =  cardIDSercert.ciphertext;
    await next();
    params = null;
    phoneSercert = null;
    cardIDSercert = null;
}