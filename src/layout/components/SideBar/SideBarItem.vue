<template>
	<el-sub-menu v-if="hasChildren" :index="props.item.path" :key="props.item.path">
		<template #title>
			<el-icon><component :is="props.item.meta?.icon" /></el-icon>
			<span>{{ props.item.meta?.title }}</span>
		</template>
		<SideBarItem v-for="i in props.item.children" :key="i.id" :item="i" :base-path="props.item.path"> </SideBarItem>
	</el-sub-menu>

	<el-menu-item v-else-if="!isHidden" :index="resolvePath(props.basePath, props.item.path)">
		<div class="item">
			<el-icon><component :is="props.item.meta?.icon" /> </el-icon>
			<span>{{ props.item.meta?.title }}</span>
		</div>
	</el-menu-item>
</template>

<script lang="ts" setup>
const props = defineProps({
	item: {
		type: Object,
		default: null
	},
	basePath: {
		type: String,
		default: null
	}
});

// 计算属性
const hasChildren = computed(() => props.item.children?.length > 0 && !props.item.meta?.hidden);
const isHidden = computed(() => props.item.meta?.hidden);

// 截取子菜单完整路径
const resolvePath = (basePath: string, path: string) => {
	let baseUrl;
	let url;
	baseUrl = basePath.endsWith("/") ? basePath : `${basePath}/`;
	if (path.startsWith("/")) {
		url = path;
	} else {
		url = `${baseUrl}${path}`;
	}
	console.log(url);
	return url;
};
</script>

<style lang="scss">
.item {
	line-height: 22px;
	padding: 9px 80px 9px 16px;
	display: flex;
	align-items: center;
}
</style>
