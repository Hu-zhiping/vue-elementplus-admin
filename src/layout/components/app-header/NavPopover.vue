<template>
	<el-popover placement="bottom" :width="300" trigger="click">
		<template #reference>
			<el-icon class="m-[10px]"><Bell /></el-icon>
		</template>
		<template #default>
			<el-tabs>
				<el-tab-pane label="待办" name="first">待办</el-tab-pane>
				<el-tab-pane label="消息" name="second">消息</el-tab-pane>
				<el-tab-pane label="通知" name="third">通知</el-tab-pane>
			</el-tabs>
		</template>
	</el-popover>
</template>

<script lang="ts" setup></script>
