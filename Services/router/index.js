// @ts-ignore
import Router from "koa-router";
import { addMiddle } from "../middle/add.js";
import { findSqlRun, getListMiddle } from "../middle/getList.js";
import { updateMiddle } from "../middle/update.js"
import { deleteMiddle } from "../middle/delete.js"
export const indexRouter = new Router();

// @ts-ignore
indexRouter.post("/adminIndex/addData", async (ctx, next) => {
    ctx.dbName = "adminindex";
    const findVal = await findSqlRun({
        type: ctx.request.body.type
    }, ctx);
    if(findVal.data[0]){
        ctx.body = {
            code: 0,
            msg: "该数据已添加",
            data: null
        }
        return ;
    }
    await next();
}, addMiddle)

// @ts-ignore
indexRouter.post("/adminIndex/updateData", async (ctx, next) => {
    ctx.dbName = "adminindex";
    ctx.mainKey = "id";
    await next();
}, updateMiddle);

// @ts-ignore
indexRouter.post("/adminIndex/deleteData", async (ctx, next) => {
    ctx.dbName = "adminindex";
    ctx.mainKey = "id";
    await next();
}, deleteMiddle);


// @ts-ignore
indexRouter.get("/adminIndex/getData", async (ctx, next) => {
    ctx.dbName = "adminindex";
    await next();
}, getListMiddle);


// @ts-ignore
indexRouter.post("/adminAbout/addData", async (ctx, next) => {
    ctx.dbName = "adminabout";
    const findVal = await findSqlRun({
        type: ctx.request.body.type
    }, ctx);
    if(findVal.data[0]){
        ctx.body = {
            code: 0,
            msg: "该数据已添加",
            data: null
        }
        return ;
    }
    await next();
}, addMiddle)

// @ts-ignore
indexRouter.post("/adminAbout/updateData", async (ctx, next) => {
    ctx.dbName = "adminabout";
    ctx.mainKey = "id";
    await next();
}, updateMiddle);

// @ts-ignore
indexRouter.post("/adminAbout/deleteData", async (ctx, next) => {
    ctx.dbName = "adminabout";
    ctx.mainKey = "id";
    await next();
}, deleteMiddle);


// @ts-ignore 获取关于我们的数据
indexRouter.get("/adminAbout/getData", async (ctx, next) => {
    ctx.dbName = "adminabout";
    await next();
}, getListMiddle)