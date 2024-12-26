<template>
	<div class="flex layout-container">
		<div class="sidebar-wrapper" :class="{ 'is-collapse': isCollapse }">
			<SideBar />
		</div>
		<div class="flex-1 main-container">
			<NavBar />
			<AppMain />
		</div>
	</div>
</template>

<script lang="ts" setup>
import NavBar from "@/layout/components/NavBar/index.vue";
import AppMain from "@/layout/components/AppMain/index.vue";
import SideBar from "@/layout/components/SideBar/index.vue";
import useAppStore from "@/store/modules/app";

const appStore = useAppStore();

const isCollapse = computed(() => {
	return appStore.isCollapse;
});
</script>

<style lang="scss" scoped>
.layout-container {
	.sidebar-wrapper {
		width: 200px;
		height: 100vh;
		overflow: hidden;
		background-color: var(--el-bg-color-overlay);
		border-right: 1px solid var(--el-border-color-lighter);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

		&.is-collapse {
			width: 64px;
		}
	}

	.main-container {
		overflow: auto;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
}
</style>
