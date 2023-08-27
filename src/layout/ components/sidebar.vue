<template>
	<Logo></Logo>
	<div class="h-full wrap-scroll">
		<el-scrollbar class="h-full">
			<el-menu class="grid" :active-menu="activeMenu">
				<Sidebaritem v-for="item in menuList" :key="item.path" :item="item"> </Sidebaritem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import Sidebaritem from "./sidebaritem.vue";
import Logo from "./Logo.vue";
import useMenuStore from "@/store/ modules/menu";
import { storeToRefs } from "pinia";
import router from "@/router";
import { useRoute } from "vue-router";
const menuStore = useMenuStore();
menuStore.generateRoute();
const { menuList } = storeToRefs(menuStore);

console.log(router);

console.log(menuList);

const route = useRoute();
debugger;
const activeMenu = computed(() => route.meta?.activeMenu ?? route.path);

// const menuList = reactive([
// 	{
// 		path: "/dd",
// 		name: "父菜单",
// 		// component: () => import("@/views/dd/index.vue")
// 		children: [
// 			{
// 				path: "/d1",
// 				name: "父菜单1"
// 			},
// 			{
// 				path: "/d2",
// 				name: "父菜单2"
// 			}
// 		]
// 	},
// 	{
// 		path: "/dd3",
// 		name: "父菜单2",
// 		// component: () => import("@/views/dd/index.vue")
// 		children: [
// 			{
// 				path: "/d13",
// 				name: "父菜单13"
// 			},
// 			{
// 				path: "/d23",
// 				name: "父菜单23"
// 			}
// 		]
// 	}
// ]);
</script>

<style>
.wrap-scroll {
	height: calc(100%-50px);
}
</style>
