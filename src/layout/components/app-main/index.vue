<template>
	<RouterView v-slot="{ Component, route }">
		<!-- <KeepAlive :include=""> -->
		<component :is="Component" :key="route.path" class="content"> </component>
		<!-- </KeepAlive> -->
		<!-- </KeepAlive> -->
	</RouterView>
</template>
<script lang="ts" setup>
// console.log(">>>>", route.path);
</script>
<style lang="scss">
.content {
	background-color: var(--el-color-primary-light-9);
	height: calc(100vh - 50px);
	padding: 10px;
}
</style>
