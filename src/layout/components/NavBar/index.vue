<script setup lang="ts">
import useAppStore from "@/store/modules/app";
import { Expand, Fold } from "@element-plus/icons-vue";
const appStore = useAppStore();
</script>

<template>
	<div class="h-[50px] items-center box-border shadow-sm p-2">
		<div class="mr-4" @click="appStore.isCollapse = !appStore.isCollapse">
			<Fold v-if="!appStore.isCollapse" class="w-6 cursor-pointer" />
			<Expand v-else class="w-6 cursor-pointer" />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
