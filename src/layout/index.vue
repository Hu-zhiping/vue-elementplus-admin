<template>
	<div class="h-full flex" :style="layoutStyle">
		<div class="h-full app-layout-sider">
			<app-logo></app-logo>
			<app-menu></app-menu>
		</div>

		<div class="flex flex-col flex-1">
			<app-header />
			<app-main />
		</div>
	</div>
</template>

<script lang="ts" setup>
import AppHeader from "./ components/app-header/index.vue";
import AppMain from "./ components/app-main/index.vue";
import AppMenu from "./ components/app-menu/index.vue";
import AppLogo from "./ components/app-logo/app-logo.vue";

import useAppStore from "@/store/ modules/app";

const appStore = useAppStore();

// const isCollapse = computed(() => {
// 	return appStore.isCollapse;
// });

const layoutStyle = computed(() => {
	return {
		"--app-aside-width": appStore.isCollapse ? "64px" : "210px"
	};
});
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
