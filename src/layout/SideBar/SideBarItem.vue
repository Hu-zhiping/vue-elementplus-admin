<template>
  <!-- 有子菜单的情况 -->
  <el-sub-menu 
    v-if="hasChildren" 
    :index="props.item.path" 
    :key="props.item.path"
    popper-class="sidebar-submenu"
  >
    <template #title>
      <div class="sidebar-item__title">
        <el-icon class="sidebar-item__icon">
          <component :is="props.item.meta?.icon" />
        </el-icon>
        <span class="sidebar-item__text">{{ props.item.meta?.title }}</span>
      </div>
    </template>
    
    <!-- 递归渲染子菜单 -->
    <SidebarItem 
      v-for="child in props.item.children" 
      :key="child.path" 
      :item="child" 
      :base-path="resolvePath(props.basePath, props.item.path)"
    />
  </el-sub-menu>

  <!-- 无子菜单且不隐藏的情况 -->
  <el-menu-item 
    v-else-if="!isHidden" 
    :index="resolvePath(props.basePath, props.item.path)"
    :title="props.item.meta?.title"
  >
    <div class="sidebar-item__content">
      <el-icon class="sidebar-item__icon">
        <component :is="props.item.meta?.icon" />
      </el-icon>
      <span class="sidebar-item__text">{{ props.item.meta?.title }}</span>
    </div>
  </el-menu-item>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件名称，用于递归引用
defineOptions({
  name: 'SidebarItem'
});

// 定义Props
const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({})
  },
  basePath: {
    type: String,
    required: true,
    default: ''
  }
});

/**
 * 判断是否有子菜单且不隐藏
 */
const hasChildren = computed(() => 
  props.item.children?.length > 0 && !props.item.meta?.hidden
);

/**
 * 判断菜单项是否隐藏
 */
const isHidden = computed(() => 
  props.item.meta?.hidden
);

/**
 * 解析菜单项的完整路径
 * @param basePath 基础路径
 * @param path 当前路径
 * @returns 完整路径
 */
const resolvePath = (basePath, path) => {
  // 如果是绝对路径，直接返回
  if (path.startsWith('/')) {
    return path;
  }
  
  // 确保基础路径以斜杠结尾
  const normalizedBasePath = basePath.endsWith('/') 
    ? basePath 
    : `${basePath}/`;
  
  // 拼接完整路径
  return `${normalizedBasePath}${path}`;
};
</script>

<style lang="scss" scoped>
.sidebar-item {
  &__title,
  &__content {
    display: flex;
    align-items: center;
    width: 100%;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  
  &__icon {
    margin-right: 10px;
    font-size: 16px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  
  &__text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 14px;
  }
}

// 修复菜单项内容的样式
:deep(.el-menu-item) {
  .sidebar-item__content {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    transition: background-color 0.2s ease;
  }
  
  &:hover {
    background-color: rgba(22, 93, 255, 0.08);
    border-radius: 0;
  }

  // 一级菜单悬停样式调整
  :deep(.el-sub-menu__title) {
    &:hover {
      background-color: rgba(22, 93, 255, 0.1);
      border-radius: 4px;
      transition: all 0.3s ease;
    }
  }
  
  &.is-active {
    background-color: rgba(22, 93, 255, 0.05);
    color: var(--el-color-primary);
    border-radius: 0;
    border-right: none;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 3px;
      background-color: var(--el-color-primary);
      border-radius: 0;
    }
  }
}

// 子菜单样式
:deep(.sidebar-submenu) {
  .el-menu--popup {
    padding: 8px 0;
    min-width: 180px;
    border-radius: 4px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 
                0 6px 16px 0 rgba(0, 0, 0, 0.08), 
                0 9px 28px 8px rgba(0, 0, 0, 0.05);
    
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      margin: 4px 8px;
      padding: 0 16px !important;
      border-radius: 4px;
      
      &.is-active {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
      }
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    }
  }
}
</style>