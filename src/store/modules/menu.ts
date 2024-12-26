// store/modules/menu.ts
import { getMenuList } from "@/api/user";
import { defineStore } from "pinia";
import { routes } from "@/router";
import { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob("@/views/**/*.vue");
const Layout = () => import("@/layout/index.vue");

const useMenuStore = defineStore("menu", {
	state: () => ({
		dynamicRoutes: [] as RouteRecordRaw[], // 重命名为 dynamicRoutes
		staticRoutes: [] as RouteRecordRaw[], // 重命名为 staticRoutes
		combinedRoutes: [] as RouteRecordRaw[] // 重命名为 combinedRoutes
	}),
	actions: {
		async generateRoute() {
			const res = await getMenuList();
			this.dynamicRoutes = filterRoute(res.data);
			this.staticRoutes = [...routes];
			this.combinedRoutes = [...this.staticRoutes, ...this.dynamicRoutes];
			return this.dynamicRoutes;
		}
	},
	persist: false
});

// 路由生成
export const filterRoute = (data: any) => {
	data.forEach((item: any) => {
		if (item.children?.length > 0) {
			item.component = Layout;
			item.children = filterRoute(item.children);
		} else {
			item.component = loadView(item.component);
		}
	});
	return data;
};

// 动态加载vue文件
export const loadView = (view: string) => {
	const modulePath = Object.keys(modules).find(path => path.includes(`views/${view}`));
	if (modulePath) {
		return () => modules[modulePath]();
	} else {
		console.error(`未能找到与路径 ${view} 对应的组件`);
		return null;
	}
};

export default useMenuStore;
