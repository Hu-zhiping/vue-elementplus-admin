<template>
	<div class="h-[50px] flex items-center app-header justify-between">
		<div class="header-left">
			<app-collapse />
			<Breadcrumb />
		</div>
		<UserSet />
	</div>
</template>
<script lang="ts" setup>
import appCollapse from "./app-collapse.vue";
import Breadcrumb from "@/layout/components/app-header/Breadcrumb.vue";
import UserSet from "@/layout/components/app-header/UserSet.vue";
</script>
<style lang="scss" scoped>
.app-header {
	border: 1px solid var(--el-border-color-lighter);
	.header-left {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		min-width: 202px;
		vertical-align: middle;
	}
	.header-right {
		display: flex;
		flex: 1;
		justify-content: flex-end;
		align-content: center;
	}
}
</style>
