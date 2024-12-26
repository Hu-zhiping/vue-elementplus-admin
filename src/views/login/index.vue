<template>
	<el-row class="login-layout">
		<el-col :lg="16" :md="12" class="login-left-panel">
			<div class="left-panel-content">11111111111111111</div>
		</el-col>
		<el-col :lg="8" :md="12" class="login-right-panel">
			<LoginForm />
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
import LoginForm from "@/views/login/components/LoginForm.vue";
</script>

<style scoped lang="scss">
.login-layout {
	position: relative;
	height: 100vh;

	.login-left-panel {
		position: relative;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.login-right-panel {
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
