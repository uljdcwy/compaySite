import { createRouter, createWebHashHistory, createMemoryHistory, createRouterMatcher, createWebHistory } from "vue-router";
import { isClient, importVueFail } from "@/utils/utils";
import { getData } from "@/utils/getI18nData";
import { getPageI18nName } from "@/utils/getI18nData.js"
// @ts-ignore
import page404 from "@/components/404/index.vue";

// @ts-ignore
const index = () => import("@/views/index.vue").catch(importVueFail);
// @ts-ignore
const about = () => import("@/views/about.vue").catch(importVueFail);
// @ts-ignore
const products = () => import("@/views/products.vue").catch(importVueFail);
// @ts-ignore
const snake = () => import("@/components/threeJs/snake.vue").catch(importVueFail);
// @ts-ignore
const drawLine = () => import("@/components/threeJs/drawLine.vue").catch(importVueFail);
// @ts-ignore
const drawText = () => import("@/components/threeJs/drawText.vue").catch(importVueFail);
// @ts-ignore
const animate = () => import("@/components/threeJs/animate.vue").catch(importVueFail);
// @ts-ignore
const parkingLot = () => import("@/components/threeJs/parkingLot.vue").catch(importVueFail);


const routes = [
    { path: '/', name: "index", component: index },
    { path: '/about', name: "about", component: about },
    { path: '/products', name: "products", component: products },
    { path: '/snake', name: "snake", component: snake },
    { path: '/drawLine', name: "drawLine", component: drawLine },
    { path: '/drawText', name: "drawText", component: drawText },
    { path: '/animate', name: "animate", component: animate },
    { path: '/parkingLot', name: "parkingLot", component: parkingLot },
    { path: '/:catchAll(.*)', name: '404', component: page404 }
];


export const router = () => {
    let isClientStatus = isClient();
    let routers = createRouter({
        history: isClientStatus ? createWebHistory() : createMemoryHistory(),
        routes,
    });
    if (isClientStatus) {
        /**
         * @type {any}
         */
        const i18nData = {};
        routers.beforeEach(async (to, from, next) => {
            const messages = JSON.parse(JSON.stringify(window.i18n.global.messages));
            let defaultLang = Object.keys(messages)[0];
            /**
             * @type {string}
             */
            let lang = defaultLang;;
            if (to.query.lang) {
                lang = to.query.lang.toString();
                localStorage.setItem("lang", lang);
                defaultLang = lang;
            };

            // @ts-ignore
            const toI18nName = getPageI18nName(to.path);
            console.log(toI18nName,"toI18nName", to.path)
            if (messages[defaultLang][toI18nName] || process.env.NODE_ENV == "development") {
                window.i18n.global.locale = lang;
                try{document.title = messages[defaultLang][toI18nName].title;}catch(e){}
                next();
            } else if(toI18nName) {
                getData(to.name).then((res) => {
                    /** @type {any} */
                    let mergeData = {};
                    // @ts-ignore
                    res.data.data.forEach((el, idx) => {
                        let json = el.json;
                        Object.keys(json).map((elem, idx) => {
                            if(el.type == 'seoblock') {
                                Object.keys(json).map((elem) => {
                                    // 初始化语言
                                    mergeData[elem] = mergeData[elem] || {};
                                    // 更新值
                                    mergeData[elem][toI18nName] = Object.assign(mergeData[elem][toI18nName] || {}, json[elem]);
                                })
                            }else{
                                mergeData[elem] = mergeData[elem] || {};
                                mergeData[elem][toI18nName] = mergeData[elem][toI18nName] || {};
                                // 语言类型默认两个
                                mergeData[elem][toI18nName][el.type] = json[elem];
                            }
                        });
                        
                    });

                    console.log(mergeData,"mergeData")

                    // @ts-ignore
                    Object.keys(messages).map((elem, idx) => {
                        window.i18n.global.mergeLocaleMessage(elem, mergeData[elem]);
                    });

                    try{document.title = mergeData[defaultLang][toI18nName].title;}catch(e){}
                    next();
                }).catch((err) => {
                    if (process.env.NODE_ENV == "development") {
                        next();
                        return;
                    };
                    document.title = "页面丢失了";
                    next("/404")
                });
            }else{
                document.title = "页面丢失了";
                next();
            };
        });

        routers.afterEach((to, from, next) => {
        });
    };
    return routers;
}


// @ts-ignore
const adminIndex = () => import("@/viewsAdmin/index.vue").catch(importVueFail);
// @ts-ignore
const adminAbout = () => import("@/viewsAdmin/about.vue").catch(importVueFail);
const adminRoutes = [
    { path: '/', name: "adminIndex", component: adminIndex },
    { path: '/about', name: "adminAbout", component: adminAbout },
    { path: '/:catchAll(.*)', name: '404', component: page404 }
];

export const adminRouter = () => {
    const adminRoute = createRouter({
        history: createWebHashHistory(),
        routes: adminRoutes,
    });
    return adminRoute
}


