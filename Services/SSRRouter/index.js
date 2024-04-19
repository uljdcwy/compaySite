// @ts-ignore
import Router from "koa-router";
import { initSSRHTML } from "./initData.js";
import { getListMiddle } from "./../middle/getList.js"

export const ssrRouter = new Router();

// @ts-ignore
ssrRouter.get("/", async (ctx, next) => {
    // @ts-ignore
    ctx.body = await initSSRHTML(ctx.url, ctx.query.lang || 'zh');
});

// @ts-ignore
ssrRouter.get("/:router", async (ctx, next) => {
    if(/\..+$/.test(ctx.url)){
        await next()
    }else{
        // @ts-ignore
        ctx.body = await initSSRHTML(ctx.url, ctx.query.lang || 'zh');
    }
});


