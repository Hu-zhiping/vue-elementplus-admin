<template>
  <aside class="sidebar" aria-label="侧边导航">
    <!-- Logo区域 -->
    <div class="sidebar__logo">
      <span v-if="appStore.isCollapse" class="sidebar__logo-short">A</span>
      <span v-else class="sidebar__logo-full">HelloAdmin</span>
    </div>
    
    <!-- 导航菜单 -->
    <el-scrollbar class="sidebar__scrollbar">
      <el-menu 
        :collapse="appStore.isCollapse" 
        :router="true" 
        :default-active="activeMenu"
        class="sidebar__menu"
      >
        <SidebarItem 
          v-for="item in allRoutes" 
          :key="item.path" 
          :item="item" 
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script lang="ts" setup>
// 组件导入
import SidebarItem from "./SideBarItem.vue";

// Store导入
import useMenuStore from "@/store/modules/menu";
import useAppStore from "@/store/modules/app";

// 路由
const route = useRoute();

// Store实例
const menuStore = useMenuStore();
const appStore = useAppStore();

// 菜单数据
const { allRoutes } = menuStore;

// 计算当前激活的菜单项
const activeMenu = computed(() => {
  return route.path;
});
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  transition: width 0.3s ease;
  border-right: 1px solid var(--el-border-color-lighter);
  box-sizing: border-box;
  background-color: var(--el-bg-color-overlay);
  
  &__logo {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--el-border-color-lighter);
    overflow: hidden;
    
    &-short {
      font-size: 24px;
      font-weight: bold;
      color: var(--el-color-primary);
    }
    
    &-full {
      font-size: 18px;
      font-weight: bold;
      color: var(--el-text-color-primary);
    }
  }
  
  &__scrollbar {
    height: calc(100vh - 50px);
  }
  
  &__menu {
    border-right: none;
    
    &.el-menu--collapse {
      border-right: none;
    }
  }
}
</style>