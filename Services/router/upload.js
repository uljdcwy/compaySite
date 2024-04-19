// @ts-ignore
import Router from "koa-router";

import { upload } from "../middle/upload.js"
export const uploadFile = new Router();

// @ts-ignore
uploadFile.post("/upload/uploadImage", async (ctx, next) => {
    await next();
}, upload)