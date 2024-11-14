import { execute } from "../mysql.js";
import { getUuid } from "../utils/uuid.js";
import { getSaveDir } from "../utils/checkFile.js"
import * as fs from "fs";

/**
 * @type {middle} 中间件方法
 * @param ctx 上下文对象
 * @returns 返回空 
 */
export const addMiddle = async (ctx) => {
    try {
        let data = await addSqlRunSafety(ctx);
        console.log(data, "data")
        ctx.body = {
            code: 1,
            msg: '',
            data
        };
    } catch (e) {
        console.error(e,"查看新增错误信息");
        ctx.body = { code: 0, msg: '新增失败' };
    }
}
/**
 * @type {middle} 中间件方法
 * @param ctx 上下文对象
 * @returns 返回空 
 */
export const addBatchesMiddle = async (ctx) => {
    try {
        ctx.body = {
            code: 1,
            msg: "",
            data: await batchesAddSqlRun(ctx)
        };
    } catch (e) {
        console.error(e,"查看新增错误信息");
        ctx.body = { code: 0, data: null, msg: '新增失败' };
    }
}

/**
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const addSqlRun = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "新增参数");
    let keys = '';
    let values = '';
    for (let key in params) {
        let val = params[key];
        if (typeof val == 'string') {
            val = val.replace(/(\\*)(")/g, (str, $1, $2) => {
                if ($1 && $2) {
                    return '\\'.repeat($1.length + 1) + '"'
                } else {
                    return "\\" + $2
                }
            })
            values += values ? `, "${val}"` : `"${val}"`;
        } else {
            val = val ? `'${JSON.stringify(val)}'` : val;
            values += values ? `, ${val}` : val;
        }
        keys += keys ? (', ' + key) : key;
    }
    return await execute(`INSERT INTO ${ctx.dbName}(${keys}) VALUES(${values})`, []);
}

/**
 * 防SQL注入的新增语句
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const addSqlRunSafety = async (ctx) => {
    let params = ctx.request.body;
    console.info(JSON.stringify(params), "新增参数");
    let keys = '';
    let values = '';
    let safetyArr = [];
    for (let key in params) {
        let val = params[key];
        if (typeof val == 'string') {
            val = val.replace(/(\\*)(")/g, (/** @type {any} */ str, /** @type {string | any[]} */ $1, /** @type {string} */ $2) => {
                if ($1 && $2) {
                    return '\\'.repeat($1.length + 1) + '"'
                } else {
                    return "\\" + $2
                }
            });
            safetyArr.push(val);
        }else{
            safetyArr.push(JSON.stringify(val));
        }
        values += values ? `, ?` : "?";
        keys += keys ? (', ' + key) : key;
    }
    return await execute(`INSERT INTO ${ctx.dbName}(${keys}) VALUES(${values})`, safetyArr);
}

/**
 * 防SQL注入的批量新增语句
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const batchesAddSqlRunSafety = async (ctx) => {
    let manyParams = ctx.request.body;
    console.info(JSON.stringify(manyParams), "批量新增参数");
    let keys = '';
    let values = '';
    /**
     * @type { any }
     */
    let safetyArr = [];
    manyParams.forEach(
        /**
         * @type {forEach}
         */
        (el, index) => {
        /**
         * @type { any }
         */
        let batchArr = [];
        for (let key in el) {
            let val = el[key];
            if (index == 0) { keys += keys ? (', ' + key) : key; }
            if (typeof val == 'string') {
                batchArr.push(val);
            }else{
                batchArr.push(JSON.stringify(val));
            }
        }
        safetyArr.push(batchArr);
    });
    return await execute(`INSERT INTO ${ctx.dbName}(${keys}) VALUES ?`, [safetyArr]);
}

/**
 * @type {sqlRun} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const batchesAddSqlRun = async (ctx) => {
    let manyParams = ctx.request.body;
    console.info(JSON.stringify(manyParams), "批量新增参数");
    let keys = '';
    let values = '';
    manyParams.forEach(
        /**
         * @type {forEach}
         */
        (el, index) => {
        values += !values ? ' VALUES(' : ', (';
        let startStatus = false;
        for (let key in el) {
            let val = el[key];
            if (index == 0) { keys += keys ? (', ' + key) : key; }
            if (typeof val == 'string') {
                values += startStatus ? `, '${val}'` : `'${val}'`;
            } else {
                val = val ? `'${JSON.stringify(val)}'` : val;
                values += startStatus ? `, ${val}` : val;
            }
            startStatus = true;
        }
        values += ')'
    });
    return await execute(`INSERT INTO ${ctx.dbName}(${keys})${values}`, []);
}

/**
 * @type {writeFile} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns 返回空
 */
export const addJsonFile = (ctx) => {
    let id = getUuid();
    let params = ctx.request.body;
    params.id = id;
    let saveDir = getSaveDir('database');
    
    let saveFile = `${saveDir}/${ctx.dbName}.js`;
    let fileContent;
    if(fs.existsSync(saveFile)){
        fileContent = JSON.parse(fs.readFileSync(saveFile).toString());
    }else{
        fileContent = [];
    }

    fileContent.push(params);
    fs.writeFileSync(saveFile, JSON.stringify(fileContent), 'utf-8');
    
    ctx.body = {
        code: 1,
        data: {
            insertId: id
        },
        msg: ""
    }
}