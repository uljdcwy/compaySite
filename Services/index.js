import Koa from "koa";
// @ts-ignore
import Router from "koa-router";
// @ts-ignore
import cors from "koa2-cors";
// @ts-ignore
import mount from "koa-mount";
// @ts-ignore
import bodyParser from "koa-bodyparser";
// @ts-ignore
import staticFiles from "koa-static";
import config from "./config.json" assert { type: 'json' };
import { getIP } from "./utils/getIP.js"
import axios from "axios";
import { ssrRouter } from "./SSRRouter/index.js";
import { indexRouter } from "./router/index.js"
import { uploadFile } from "./router/upload.js";

// @ts-ignore
global.__VUE_PROD_DEVTOOLS__ = false;

const app = new Koa();


app.use(cors({
  origin: function (/** @type {{ header: { origin: any; }; }} */ ctx) {
    return  "*";// ctx.header.origin || "";
  }
}));

app.use(bodyParser({}));

app.use(uploadFile.routes()).use(uploadFile.allowedMethods());
app.use(ssrRouter.routes()).use(ssrRouter.allowedMethods());
app.use(indexRouter.routes()).use(indexRouter.allowedMethods());

app.use(staticFiles("./web", {
  maxage: 600000,
  extensions: ['appcache'],
  // @ts-ignore
  setHeaders: async (res, path, next) => {
    if(path.search(/.appcache/) > -1){
      res.setHeader('Content-Type', 'text/cache-manifest')
    }
  }
}));


app.use(staticFiles("./public", {
  maxage: 600000,
}));




app.listen(config.port, () => {
  console.log(`服务启用中 ${getIP()}:${config.port}`)
})