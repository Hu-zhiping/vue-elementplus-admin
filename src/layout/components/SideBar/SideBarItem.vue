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
      :base-path="props.item.path"
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

<script lang="ts" setup>
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
const resolvePath = (basePath: string, path: string): string => {
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
  }
  
  &__icon {
    margin-right: 8px;
    font-size: 16px;
  }
  
  &__text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

// 修复菜单项内容的样式
:deep(.el-menu-item) {
  .sidebar-item__content {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>