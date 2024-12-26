<template>
	<div class="app-main">
		<RouterView v-slot="{ Component, route }">
			<transition name="fade" mode="out-in">
				<div>
					<KeepAlive>
						<component :is="Component" :key="route.path"> </component>
					</KeepAlive>
				</div>
			</transition>
		</RouterView>
	</div>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.app-main {
	background-color: rgba(242, 243, 245, 1);
	height: calc(100vh - 50px);
	padding: 10px;
}
</style>
