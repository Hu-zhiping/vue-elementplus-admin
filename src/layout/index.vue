<template>
	<div class="h-full flex">
		<div class="h-full w-200">
			<Sidebar></Sidebar>
		</div>

		<div class="flex flex-col flex-1">
			<Header />
			<Appmain />
		</div>
	</div>
</template>

<script lang="ts" setup>
import Header from "./ components/header.vue";
import Appmain from "./ components/app-main.vue";
import Sidebar from "./ components/sidebar.vue";
</script>

<style lang="scss" scoped></style>
