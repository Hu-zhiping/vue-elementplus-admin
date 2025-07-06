<template>
  <div class="sidebar" :style="{styles}">
    <!-- Logo区域 -->
    <div class="sidebar__logo" @click="toggleCollapse">
      <transition name="fade" mode="out-in">
        <span v-if="!appStore.isCollapse" class="sidebar__logo-title" key="full">Admin</span>
        <span v-else class="sidebar__logo-icon" key="icon">
          <el-icon><eleme /></el-icon>
        </span>
      </transition>
    </div>

    <!-- 导航菜单 -->
    <el-scrollbar class="sidebar__scrollbar">
      <el-menu 
        :router="true" 
        class="sidebar__menu" 
        :collapse="appStore.isCollapse" 
        :default-active="activeMenu"
        :collapse-transition="false"
      >
        <SidebarItem v-for="item in allRoutes" :key="item.path" :item="item" :base-path="item.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Eleme } from '@element-plus/icons-vue'
import SidebarItem from "./SidebarItem.vue";
import useMenuStore from "@/store/modules/menu";
import useAppStore from "@/store/modules/app";
import { useRoute } from "vue-router";

const route = useRoute();
const menuStore = useMenuStore();
const appStore = useAppStore();

const { allRoutes } = menuStore;

const activeMenu = computed(() => route.path);

const toggleCollapse = () => {
  // 可以添加点击logo切换折叠状态的逻辑
  // appStore.toggleCollapse();
};

const styles = computed(() => {
  return {
    'width': appStore.isCollapse ? '64px' : '220px',
  }
});
</script>

<style lang="scss" scoped>
.sidebar {  
  position: relative;
  height: 100%;
  background-color: var(--el-bg-color-overlay);
  border-right: 1px solid var(--el-border-color-lighter);
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  z-index: 10;
  
  
  &__logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--el-border-color-lighter);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0 12px;
    
    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
    
    &-title {
      font-size: 18px;
      font-weight: bold;
      color: var(--el-color-primary);
      white-space: nowrap;
    }
    
    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      
      .el-icon {
        font-size: 24px;
        color: var(--el-color-primary);
      }
    }
  }
  
  &__scrollbar {
    height: calc(100% - var(--logo-height));
    
    :deep(.el-scrollbar__view) {
      height: 100%;
    }
  }
  
  &__menu {
    padding: 8px 0;
    border-right: none;
    transition: border-color 0.3s;
    
    &:not(.el-menu--collapse) {
      width: var(--sidebar-width);
    }
    
    &.el-menu--collapse {
      width: var(--sidebar-collapse-width);
    }
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>