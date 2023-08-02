import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

const config = {
	baseURL: "/api",
	timeout: 10000
};

export class Http {
	private instance: AxiosInstance;

	constructor(config: { baseURL: string; timeout: number }) {
		this.instance = axios.create(config);
		this.setInterceptors();
	}

	// 设置拦截器
	setInterceptors(): void {
		// 默认的config不能传入任何拦截器，所以此处需要使用InternalAxiosRequestConfig
		this.instance.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				// 在请求发送前可以做一些处理，例如在请求头中添加认证信息等
				config.headers["Authorization"] = "Bearer ";
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);

		this.instance.interceptors.response.use(
			(response: AxiosResponse<any>) => {
				const { data } = response;
				if (data.code && data.code != 0) {
					ElMessage.error("网络请求失败");
				}
				// 在这里可以对响应数据做一些处理
				return data;
			},
			error => {
				// 在这里处理请求错误，例如根据错误状态码进行不同的处理
				if (error.statusCode === 500) {
					ElMessage.error("服务器异常");
				}

				return Promise.reject(error);
			}
		);
	}

	// GET 请求
	get<T>(url: string, params?: Object): Promise<T> {
		return this.instance.get(url, { params });
	}

	// POST 请求
	post<T>(url: string, data: Object): Promise<T> {
		return this.instance.post(url, data);
	}

	// PUT 请求
	put<T>(url: string, data: Object): Promise<T> {
		return this.instance.put(url, data);
	}

	// DELETE 请求
	delete<T>(url: string): Promise<T> {
		return this.instance.delete(url);
	}
}

export default new Http(config);
