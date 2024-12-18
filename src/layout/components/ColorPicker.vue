<script setup lang="ts">
import colorTool from "@/utils/theme"; //引入方法
const color = ref<string>("#409eff");
const colorChange = (value: string) => {
	if (value) {
		color.value = value;
	}
	localStorage.setItem("COLOR", JSON.stringify(color.value));

	//设置html标签style样式变量;
	document.documentElement.style.setProperty("--el-color-primary", color.value);
	for (let i = 1; i <= 9; i++) {
		document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, colorTool.lighten(color.value, i / 10));
	}
	//透明
	document.documentElement.style.setProperty(`--el-color-primary-light-10`, color.value + 15);

	for (let i = 1; i <= 9; i++) {
		document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, colorTool.darken(color.value, i / 10));
	}
};
if (localStorage.getItem("COLOR")) {
	colorChange(JSON.parse(localStorage.getItem("COLOR") as string));
}

//默认颜色板
const predefine = ref<string[]>(["#409eff", "#009688", "#536dfe", "#ff5c93", "#c62f2f", "#fd726d"]);
</script>

<template>
	<div>主题颜色</div>
	<el-color-picker v-model="color" @change="colorChange" :predefine="predefine" />
</template>

<style scoped lang="scss"></style>
