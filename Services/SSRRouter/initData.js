// @ts-ignore
import { renderToString } from 'vue/server-renderer';
import fs from "fs";
import { updateInitStore } from "./store.js";
// server.js (不相关的代码省略)
import { createApp } from '@/createSSRApp/app.js';
import baseData from '@/vueI18n/data.js';
import config from "../config.json" assert { type: 'json' };

import { getUrl, getPageI18nName } from "@/utils/getI18nData.js";
import axios from "axios";

/**
 * @type { string } HTML字符串
 */
let HTMLTemplate;
try {
    HTMLTemplate = fs.readFileSync("./web/index.html").toString();
} catch (e) {
    HTMLTemplate = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>未找到文件</title></head><body>服务器错误未找到文件</body></html>`
    console.error("未放置打包文件到指定位置", JSON.stringify(e));
}
const getInitData = () => {
    return {
        textNumber: 123456
    };
}

/**
 * 
 * @param {string} HTMLTemplate 页面模版
 * @param {string} title 页面标题
 * @returns 
 */
const updateTitle = (HTMLTemplate, title) => {
    return HTMLTemplate.replace("<title>",`<title>${title}`);
}

const updateMeta = (/** @type {string} */ html, /** @type {string} */ keywords, /** @type {string} */ description, /** @type {string} */ author) => {
    // 匹配标题正则
    return html.replace("<body>",`
        <meta name ="keywords" content="${keywords}">
        <meta name ="description" content="${description}">
        <meta name="author" content="${author}"></body>
    `);

}


// 初始化 SSR HTML数据
/**
 * 
 * @param {string} url 当前路由的路径 
 * @param {string} lang 默认的语返回的语言
 * @returns 
 */
export const initSSRHTML = async (url, lang) => {
    const dataUrl = getUrl(url);
    let i18nData = JSON.parse(JSON.stringify(baseData));
    
    /**
     * @type {any}
     */
    let json = {};
    
    if(dataUrl) {
        const { data: { data: data } } = await axios.get("http://localhost:" + config.port + dataUrl);
        
        /**
         * @type { any }
         */
        let obj = {};

        const i18nName = getPageI18nName(url);
    
        data.forEach((/** @type {any} */ el) => {
            const jsonData = JSON.parse(JSON.stringify(el.json));
            if(el.type == 'seoblock') {
                json = el.json && el.json[lang] || {};
    
                Object.keys(jsonData).map((elem) => {
                    // 初始化语言
                    obj[elem] = obj[elem] || {};
                    // 更新值
                    obj[elem][i18nName] = Object.assign(obj[elem][i18nName] || {}, jsonData[elem]);
                })
            }else{
                Object.keys(jsonData).map((elem) => {
                    // 初始化语言
                    obj[elem] = obj[elem] || {};
                    const assignObj = jsonData[elem];
                    // 更新值
                    obj[elem][i18nName] = Object.assign(obj[elem][i18nName] || {}, {[el.type]: assignObj});
                })
            }
        });

        for(let key in i18nData) {
            // @ts-ignore
            i18nData[key] = Object.assign(i18nData[key], obj[key]);
        };
    };

    const { app, routes, store, i18n } = createApp(i18nData, lang);
    
    // 设置服务器端 router 的位置
    routes.push(url);

    // 初始化数据
    let initData = getInitData();
    
    // 初始化页面标题
    let pageTitle =  json.title;
    let keywords = json.keywords; 
    let description = json.description; 
    let author = json.author;
    // @ts-ignore
    await new Promise((resolve, reject) => {
        routes.isReady().then(async () => {
            resolve('')
        }).catch(reject)
    });
    
    app._props = {
        initData
    };

    let html = await renderToString(app);
    html = HTMLTemplate.replace(`<div id="app" data-server-rendered="true"></div>`, `<div id="app" data-server-rendered="true">${html}</div>`);;
    if(pageTitle) {
        html = updateTitle(html, pageTitle);
        html = updateMeta(html, keywords, description, author);
    };
    const htmlStr = updateInitStore(html, store, initData, i18nData, lang);
    
    return htmlStr;
}