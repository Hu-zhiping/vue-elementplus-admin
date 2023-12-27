<template>
	<div class="h-full app-menu">
		<el-scrollbar class="h-full w-full">
			<el-menu :active-menu="activeMenu" router :collapse="isCollapse">
				<Sidebaritem v-for="item in menuList" :key="item.path" :item="item" :base-path="item.path"> </Sidebaritem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script lang="ts" setup>
import Sidebaritem from "./sidebaritem.vue";
import useMenuStore from "@/store/modules/menu";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const menuStore = useMenuStore();
// menuStore.generateRoute();
const { menuList } = storeToRefs(menuStore);

const route = useRoute();
const activeMenu = computed(() => {
	return route.meta?.activeMenu ?? route.path;
});

import useAppStore from "@/store/modules/app";

const appStore = useAppStore();

const isCollapse = computed(() => {
	return appStore.isCollapse;
});
</script>

<style lang="scss" scoped>
.app-menu {
	height: calc(100% - 50px);

	:deep(.el-menu) {
		border-right: none;

		&.el-menu--popup,
		&.el-menu--collapse {
			.el-menu-item,
			.el-sub-menu {
				&.is-active {
					.el-sub-menu__title {
						color: var(--el-menu-active-color);
					}
				}
			}
		}

		&:not(.el-menu--collapse) {
			.el-menu-item {
				border-right: 3px solid var(--el-menu-bg-color);

				&.is-active {
					background-color: var(--el-color-primary-light-9);
					border-color: var(--el-menu-active-color);
				}
			}

			.el-sub-menu {
				&.is-active.is-opened {
					> .el-sub-menu__title {
						color: var(--el-menu-active-color);
					}
				}
			}
		}

		.el-menu-item,
		.el-sub-menu__title {
			transition: background-color 0.25s ease;

			&:hover {
				background-color: #f7f8fa;
				border-color: transparent;
			}
		}
	}
}
</style>
