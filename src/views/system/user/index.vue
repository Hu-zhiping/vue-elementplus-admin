<template>
	<el-form :inline="true" :mode="searchForm">
		<el-form-item label="用户名:">
			<el-input v-model="searchForm.username"></el-input>
		</el-form-item>
		<el-form-item label="密码:">
			<el-input></el-input>
		</el-form-item>
	</el-form>

	<el-table :data="tableData" style="width: 100%">
		<el-table-column prop="date" label="Date" width="180" />
		<el-table-column prop="name" label="Name" width="180" />
		<el-table-column prop="address" label="Address" />
	</el-table>
</template>

<script setup lang="ts">
const searchForm = reactive({
	username: "",
	password: ""
});

const tableData = [
	{
		date: "2016-05-03",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-02",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-04",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	},
	{
		date: "2016-05-01",
		name: "Tom",
		address: "No. 189, Grove St, Los Angeles"
	}
];
</script>

<style lang="scss" scoped></style>
