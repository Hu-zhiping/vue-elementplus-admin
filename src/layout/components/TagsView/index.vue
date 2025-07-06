<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <div 
        class="tags-view-item" 
        v-for="(tag, index) in tabs" 
        :key="tag.path" 
        :class="{ active: isActive(tag) }" 
        @click="handleClick(tag)"
      >
        <span>{{ tag.title }}</span>
        <el-icon class="close-icon" @click.stop="closeTag(tag, index)">
          <Close />
        </el-icon>
      </div>
    </el-scrollbar>
    <div class="tags-view-actions">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button size="small" type="primary" class="action-button">
          <el-icon><Operation /></el-icon>
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOthers">
              <el-icon><CircleClose /></el-icon>
              <span>关闭其他</span>
            </el-dropdown-item>
            <el-dropdown-item command="closeAll">
              <el-icon><CloseBold /></el-icon>
              <span>关闭所有</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useMenuStore from "@/store/modules/menu";
import useAppStore from "@/store/modules/app";
import { Close, ArrowDown, Operation, CircleClose, CloseBold } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

// 获取标签页列表
const tabs = computed(() => appStore.tabs)

// 判断标签是否激活
const isActive = (tag) => {
  return tag.path === route.path
}

// 点击标签
const handleClick = (tag) => {
  router.push(tag.path)
}

// 关闭标签
const closeTag = (tag, index) => {
  appStore.removeTab(tag)
  
  // 如果关闭的是当前激活的标签，则需要跳转到其他标签
  if (isActive(tag)) {
    const nextTag = tabs.value[index] || tabs.value[index - 1]
    if (nextTag) {
      router.push(nextTag.path)
    } else {
      // 如果没有其他标签，则跳转到首页
      router.push('/')
    }
  }
}

// 处理下拉菜单命令
const handleCommand = (command) => {
  if (command === 'closeOthers') {
    appStore.closeOtherTabs(route.path)
  } else if (command === 'closeAll') {
    appStore.closeAllTabs()
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 36px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.tags-view-wrapper {
  white-space: nowrap;
  width: calc(100% - 80px);
  height: 100%;
  display: flex;
  align-items: center;
  
  .tags-view-item {
    display: inline-flex;
    align-items: center;
    height: 28px;
    line-height: 28px;
    border: 1px solid var(--el-border-color-light);
    color: var(--el-text-color-regular);
    background: #fff;
    padding: 0 10px;
    font-size: 13px;
    margin-left: 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    
    &:first-child {
      margin-left: 16px;
    }
    
    &:hover {
      color: var(--el-color-primary);
      border-color: var(--el-color-primary-light-5);
      background-color: var(--el-color-primary-light-9);
    }
    
    &.active {
      background-color: var(--el-color-primary);
      color: #fff;
      border-color: var(--el-color-primary);
      font-weight: 500;
      
      .close-icon {
        color: #fff;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    }
    
    .close-icon {
      font-size: 12px;
      width: 16px;
      height: 16px;
      margin-left: 6px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: var(--el-color-danger);
      }
    }
  }
}

.tags-view-actions {
  display: flex;
  align-items: center;
  
  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    
    .el-icon {
      font-size: 14px;
    }
  }
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  
  .el-icon {
    margin-right: 8px;
    font-size: 16px;
  }
}
</style>