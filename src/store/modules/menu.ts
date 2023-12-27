import { getMenuList } from "@/api/user";
import { defineStore } from "pinia";

// import router from "@/router";

const modules = import.meta.glob("@/src/**/**.vue");

const Layout = () => import("@/layout/index.vue");

const useMenuStore = defineStore("menu", {
	state: () => ({
		menuList: []
	}),
	actions: {
		async generateRoute() {
			const res = await getMenuList();
			this.menuList = res.data;
			let routes = filterAsyncRouter(res.data);
			return routes;
		}
	},
	persist: true
});

// 路由生成
export const filterAsyncRouter = (data: any) => {
	data.forEach((route: any) => {
		if (route.children?.length > 0) {
			route.component = Layout;
			filterAsyncRouter(route.children);
		} else {
			route.component = loadView(route.component);
		}
	});
	return data;
};

// 动态加载vue文件
export const loadView = (view: any) => {
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
