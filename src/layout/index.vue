<template>
	<div>
		<el-container>
			<el-aside>
				<Menu></Menu>
			</el-aside>
			<el-container>
				<el-header> header </el-header>
				<el-main> main </el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import Menu from "./ components/Menu/index.vue";
</script>

<style lang="scss" scoped></style>
