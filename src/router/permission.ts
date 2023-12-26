import router from "@/router/index.ts";
import { getToken } from "@/api/user.ts";
import useMenuStore from "@/store/ modules/menu.ts";
import { start, close } from "@/utils/nprogress.ts";

const whiteList = ["/", "/login"];
router.beforeEach(async (to, from, next) => {
	start();
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
router.afterEach(() => {
	close();
});
