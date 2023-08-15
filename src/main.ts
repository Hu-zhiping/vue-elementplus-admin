import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router";
import "@/style/reset.scss";
// import "@/style/style.scss";
import "@/style/index.css";

import pinia from "@/store";

//
// import ElementPlus from 'element-plus'
// 国际化
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

app.use(router);

app.use(pinia);
// app.use(zhCn)
app.mount("#app");
