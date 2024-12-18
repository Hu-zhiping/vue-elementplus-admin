import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue")
	},
	{
		path: "/",
		component: () => import("@/layout/index.vue"),
		// redirect: "/dashboard",
		children: [
			{
				path: "/dashboard",
				name: "dashboard",
				component: () => import("@/views/dashboard/index.vue"),
				meta: {
					hidden: false,
					title: "首页"
				}
			}
		]
	},
	{
		path: "/:pathMatch(.*)*",
		name: "notMatch",
		redirect: "/404"
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
