<template>
	<el-sub-menu v-if="props.item.children?.length" :index="props.item.path" :key="props.item.id">
		<template #title>
			<span>{{ props.item.meta.title }}</span>
		</template>
		<sidebaritem v-for="i in props.item.children" :key="i.id" :item="i"> </sidebaritem>
	</el-sub-menu>
	<el-menu-item v-else :index="props.item.path">
		<span>{{ props.item.meta.title }}</span>
	</el-menu-item>
</template>

<script lang="ts" setup>
type Props = {
	item: any;
};

const props = defineProps<Props>();

// 截取子菜单完整路径
// const getFullPath = (baseUrl: string, url: string) => {
// 	let rootUrl;
// 	let path;
// 	rootUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
// 	if (url.startsWith("/")) {
// 		path = url;
// 	} else {
// 		path = `${rootUrl}${url}`;
// 	}
// 	console.log(path);
// 	return path;
// };
</script>

<style></style>
