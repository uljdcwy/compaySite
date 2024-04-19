import { type } from "os";
import { execute } from "../mysql.js";
import { getSaveDir } from "../utils/checkFile.js";
import * as fs from "fs";

/**
 * @type {middle} 中间件方法
 * @param ctx 上下文对象
 * @returns 返回空 
 */
export const deleteMiddle = async (ctx) => {
    try {
        ctx.body = {
            code: 1,
            msg: "",
            data: await deleteSqlRun(ctx)
        };
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: "删除失败",
            data: null
        }
    }
}

/**
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const deleteSqlRun = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "删除参数");
    let mainKey = 'id';
    
    mainKey = params[ctx.mainKey];
    if (typeof mainKey == 'string') {
        return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} in(${mainKey})`, []);
    } else {
        return await execute(`DELETE FROM ${ctx.dbName} WHERE ${ctx.mainKey} = ${mainKey}`, []);
    }
}

/**
 * @type {writeFile} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns 返回空
 */
export const deleteJsonFile = (ctx) => {
    let saveDir = getSaveDir('database');
    let deleteID = ctx.request.body.id;
    let saveFile = `${saveDir}/${ctx.dbName}.js`;
    let fileContent;
    try {
        fileContent = JSON.parse(fs.readFileSync(saveFile).toString());
        let hasDelete = false;
        fileContent.some(/**@type {forEach} */ (el, idx) => {
            if (el.id == deleteID) {
                fileContent[idx] = null;
                hasDelete = true;
                return true;
            }
        });
        fileContent = fileContent.filter(/** @type {filter} */(e) => e);

        fs.writeFileSync(saveFile, JSON.stringify(fileContent), 'utf-8');
        if(hasDelete){
            ctx.body = {
                code: 1,
                data: {
                    insertId: deleteID
                },
                msg: ""
            }
        }else{
            ctx.body = {
                code: 0,
                data: null,
                msg: "未查询到数据"
            }
        }
    } catch (e) {
        console.log(JSON.stringify(e),"查看删除错误");
        ctx.body = {
            code: 0,
            msg: "删除失败",
            data: null
        }
    };
}