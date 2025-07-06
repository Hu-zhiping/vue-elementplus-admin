<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="app-sidebar" :style="{ width: appStore.isCollapse ? '64px' : '220px' }">
      <SideBar />
    </div>

    <!-- 主体区域 -->
    <div class="app-main">
      <!-- 顶部导航 -->
      <div class="app-header">
        <NavBar />
        <!-- 标签页导航 -->
        <TagsView />
      </div>

      <!-- 内容区域 -->
      <div class="app-content">
        <AppMain />
      </div>

      <!-- 页脚 -->
      <Footer />
    </div>

    <!-- 设置面板 -->
    <Settings />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import SideBar from '@/layout/components/SideBar/index.vue';
import NavBar from '@/layout/components/NavBar/index.vue';
import TagsView from '@/layout/components/TagsView/index.vue';
import Footer from '@/layout/components/Footer/index.vue';
import Settings from '@/layout/components/Settings/index.vue';
import useMenuStore from "@/store/modules/menu";
import useAppStore from "@/store/modules/app";
import AppMain from '@/layout/components/AppMain/index.vue';

const appStore = useAppStore();
const isCollapse = computed(() => appStore.isCollapse);
const layoutSettings = computed(() => appStore.layoutSettings);

// 是否显示侧边栏
const showSidebar = computed(() => {
  return layoutSettings.value.menuMode === 'sidebar' || layoutSettings.value.menuMode === 'mix';
});

// 布局类名
const layoutClasses = computed(() => {
  return {
    [`menu-mode-${layoutSettings.value.menuMode}`]: true,
    'dark-mode': layoutSettings.value.theme?.isDark,
  };
});

// 初始化
onMounted(() => {
  // 初始化布局设置
  appStore.initLayoutSettings();

  // 监听窗口大小变化，在小屏幕上自动折叠侧边栏
  const handleResize = () => {
    if (window.innerWidth < 768 && !appStore.isCollapse) {
      appStore.setIsCollapse(true);
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // 初始调用一次

  return () => {
    window.removeEventListener('resize', handleResize);
  };
});
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;

  .app-sidebar {
    // width: 220px;
    transition: width 0.28s;
  }

  .app-main {
    // width: calc(100% - 220px);
    width: 100%;
  }
}
</style>