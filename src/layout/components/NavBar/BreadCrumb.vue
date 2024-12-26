<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<template v-for="item in breadcrumbList" :key="item">
			<el-breadcrumb-item :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
		</template>
	</el-breadcrumb>
</template>

<script setup lang="ts">
const route = useRoute();
const breadcrumbList = computed(() => {
	console.log("调试路由信息", route.matched);
	return route.matched.filter(item => item.meta && item.meta.title);
});
</script>

<style lang="scss" scoped></style>
