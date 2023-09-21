<template>
	<div class="h-[50px] flex items-center app-header">
		<app-collapse />

		<!-- 
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="item in breadList" :key="item"><a href="/">item.name</a></el-breadcrumb-item>
		</el-breadcrumb> -->
	</div>
</template>
<script lang="ts" setup>
import appCollapse from "./app-collapse.vue";

// const breadList = ref([]);
</script>
<style>
.app-header {
	border: 1px solid var(--el-border-color-lighter);
}
</style>
