import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router";
import "@/style/index.scss";

import pinia from "@/store";

//
// import ElementPlus from 'element-plus'
// 国际化
// import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App);
app.use(router);

app.use(pinia);
// app.use(zhCn)
app.mount("#app");
