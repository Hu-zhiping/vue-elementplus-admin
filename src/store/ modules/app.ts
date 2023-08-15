import { defineStore } from "pinia";

const useAppStore = defineStore("appStore", {
	state: () => ({
		isCollapse: false
	}),
	getters: {},
	actions: {
		setIsCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
});

export default useAppStore;
