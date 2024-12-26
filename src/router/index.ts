import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录",
			hidden: true
		}
	},
	{
		path: "/",
		component: () => import("@/layout/index.vue"),
		redirect: "dashboard",
		meta: { title: "监控页", icon: "Menu" },
		children: [
			{
				path: "dashboard",
				name: "dashboard",
				component: () => import("@/views/dashboard/index.vue"),
				meta: {
					hidden: false,
					title: "首页",
					icon: "HomeFilled"
				}
			}
		]
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notMatch",
		redirect: "/404",
		meta: { title: "404", hidden: true }
	},
	{
		path: "/404",
		name: "NotFound",
		component: () => import("@/views/404.vue"),
		meta: { title: "404", hidden: true }
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
