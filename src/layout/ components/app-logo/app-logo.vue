<template>
	<div class="h-[50px] text-black flex items-center justify-center w-full app-logo">
		<img src="@/assets/logo.png" alt="logo" width="32" />
		<span class="title m-[10px]" v-if="!isCollapse">Hello Admin</span>
	</div>
</template>

<script lang="ts" setup>
import useAppStore from "@/store/ modules/app";

const appStore = useAppStore();

const isCollapse = computed(() => {
	return appStore.isCollapse;
});
</script>

<style lang="scss" scoped>
.app-logo {
	border-bottom: 1px solid var(--el-border-color-lighter);
}
</style>
