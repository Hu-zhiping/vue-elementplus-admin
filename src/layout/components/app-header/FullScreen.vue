<template>
	<div class="search__screen m-[10px]" @click="handleFullScreen">
		<!--			<span class="iconfont icon-fullscreen-exit" v-if="isFullScreenTag">111</span>-->
		<!--			<span class="iconfont icon-fullscreen" v-else>11</span>-->
		<el-icon>
			<FullScreen />
		</el-icon>
	</div>
</template>
<script lang="ts" setup>
import useAppStore from "@/store/modules/app.ts";
import screenfull from "screenfull";

const appStore = useAppStore();
const handleFullScreen = () => {
	// 检测当前是否全屏，如果是全屏就退出，否则就全屏
	if (screenfull.isFullscreen) {
		appStore.isFullscreen = false;
		screenfull.toggle();
	} else {
		// 进入全屏
		appStore.isFullscreen = true;
		screenfull.toggle();
	}
};
</script>

<style lang="scss" scoped>
.search__screen {
}
</style>
