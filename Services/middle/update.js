import { execute, query } from "../mysql.js";
import { getSaveDir } from "../utils/checkFile.js";
import * as fs from "fs";


/**
 * @type {middle} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const updateMiddle = async function (ctx) {
    try {
        ctx.body = {
            code: 1,
            msg: '',
            data: await updateSqlSafety(ctx)
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: '',
            data: null
        }
    }
}
/**
 * @type {middle} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const updateManyMiddle = async (ctx) => {
    try {
        ctx.body = {
            code: 1,
            msg: '',
            data: await updateManySql(ctx)
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: '',
            data: null
        }
    }
}

/**
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const updateSql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "更新参数");
    let mainKey = 'id';
    let updateSql = '';
    for (let key in params) {
        if (key === ctx.mainKey) {
            mainKey = params[key];
            if (typeof mainKey == 'string') {
                mainKey = `"${mainKey}"`
            }
        } else {
            let val = params[key];
            if (typeof val == 'string') {
                val = val.replace(/(\\*)(")/g, (str, $1, $2) => {
                    if ($1 && $2) {
                        return '\\'.repeat($1.length + 1) + '"'
                    } else {
                        return "\\" + $2
                    }
                })
                updateSql += updateSql ? (`, ${key} = "${val}"`) : (`${key}  = "${val}"`);
            } else {
                val = val ? `'${JSON.stringify(val)}'` : val;
                updateSql += updateSql ? (`, ${key} = ${val}`) : (`${key}  = ${val}`);
            }
        }
    }
    return await execute(`UPDATE ${ctx.dbName} SET ${updateSql} WHERE ${ctx.mainKey} = ${mainKey}`, []);
}
/**
 * 防SQL注入的批量更新语句
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const updateSqlSafety = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "更新参数");
    let updateSql = '';
    let safetyArr = [];
    for (let key in params) {
        if (key !== ctx.mainKey) {
            let val = params[key];
            if (typeof val == 'string') {
                val = val.replace(/(\\*)(")/g, (str, $1, $2) => {
                    if ($1 && $2) {
                        return '\\'.repeat($1.length + 1) + '"'
                    } else {
                        return "\\" + $2
                    }
                });
                safetyArr.push(val);
                updateSql += updateSql ? (`, ${key} = ?`) : (`${key}  = ?`);
            } else {
                safetyArr.push(JSON.stringify(val));
                updateSql += updateSql ? (`, ${key} = ?`) : (`${key}  = ?`);
            }
        }
    }
    safetyArr.push(params[ctx.mainKey])
    return await execute(`UPDATE ${ctx.dbName} SET ${updateSql} WHERE ${ctx.mainKey} = ?`, safetyArr);
}
/**
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const updateManySql = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "批量更新参数");
    let mainKeyArr = params.mainKeyArr;
    let updateSql = '';
    let updateData = params.updateData;
    let mainKey = ctx.mainKey || 'id';
    for (let key in updateData) {
        let val = updateData[key];
        if (updateSql) {
            updateSql += `, ${key} = CASE ${mainKey}`
            for (let i = 0; i < mainKeyArr?.length; i++) {
                if (typeof val == 'string') {
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN '${val}'`
                } else {
                    val = val ? `'${JSON.stringify(val)}'` : val;
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN ${val}`
                }
            }
            updateSql += ` END`
        } else {
            updateSql += ` ${key} = CASE ${mainKey}`
            for (let i = 0; i < mainKeyArr?.length; i++) {
                if (typeof val == 'string') {
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN '${val}'`
                } else {
                    val = val ? `'${JSON.stringify(val)}'` : val;
                    updateSql += ` WHEN ${mainKeyArr[i]} THEN ${val}`
                }
            }
            updateSql += ` END`
        }
    }

    mainKeyArr = mainKeyArr.join(',')
    return await execute(`UPDATE ${ctx.dbName} SET${updateSql} WHERE ${mainKey} IN (${mainKeyArr})`, []);
}

/**
 * @type {writeFile} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const updateJsonFile = (ctx) => {
    let saveDir = getSaveDir('database');
    let params = ctx.request.body;
    let saveFile = `${saveDir}/${ctx.dbName}.js`;
    let fileContent;
    try {
        fileContent = JSON.parse(fs.readFileSync(saveFile).toString());
        let hasUpdate = false;
        fileContent.some(/**@type {forEach} */ (el, idx) => {
            if (el.id == params.id) {
                fileContent[idx] = Object.assign(el,params);
                hasUpdate = true;
                return true;
            }
        });

        fs.writeFileSync(saveFile, JSON.stringify(fileContent), 'utf-8');
        if(hasUpdate){
            ctx.body = {
                code: 1,
                data: {
                    insertId: params.id
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
        console.log(JSON.stringify(e),"查看更新错误");
        ctx.body = {
            code: 0,
            msg: "更新失败",
            data: null
        }
    };
}