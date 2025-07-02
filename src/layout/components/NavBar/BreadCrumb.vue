<template>
  <nav class="breadcrumb" aria-label="面包屑导航">
    <el-breadcrumb separator="/">
      <!-- 首页链接 -->
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumb__home">首页</span>
      </el-breadcrumb-item>
      
      <!-- 动态生成的面包屑项 -->
      <template v-for="(item, index) in breadcrumbList" :key="item.path">
        <el-breadcrumb-item 
          :to="index === breadcrumbList.length - 1 ? null : { path: item.path }"
          :class="{ 'breadcrumb__item--active': index === breadcrumbList.length - 1 }"
        >
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </nav>
</template>

<script setup lang="ts">
/**
 * 面包屑导航组件
 * 根据当前路由自动生成面包屑导航
 */

// 获取当前路由
const route = useRoute();

/**
 * 计算面包屑列表
 * 过滤掉没有meta.title的路由项
 */
const breadcrumbList = computed(() => {
  return route.matched.filter(item => item.meta && item.meta.title);
});
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  height: 100%;
  
  &__home {
    font-weight: 500;
  }
  
  &__item {
    &--active {
      font-weight: 600;
      color: var(--el-color-primary);
    }
  }
  
  :deep(.el-breadcrumb__item) {
    .el-breadcrumb__inner {
      color: var(--el-text-color-regular);
      
      &.is-link {
        color: var(--el-text-color-primary);
        
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
    
    &:last-child {
      .el-breadcrumb__inner {
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>