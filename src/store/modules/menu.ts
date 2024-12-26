import { getMenuList } from "@/api/user";
import { defineStore } from "pinia";

const modules = import.meta.glob("@/views/**/*.vue");

const Layout = () => import("@/layout/index.vue");

const useMenuStore = defineStore("menu", {
	state: () => ({
		menuList: []
	}),
	actions: {
		async generateRoute() {
			const res = await getMenuList();
			this.menuList = res.data;
			let routes = filterRoute(res.data);
			return routes;
		}
	},
	persist: false
});

// 路由生成
export const filterRoute = (data: any) => {
	data.forEach((item: any) => {
		if (item.children?.length > 0) {
			item.component = Layout;
			//delete item.component;
			item.children = filterRoute(item.children);
		} else {
			item.component = loadView(item.component);
		}
	});
	return data;
};

// 动态加载vue文件
export const loadView = (view: any) => {
	let res;
	console.log("modules", modules);
	for (const path in modules) {
		const dir = path.split("views/")[1].split(".vue")[0];
		if (dir === view) {
			res = () => modules[path]();
		}
	}
	if (!res) {
		console.error(`未能找到与路径 ${view} 对应的组件`);
	}
	return res;
};
export default useMenuStore;
