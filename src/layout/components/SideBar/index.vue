<template>
	<div class="h-[100%] ransition-width duration-100 ease-linear border-solid border-r-[3px] border-gray-200 box-border">
		<div class="h-[50px] text-black flex items-center justify-center">
			<span v-if="appStore.isCollapse">A</span>
			<span v-else>HelloAdmin</span>
		</div>
		<el-scrollbar class="wrap-scroll">
			<el-menu :collapse="appStore.isCollapse" :router="true">
				<SidebarItem v-for="item in menuList" :key="item.path" :item="item" :base-path="item.path"> </SidebarItem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import SidebarItem from "./SideBarItem.vue";
import useMenuStore from "@/store/modules/menu.ts";
import { storeToRefs } from "pinia";
// import { useRoute } from "vue-router";
const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);

// const route = useRoute();
// const activeMenu = computed(() => {
// 	return route.meta?.activeMenu ?? route.path;
// });

import useAppStore from "@/store/modules/app.ts";

const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.wrap-scroll {
	height: calc(100vh - 50px);
}
</style>
