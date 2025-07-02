<template>
  <main class="app-main" role="main" aria-label="主内容区域">
    <RouterView v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component 
            :is="Component" 
            :key="route.path" 
            class="app-main__component"
          />
        </keep-alive>
      </transition>
    </RouterView>
  </main>
</template>

<script lang="ts" setup>
// AppMain组件负责渲染路由视图
// 使用keep-alive保持组件状态，避免重复渲染
</script>

<style lang="scss" scoped>
.app-main {
  background-color: var(--el-bg-color-page, #f2f3f5);
  height: calc(100vh - 50px);
  padding: 16px;
  overflow-y: auto;
  
  &__component {
    min-height: 100%;
  }
}

// 页面切换动画
:deep(.fade-enter-active),
:deep(.fade-leave-active) {
  transition: opacity 0.3s ease;
}

:deep(.fade-enter-from),
:deep(.fade-leave-to) {
  opacity: 0;
}
</style>