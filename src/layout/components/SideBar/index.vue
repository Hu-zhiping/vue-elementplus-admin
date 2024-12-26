<template>
	<div class="h-[100%] ransition-width duration-100 ease-linear border-solid border-r-[3px] border-gray-200 box-border">
		<div class="h-[50px] text-black flex items-center justify-center">
			<span v-if="appStore.isCollapse">A</span>
			<span v-else>HelloAdmin</span>
		</div>
		<el-scrollbar class="wrap-scroll">
			<el-menu :collapse="appStore.isCollapse" :router="true" :default-active="activeMenu">
				<SidebarItem v-for="item in combinedRoutes" :key="item.path" :item="item" :base-path="item.path"> </SidebarItem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import SidebarItem from "./SideBarItem.vue";
import useMenuStore from "@/store/modules/menu.ts";
const menuStore = useMenuStore();
const { combinedRoutes } = menuStore;
const route = useRoute();
const activeMenu = computed(() => {
	return route.path;
});

import useAppStore from "@/store/modules/app.ts";

const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.wrap-scroll {
	height: calc(100vh - 50px);
}

// 添加以下样式以消除展开与折叠时的边框痕迹
.el-menu {
	border-right: none; // 移除右侧边框
}

.el-menu--collapse {
	border-right: 3px solid transparent; // 折叠状态下的透明边框
}
</style>
