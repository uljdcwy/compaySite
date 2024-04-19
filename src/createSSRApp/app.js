import { createSSRApp } from 'vue';
// @ts-ignore
import aLink from "@/components/aLink/index.vue";
// @ts-ignore
import App from "@/app.vue";
import { router } from '@/router'
import { store } from '@/store';
import { getI18n } from "@/vueI18n/index"

export const createApp = (data = {}, /** @type {string} */ lang) => {
    const app = createSSRApp(App);
    const routes = router();
    const i18n = getI18n(lang, data);
    app.component('aLink',aLink);
    app.use(i18n);
    app.use(store);
    app.use(routes);

    return { app, routes, store, i18n }
}
