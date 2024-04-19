// @ts-ignore
import Jwt from "jsonwebtoken";
import config from "./../config.json" assert { type: 'json' };

const secret = config.jwtSercert;
export const getToken = (/** @type {any} */ loginData, expTime = 14400) => {
    return Jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (expTime),
        data: loginData
    }, secret)
};
export const validToken = async (/** @type {{ request: { header: { token: any; }; }; body: { msg: string; code: number; }; }} */ ctx,/** @type {() => any} */ next) => {
    try {
        let decoded = Jwt.verify(ctx.request.header.token, secret);
        await next();
    } catch (err) {
        ctx.body = {
            msg: "token验证失败",
            code: 0
        }
    }
}
