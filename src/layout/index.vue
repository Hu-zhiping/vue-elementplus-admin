<template>
  <div class="app-layout">
    <aside 
      class="app-layout__sidebar" 
      :class="{ 'app-layout__sidebar--collapsed': isCollapse }"
      aria-label="侧边导航"
    >
      <SideBar />
    </aside>
    <div class="app-layout__content">
      <header class="app-layout__header">
        <NavBar />
      </header>
      <main class="app-layout__main">
        <AppMain />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 组件导入
import NavBar from "@/layout/components/NavBar/index.vue";
import AppMain from "@/layout/components/AppMain/index.vue";
import SideBar from "@/layout/components/SideBar/index.vue";

// Store导入
import useAppStore from "@/store/modules/app";

const appStore = useAppStore();

const isCollapse = computed(() => {
  return appStore.isCollapse;
});
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  width: 100%;
  height: 100%;
  
  &__sidebar {
    width: 200px;
    height: 100vh;
    overflow: hidden;
    background-color: var(--el-bg-color-overlay);
    border-right: 1px solid var(--el-border-color-lighter);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &--collapsed {
      width: 64px;
    }
  }
  
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &__header {
    width: 100%;
  }
  
  &__main {
    flex: 1;
    overflow: auto;
    padding: 16px;
  }
}
</style>