<template>
	<div class="h-[50px] flex items-center">
		<el-icon :size="24" @click="handleCollapse">
			<Fold v-if="isCollapse" />
			<Expand v-else />
		</el-icon>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>
<script lang="ts" setup>
import useAppStore from "@/store/ modules/app";
const appStore = useAppStore();
const isCollapse = computed(() => {
	return !appStore.isCollapse;
});

const handleCollapse = () => {
	appStore.setIsCollapse();
};
</script>
<style></style>
