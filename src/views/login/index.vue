<template>
	<div class="login-wrapper">
		<div class="content">
			<div class="login_left"></div>
			<div class="login_right">
				<div class="form">
					<LoginForm />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import LoginForm from "@/views/login/components/LoginForm.vue";
</script>

<style scoped lang="scss">
.login-wrapper {
	position: relative;
	height: 100%;

	.content {
		position: relative;
		margin: 0 auto;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(to left, #d3959b, #bfe6ba);

		.login_left {
			flex: 1 1 0%;
		}

		.login_right {
			flex: 1 1 0%;
			position: relative;

			.form {
				display: flex;
				max-width: 500px;
				margin: auto;
				height: 100%;
				align-items: center;
				background-color: white;
				border-radius: 10px;
			}
		}
	}
}

//.login {
//  width: 400px;
//  height: 300px;
//  border: 1px solid red;
//  display: flex;
//  flex-direction: column;
//  //justify-content: center;
//  align-items: center;
//
//  .title {
//    font-size: 20px;
//    font-weight: 500;
//    text-align: center;
//    margin-bottom: 32px;
//  }
//
//  .el-form{
//    width: 295px;
//  }
//}
</style>
