import router from "@/router/index.ts";
import { getToken } from "@/api/user.ts";
import useMenuStore from "@/store/modules/menu.ts";
import { start, close } from "@/utils/nprogress.ts";
import { RouteLocationNormalized } from "vue-router";

const whiteList = ["/", "/login"];
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
	start();
	if (getToken()) {
		if (to.path === "/login") {
			next({ path: "/" });
		} else {
			const menuStore = useMenuStore();
			if (!menuStore.asyncRoutes.length) {
				let routes;
				// 优先使用持久化的菜单数据
				if (menuStore.menuList.length) {
					routes = menuStore.reprocessRoutes();
				} else {
					routes = await menuStore.fetchMenuList();
				}
				
				// 添加路由
				routes.forEach((route: any) => {
					router.addRoute(route);
				});

				// 如果是从其他页面重定向来的，返回原页面
				if (to.redirectedFrom) {
					next({ path: to.redirectedFrom.fullPath, replace: true });
				} else {
					next({ ...to, replace: true });
				}
			} else {
				next();
			}
		}
	} else {
		if (whiteList.indexOf(to.path) > -1) {
			next();
		} else {
			next({ path: "/login" });
		}
	}
});
router.afterEach(() => {
	close();
});