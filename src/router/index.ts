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
