import { getToken } from "./jwtValid.js"
import { findSqlRun } from "./getList.js"
import config from "Services/config.json" assert { type: 'json' };
// @ts-ignore
import md5 from "md5";
export const loginMiddle = async (/** @type {{ request: { body: any; }; body: { msg: string; code: number; token?: any; expression?: number; data?: null; }; }} */ ctx,/** @type {any} */ next) => {
    try {
        let params = ctx.request.body;
        
        if(!params.account){
            ctx.body = {
                msg: "帐号不能为空",
                code: 0
            }
        }else if(!params.password){
            ctx.body = {
                msg: "密码不能为空",
                code: 0
            }
        }else{
            let password = await findSqlRun({ account: params.account }, { dbName: "account" });

            if(md5(params.password) == (password.data[0] && password.data[0].password)){
                ctx.body = {
                    token: getToken(params),
                    expression: config.expression,
                    msg: "获取token成功",
                    code: 1
                }
            }else{
                ctx.body = {
                    msg: "帐号密码错误",
                    data: null,
                    code: 0
                }
            }
            
        }
    }catch(e){
        ctx.body = {
            msg: "登录异常",
            data: null,
            code: 0
        }
    }
}
