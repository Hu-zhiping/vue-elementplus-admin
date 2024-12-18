<template>
	<el-sub-menu v-if="props.item.children?.length" :index="props.item.path" :key="props.item.id">
		<template #title>
			<component class="w-[15px] mr-2 ml-1" :is="props.item.meta?.icon" />
			<span>{{ props.item.meta.title }}</span>
		</template>
		<SideBarItem v-for="i in props.item.children" :key="i.id" :item="i"> </SideBarItem>
	</el-sub-menu>

	<el-menu-item v-else :index="getDealPath(props.item.path)">
		<div class="item">
			<el-icon><component :is="props.item.meta?.icon" /> </el-icon>
			<span>{{ props.item.meta.title }}</span>
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

// 截取子菜单完整路径
const getDealPath = (path: string) => {
	if (!path) return "";
	const pathArr = path.split("/");
	return pathArr.slice(-1)[0];
};
</script>

<style lang="scss">
.item {
	line-height: 22px;
	padding: 9px 80px 9px 16px;
}
</style>
