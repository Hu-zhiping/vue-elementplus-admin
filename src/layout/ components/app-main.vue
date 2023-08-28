<template>
	<RouterView v-slot="{ Component, route }">
		<!-- <KeepAlive :include=""> -->
		<component :is="Component" :key="route.path"> </component>
		<!-- </KeepAlive> -->
	</RouterView>
</template>
<script lang="ts" setup>
// console.log(">>>>", route.path);
</script>
<style></style>
