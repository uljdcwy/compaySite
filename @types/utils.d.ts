declare module "node:crypto" {
    import { CipherKey, BinaryLike } from "node:crypto";

    /**
     * 
     * @param aesStr 加密字符串
     * @param aesType 加密类型
     * @param key 密钥
     * @param iv 偏移
     * @returns 返回字符串
     */
    type aesEncryption = (aesStr: BinaryLike, aesType: string, key: CipherKey, iv: BinaryLike | null) => Promise<any>;

}