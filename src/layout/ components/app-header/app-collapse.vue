<template>
	<div class="flex items-center h-full py-[0px] px-[10px] cursor-pointer app-collapse">
		<el-icon @click="handleCollapse">
			<Fold v-if="isCollapse" />
			<Expand v-else />
		</el-icon>
	</div>
</template>

<script setup lang="ts">
import useAppStore from "@/store/ modules/app";
const appStore = useAppStore();
const isCollapse = computed(() => {
	return !appStore.isCollapse;
});

const handleCollapse = () => {
	appStore.setIsCollapse();
};
</script>

<style lang="scss" scoped>
.app-collapse {
	transition: all 0.25s;
}
</style>
