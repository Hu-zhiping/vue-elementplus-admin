import { setToken } from "@/api/user";
import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
	state: () => ({
		token: ""
	}),
	actions: {
		getToken(data: string) {
			this.token = data;
			setToken(data);
		}
	},
	persist: true
});

export default useUserStore;
