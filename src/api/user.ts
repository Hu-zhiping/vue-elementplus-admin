import http from "@/utils/request.ts";

export const doLogin = () => {
	return http.post("/admin/login");
};

// 菜单
export const getMenuList = () => {
	return http.post("/admin/getMenuList");
};

export const setToken = (token: string) => {
	localStorage.setItem("access_token", token);
};

export const getToken = () => {
	return localStorage.getItem("token");
};
