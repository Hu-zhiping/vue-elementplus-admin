<template>
	<div class="flex">
		<div class="h-screen">
			<SideBar />
		</div>
		<div class="flex-1 overflow-auto">
			<NavBar />
			<AppMain />
		</div>
	</div>

	<!--	<div class="h-full flex" :style="layoutStyle">-->
	<!--		<div class="h-full app-layout-sider w-[200px]">-->
	<!--			<app-logo></app-logo>-->
	<!--			<app-menu></app-menu>-->
	<!--		</div>-->

	<!--		<div class="flex flex-col flex-1">-->
	<!--			<app-header />-->
	<!--			<app-main />-->
	<!--		</div>-->
	<!--	</div>-->
</template>

<script lang="ts" setup>
import NavBar from "@/layout/components/NavBar/index.vue";
import AppMain from "@/layout/components/AppMain/index.vue";
import SideBar from "@/layout/components/SideBar/index.vue";
// import AppLogo from "@/layout/components/app-logo/app-logo.vue";

// import useAppStore from "@/store/modules/app";

// const appStore = useAppStore();

// const isCollapse = computed(() => {
// 	return appStore.isCollapse;
// });

// const layoutStyle = computed(() => {
// 	return {
// 		"--app-aside-width": appStore.isCollapse ? "64px" : "200px"
// 	};
// });
</script>

<style lang="scss" scoped>
.app-layout-sider {
	width: var(--app-aside-width);
	height: 100vh;
	overflow: hidden;
	background-color: var(--el-bg-color-overlay);
	transition: width 0.3s ease-in-out;
	border-right: 1px solid var(--el-border-color-lighter);
}
</style>
