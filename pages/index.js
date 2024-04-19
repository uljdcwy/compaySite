import { createApp } from "@/createSSRApp/app.js"
import "@/scss/customize.scss";
import "@/scss/theme.scss";
// import VConsole from 'vconsole';

if(process.env.NODE_ENV == "development"){
	window._INIT_LANG_ = "zh"
	// const vConsole = new VConsole();
}



document.body.onload = function () {

	const { app, routes, store, i18n } = createApp();

	window.i18n = i18n;

	routes.isReady().then(() => {
		// @ts-ignore
		let vm = app.mount('#app')
	})

};

/*#__PURE__*/ moduleHot()

function /*#__PURE__*/ moduleHot() {
	console.log("开始热替换 index")
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
