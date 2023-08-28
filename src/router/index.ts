import { getToken } from "@/api/user";
import useMenuStore from "@/store/ modules/menu";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue")
	},
	{
		path: "/",
		name: "index",
		redirect: "/home",
		component: () => import("@/layout/index.vue"),
		children: [
			{
				path: "home",
				name: "home",
				component: () => import("@/views/home/index.vue")
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

const whiteList = ["/", "/login"];
router.beforeEach(async (to, from, next) => {
	if (getToken()) {
		if (to.path === "/login") {
			next({ path: "/" });
		} else {
			const menuStore = useMenuStore();
			if (menuStore.menuList.length === 0) {
				const routes = await menuStore.generateRoute();
				routes.forEach(route => {
					router.addRoute(route);
					next({ ...to, replace: true });
				});
			} else {
				next();
			}
			// menuStore.generateRoute();
			// next({ ...to, replace: true });
		}
	} else {
		if (whiteList.indexOf(to.path) > -1) {
			next();
		} else {
			next({ path: "/login" });
		}
	}
});

export default router;
