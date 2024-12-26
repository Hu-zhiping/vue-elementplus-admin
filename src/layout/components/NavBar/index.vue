<script setup lang="ts">
import useAppStore from "@/store/modules/app";
import { Expand, Fold, Sunny, Moon, UserFilled } from "@element-plus/icons-vue";
import router from "@/router";
import ColorPicker from "@/layout/components/ColorPicker.vue";
import BreadCrumb from "@/layout/components/NavBar/BreadCrumb.vue";
const value1 = ref<string>("light");
const appStore = useAppStore();

const drawer = ref(false);
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

<template>
	<div class="h-[50px] flex justify-between items-center">
		<div class="flex justify-center items-center p-2">
			<div class="mr-4" @click="appStore.isCollapse = !appStore.isCollapse">
				<Fold v-if="!appStore.isCollapse" class="w-6 cursor-pointer" />
				<Expand v-else class="w-6 cursor-pointer" />
			</div>
			<div class="flex-grow p-2">
				<BreadCrumb />
			</div>
		</div>
		<div class="flex justify-center items-center">
			<div class="flex-grow p-2">
				<el-switch v-model="value1" :active-value="true" :inactive-value="false">
					<template #active-action>
						<el-icon>
							<Moon />
						</el-icon>
					</template>
					<template #inactive-action>
						<el-icon>
							<Sunny />
						</el-icon>
					</template>
				</el-switch>
			</div>

			<div class="flex-grow p-2" @click="handleSet">
				<el-icon><Setting /></el-icon>
			</div>

			<div class="flex-grow p-2">
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
		</div>
	</div>

	<el-drawer v-model="drawer" title="设置" size="20%">
		<div class="demo-color-block">
			<color-picker />
		</div>
	</el-drawer>
</template>

<style scoped lang="scss"></style>
