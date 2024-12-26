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
			if (menuStore.dynamicRoutes.length === 0) {
				const routes = await menuStore.generateRoute();
				routes.forEach((route: any) => {
					router.addRoute(route);
				});
				if (to.redirectedFrom != undefined) {
					next({ path: to.redirectedFrom?.fullPath, replace: true });
				} else {
					next({ ...to, replace: true });
				}
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
router.afterEach(() => {
	close();
});
