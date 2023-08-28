import type { MockMethod } from "vite-plugin-mock";
import Mock from "mockjs";

const mock: Array<MockMethod> = [
	{
		url: "/api/admin/login",
		method: "post",
		statusCode: 200,
		response: () => {
			return {
				code: 0,
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
				code: 0,
				message: "请求成功",
				data: [
					{
						id: "1",
						path: "/system",
						name: "system",
						component: "Layout",
						redirect: "menu",
						meta: {
							title: "系统设置",
							icon: "system",
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
									icon: "menu",
									hidden: false
								}
							}
						]
					}
				]
			};
		}
	}
];

export default mock;
