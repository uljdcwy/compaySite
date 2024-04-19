import os, { type } from "os"
export const getIP = () => {
    /**
     * @type {any}
     */
    const interfaces = os.networkInterfaces();
    let ipAddress = '';

    // 遍历网络接口
    for (const key in interfaces) {
        interfaces[key].some(/** @type {forEach} */function (details) {
            // 忽略 IPv6 和 127.0.0.1 地址
            if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
                ipAddress = details.address;
                return true;
            }
        });
    }
    return ipAddress;
}