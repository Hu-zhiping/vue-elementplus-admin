import http from "@/utils/request.ts";

export const doLogin = () => {
	return http.post("/admin/login", {});
};
