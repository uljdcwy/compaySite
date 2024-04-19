import { createApp } from 'vue';
// @ts-ignore
import aLink from "@/components/aLink/index.vue";
// @ts-ignore
import App from "@/admin.vue";
import { adminRouter } from '@/router'
import { store } from '@/store';
import { getAdminI18n } from "@/vueI18n/index";
import { createDiscreteApi } from "naive-ui";
import "@/scss/reset.scss";


document.body.onload = function () {
	const { message, notification, dialog, loadingBar } = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar']);
	
    const app = createApp(App);
    const routes = adminRouter();
    const i18n = getAdminI18n();
    app.component('aLink',aLink);
    app.use(i18n);
    app.use(store);
    app.use(routes);

	window.message = message;
	window.notification = notification;
	window.dialog = dialog;
	window.loadingBar = loadingBar;

	window.i18n = i18n;

    // @ts-ignore
    let vm = app.mount('#app')
};

/*#__PURE__*/ moduleHot()

function /*#__PURE__*/ moduleHot() {
	console.log("开始热替换 admin")
	// @ts-ignore
	if (module?.hot) {
		// @ts-ignore
		module.hot.accept();
		// 热替换完成后逻辑
		// @ts-ignore
		module?.hot.dispose(function() {
		});
	}
}
