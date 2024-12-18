<template>
	<div class="user-set">
		<div class="set-item">
			<svg-icon icon-class="GithubOutlined" size="18" color="#0e7a0d"></svg-icon>
		</div>
		<div class="set-item" @click="handleHome">
			<svg-icon icon-class="HomeOutline" size="18" color="#0e7a0d"></svg-icon>
		</div>
		<div class="set-item" @click="handleFullScreen">
			<svg-icon icon-class="OffScreen" size="18" color="#0e7a0d" v-if="appStore.isFullscreen"></svg-icon>
			<svg-icon icon-class="FullScreen" size="18" color="#0e7a0d" v-else></svg-icon>
		</div>
		<el-popover placement="bottom" :width="300" trigger="click">
			<template #reference>
				<div class="set-item">
					<svg-icon icon-class="NotificationsOutline" size="18" color="#0e7a0d"></svg-icon>
				</div>
			</template>
			<template #default>
				<el-tabs>
					<el-tab-pane label="待办" name="first">待办</el-tab-pane>
					<el-tab-pane label="消息" name="second">消息</el-tab-pane>
					<el-tab-pane label="通知" name="third">通知</el-tab-pane>
				</el-tabs>
			</template>
		</el-popover>
		<div class="set-item">
			<svg-icon icon-class="LanguageOutline" size="18" color="#0e7a0d"></svg-icon>
		</div>
		<div class="set-item">
			<el-switch v-model="value1" active-action-icon="Moon" inactive-action-icon="Moon">
				<template #active-action>
					<el-icon><Sunny /></el-icon>
				</template>
				<template #inactive-action>
					<el-icon><Moon /></el-icon>
				</template>
			</el-switch>
		</div>
		<div class="set-item" @click="handleSet">
			<svg-icon icon-class="SettingsOutline" size="18" color="#0e7a0d"></svg-icon>
		</div>
		<el-dropdown @command="handleCommand">
			<div class="set-item">
				<el-avatar :icon="UserFilled" />
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="password">用户信息</el-dropdown-item>
					<el-dropdown-item command="password">修改密码</el-dropdown-item>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
	<el-drawer v-model="drawer" title="设置" size="20%">
		<div class="demo-color-block">
			<color-picker />
		</div>
	</el-drawer>
</template>
<script lang="ts" setup>
import { Moon, Sunny, UserFilled } from "@element-plus/icons-vue";
import useAppStore from "@/store/modules/app.ts";
import screenfull from "screenfull";
import router from "@/router";
import ColorPicker from "@/layout/components/ColorPicker.vue";
const appStore = useAppStore();
const drawer = ref(false);

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

const value1 = ref(true);
const handleHome = () => {
	router.push({ name: "home" });
};

const handleSet = () => {
	drawer.value = !drawer.value;
};

const handleCommand = (command: string) => {
	if ("logout" == command) {
		localStorage.removeItem("access_token");
		router.push({
			path: "/login"
		});
	}
};
</script>
<style lang="scss" scoped>
.user-set {
	display: flex;
	height: 50px;
	flex-shrink: 0;
	margin-left: 50px;
	//设置图标颜色
	.set-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 12px;
		padding-right: 12px;
		cursor: pointer;
		flex-shrink: 0;

		.sv-icon {
			outline: none;

			svg {
				outline: none;
			}
		}
		&:hover {
			color: green;
		}

		&.hover-color {
			&:last-of-type {
				padding-right: 2px;
			}
		}
	}
}
</style>
