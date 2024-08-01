// @ts-ignore
import mysql2 from "mysql2/promise";
import config from "./config.json" assert { type: 'json' };

const pool = mysql2.createPool(config.dbData);
/**
 * 
 */
// @ts-ignore
process.on('exit', async (code) => {
    try{
        pool.end();
    } catch(e) {
        console.warn(JSON.stringify(e), '关闭连接池失败: ',code)
    }
});

export const createDB = async (/** @type {String} */ DBName) => {
    const connection = await pool.getConnection();
    try {
        // 执行创建数据库操作
        const [result] = await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DBName}\``);
        console.info('Create database result:', JSON.stringify(result));
        return result;
      } catch (createErr) {
        console.error('Create database error:', JSON.stringify(createErr));
        throw createErr;
      } finally {
        // 释放连接回连接池
        connection.release();
      }
}

/**
 * @type {sql} sql执行，此方法能一定程度避免被注入SQL
 * @param sql SQL语句
 * @param params SQL参数一般不用，
 * @returns 
 */
export const query = async (sql, params) => {
    return await pool.query(sql, params).catch((/** @type {any} */ res) => {
        console.info(`
            sql: ${sql}
            params: ${params}
            catch: ${JSON.stringify(res)}
            `)
    });
};
/**
 * @type {sql} sql执行
 * @param sql SQL语句
 * @param params 使用此种方式传参数能一定程度避免被注入SQL
 * @returns 
 */
export const execute = async (sql, params) => {
    const promiseResult = await pool.execute(sql, params).catch((/** @type {any} */ res) => {
        console.info(`
            sql: ${sql}
            params: ${params}
            catch: ${JSON.stringify(res)}
            `)
    });
    return promiseResult[0]
}
