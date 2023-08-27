import { getMenuList } from "@/api/user";
import { defineStore } from "pinia";

import router from "@/router";

const modules = import.meta.glob("../../views/**/**.vue");

const Layout = () => import("@/layout/index.vue");

const useMenuStore = defineStore("menu", {
	state: () => ({
		menuList: []
	}),
	actions: {
		async generateRoute() {
			const { data } = await getMenuList();
			this.menuList = data;
			let routes = filterAsyncRouter(data);
			routes.forEach(route => {
				router.addRoute(route);
			});
		}
	}
});

// 路由生成
export const filterAsyncRouter = data => {
	data.forEach(route => {
		if (route.children?.length > 0) {
			route.component = Layout;
			filterAsyncRouter(route.children);
		} else {
			loadView(route.component);
		}
	});

	return data;
};

// 动态加载vue文件
export const loadView = view => {
	let res;
	console.log(modules);
	for (const path in modules) {
		const dir = path.split("views/")[1].split(".vue")[0];
		if (dir === view) {
			res = () => modules[path]();
		}
	}
	return res;
};
export default useMenuStore;
