import type { MockMethod } from "vite-plugin-mock";
export default [
	{
		url: "/api/admin/login",
		method: "post",
		statusCode: 200,
		response: () => {
			return {
				code: 200,
				message: "请求成功",
				data: {
					token: "ASKS99WH7828JAU89892I0A6Y2802J",
					userInfo: {
						username: "张三",
						nickname: "晚风"
					}
				}
			};
		}
	},
	{
		url: "/api/admin/getMenuList",
		method: "post",
		statusCode: 200,
		response: () => {
			return {
				code: 200,
				message: "请求成功",
				data: [
					{
						id: "1",
						path: "/system",
						name: "system",
						component: "Layout",
						redirect: "/system/menu",
						meta: {
							title: "系统设置",
							icon: "Tools",
							hidden: false
						},
						children: [
							{
								id: "2",
								path: "menu",
								name: "menu",
								component: "system/menu/index",
								meta: {
									title: "菜单列表",
									icon: "Menu",
									hidden: false
								}
							},
							{
								id: "3",
								path: "user",
								name: "user",
								component: "system/user/index",
								meta: {
									title: "用户管理",
									icon: "UserFilled",
									hidden: false,
									activeMenu: "/system/menu"
								}
							}
						]
					}
				]
			};
		}
	}
] as MockMethod[];
