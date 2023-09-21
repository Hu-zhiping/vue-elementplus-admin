import { defineStore } from "pinia";

const useAppStore = defineStore("appStore", {
	state: () => ({
		isCollapse: false, //是否折叠
		allMenus: [], //所有菜单
		showMenus: [], //渲染菜单
		paths: [], //路由路径
		tabs: [], //标签页
		useInfo: []
	}),
	getters: {},
	actions: {
		setIsCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
});

export default useAppStore;
