<template>
	<Logo></Logo>
	<div class="h-full wrap-scroll">
		<el-scrollbar class="h-full">
			<el-menu class="grid" :active-menu="activeMenu" router>
				<Sidebaritem v-for="item in menuList" :key="item.path" :item="item" :base-path="item.path"> </Sidebaritem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import Sidebaritem from "./sidebaritem.vue";
import Logo from "./Logo.vue";
import useMenuStore from "@/store/ modules/menu";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const menuStore = useMenuStore();
// menuStore.generateRoute();
const { menuList } = storeToRefs(menuStore);

const route = useRoute();
const activeMenu = computed(() => route.meta?.activeMenu ?? route.path);
</script>

<style>
.wrap-scroll {
	height: calc(100%-50px);
}
</style>
