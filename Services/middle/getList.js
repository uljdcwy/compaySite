
import { type } from "os";
import { execute } from "../mysql.js";
import { getSaveDir } from "../utils/checkFile.js";
import * as fs from "fs";

/**
 * @type {middle} 中间件方法
 * @param ctx 上下文对象
 * @returns 返回空 
 */
export const getListMiddle = async (ctx) => {
  try {
    let params = ctx.request.query;
    if (!Object.keys(params)[0]) {
      params = ctx.request.body;
    }
    ctx.body = await findSqlRun(params, ctx);

  } catch (e) {
    ctx.body = { code: 0, msg: '查询数据异常' };
  }
}

/**
 * @type {findSqlRun} sql 运行时的TS类型定义
 * @param params 数据请求参数
 * @param ctx 参数ctx为路由的上下文对象
 * @returns  返回承诺函数
 */
export const findSqlRun = async (params, ctx) => {

  console.info(JSON.stringify(params), "查询参数");
  let pageIndex, pageSize, count = null;
  let sqlStr = `select * from ${ctx.dbName} WHERE 1=1`;


  for (let key in params) {
    let timeIndex = key.search(/time/i);
    if (key == "pageSize" || key == "pageIndex" || key == "sortFile" || key == "sortOrder") {
      continue;
    } else if (timeIndex > 0 && params[key]) {
      try {
        let timeArr = params[key];
        sqlStr += ` and ${key} between '${timeArr[0]}' and '${timeArr[1]}'  `;
      } catch (e) {
        return { code: 0, msg: '时间格式异常' };
      }
    } else if (params[key]) {
      sqlStr += ` AND ${key}='${params[key]}'`
    }
  }


  if (params.sortFile !== undefined && params.sortOrder !== undefined) {
    sqlStr += ` ORDER BY ${params.sortFile} ${params.sortOrder}`
  }

  if (params.pageIndex !== undefined || params.pageSize !== undefined) {
    pageIndex = Number(params.pageIndex) || 0, pageSize = Number(params.pageSize) || 10;
    let [{ recordCount }] = await execute(sqlStr.replace("*", "COUNT(*) as recordCount"), []);
    count = recordCount;
    let startPosition = pageIndex * pageSize;
    sqlStr += ` LIMIT ${pageSize} offset ${startPosition}`;
    return {
      code: 1,
      count: count,
      data: await execute(sqlStr, []),
      msg: '',
    }
  }

  return {
    code: 1,
    data: await execute(sqlStr, []),
    msg: '',
  }
}

/**
 * @type {middle} 中间件方法
 * @param ctx 上下文对象
 * @returns 返回空 
 */
export const getJsonFile = async (ctx) => {
  ctx.body = await getJsonData(ctx.request.body, ctx)
}

/**
 * @type {getJsonData} sql 运行时的TS类型定义
 * @param ctx 参数ctx为路由的上下文对象
 * @returns 返回空
 */
export const getJsonData = async (params,ctx) => {
  
  let saveDir = getSaveDir('database');
  let saveFile = `${saveDir}/${ctx.dbName}.js`;
  let fileContent;
  try {

    if (!fs.existsSync(saveFile)) {
      return {
        code: 1,
        msg: "",
        data: []
      }
    }

    fileContent = JSON.parse(fs.readFileSync(saveFile).toString());
    
    if ((params.id || params.id === 0)) {
      let content;
      fileContent.some(/** @type {forEach} */(el) => {
        if (el.id == params.id && /\.txt$/.test(el?.articleContent)) {
          el.articleContent = fs.readFileSync(el?.articleContent).toString();
          content = el;
          return true;
        }
      });
      return {
        code: 1,
        data: content ? [content] : [],
        msg: ""
      };
    };
    
    /**
     * @type {any[]}
     */
    let initData = [];
    /**@type {any} */
    let searchObj = {};
    for (let key in params) {
      if (key != "pageIndex" && key != "pageSize") {
        searchObj[key] = params[key];
      }
    }
    
    fileContent.forEach(/** @type {forEach} */(el, idx) => {
      let searchStatus = true;
      for (let key in searchObj) {
        if (key.search(/time/i) > -1 && searchObj[key]) {
          let startTime = Number(searchObj[key][0].replace(/[-\s:]/g, ''));
          let endTime = Number(searchObj[key][1].replace(/[-\s:]/g, ''));
          let currentTime = Number(el[key].replace(/[-\s:]/g, ''));
          if (currentTime < startTime || currentTime > endTime) {
            searchStatus = false;
          }
        } else if (searchObj[key] && String(el[key]).search(String(searchObj[key])) < 0) {
          searchStatus = false;
        }
      }
      if (searchStatus) {
        initData.push(el);
      }
    });

    if ((params.pageIndex || params.pageIndex === 0) && params.pageSize) {
      let startPosition = params.pageIndex * params.pageSize;
      console.log("查看分页中",params.pageIndex * params.pageSize, params.pageSize)
      let allCount = initData.length;

      let isMaxPage =  ((allCount - (startPosition + params.pageSize)) < 0)

      return {
        code: 1,
        data: initData.slice(startPosition, isMaxPage ? allCount : params.pageSize),
        count: allCount,
        msg: ""
      }
    }

    return {
      code: 1,
      data: initData,
      msg: ""
    }
  } catch (e) {
    console.log(JSON.stringify(e), "查看查询错误");
    return {
      code: 0,
      msg: "查询失败",
      data: null
    }
  };
}