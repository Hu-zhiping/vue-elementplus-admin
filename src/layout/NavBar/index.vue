<template>
  <header class="app-header" :class="{ 'app-header--fixed': appStore.fixedHeader }">
    <div class="app-header__container">
      <!-- 左侧区域 -->
      <div class="app-header__left">
        <button class="app-header__collapse-btn" @click="toggleSideBar" aria-label="切换菜单">
          <el-icon :class="{ 'app-header__icon--active': !appStore.isCollapse }">
            <component :is="appStore.isCollapse ? Expand : Fold" />
          </el-icon>
        </button>
        <breadcrumb class="app-header__breadcrumb hidden-sm-and-down" />
      </div>

      <!-- 右侧区域 -->
      <nav class="app-header__right">
        <!-- 操作按钮组 -->
        <div class="app-header__action-group">
          <el-tooltip content="全局搜索" placement="bottom">
            <button class="app-header__action-btn" @click="handleSearch">
              <el-icon><Search /></el-icon>
            </button>
          </el-tooltip>
          
          <el-tooltip content="刷新页面" placement="bottom">
            <button class="app-header__action-btn" @click="handleRefresh">
              <el-icon><RefreshRight /></el-icon>
            </button>
          </el-tooltip>
          
          <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏显示'" placement="bottom">
            <button class="app-header__action-btn" @click="toggleFullScreen">
              <el-icon><component :is="isFullscreen ? Aim : FullScreen" /></el-icon>
            </button>
          </el-tooltip>
        </div>

        <!-- 语言切换 -->
        <el-dropdown class="app-header__lang-selector" trigger="click">
          <div class="app-header__lang-trigger">
            <el-icon><Link /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
                v-for="item in languages" 
                :key="item.value"
                :class="{ 'is-active': currentLang === item.label }" 
                @click="handleSetLanguage(item.value)"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 通知中心 -->
        <div class="app-header__notification">
          <el-badge :value="3" class="app-header__badge" type="danger">
            <el-tooltip content="通知中心" placement="bottom">
              <button class="app-header__notification-btn" @click="handleNotice">
                <el-icon><Bell /></el-icon>
              </button>
            </el-tooltip>
          </el-badge>
        </div>

        <!-- 用户信息 -->
        <el-dropdown class="app-header__user-menu" trigger="click">
          <button class="app-header__user-trigger">
            <el-avatar :size="32" :src="userStore.avatar" />
            <span class="app-header__username hidden-sm-and-down">{{ userStore.name }}</span>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleUserCenter">
                <el-icon><User /></el-icon>
                <span>个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item @click="handleUserSettings">
                <el-icon><Setting /></el-icon>
                <span>个人设置</span>
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {  computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
import { ElMessageBox } from 'element-plus'
import { Expand, Fold, FullScreen, Aim, Search, RefreshRight, Bell, User, Setting, SwitchButton, Link} from '@element-plus/icons-vue'
import useAppStore from "@/store/modules/app";
import useUserStore from "@/store/modules/user";
import Breadcrumb from './components/BreadCrumb.vue'


const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

// 全屏控制
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

// 语言设置
const languages = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en' }
]
const currentLang = computed(() => {
  const found = languages.find(item => item.value === appStore.language)
  return found ? found.label : '简体中文'
})

// 切换侧边栏
const toggleSideBar = () => {
  appStore.setIsCollapse()
}

// 设置语言
const handleSetLanguage = (lang) => {
  appStore.setLanguage(lang)
}

// 全局搜索
const handleSearch = () => {
  console.log('全局搜索')
}

// 刷新页面
const handleRefresh = () => {
  location.reload()
}

// 通知中心
const handleNotice = () => {
  console.log('通知中心')
}

// 个人中心
const handleUserCenter = () => {
  router.push('/profile/index')
}

// 个人设置
const handleUserSettings = () => {
  router.push('/profile/settings')
}

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await userStore.logout()
    router.push('/login')
  })
}

</script>

<style lang="scss" scoped>
// 基础变量
$header-height: 64px;
$header-padding: 0 24px;
$mobile-header-padding: 0 16px;
$action-gap: 12px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.app-header {
  height: $header-height;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  transition: $transition;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);

  &--fixed {
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: $header-padding;
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__collapse-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    color: var(--el-text-color-secondary);
    transition: $transition;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .el-icon {
      font-size: 20px;
      transition: transform 0.3s ease;

      &--active {
        transform: rotate(360deg);
      }
    }
  }

  &__breadcrumb {
    margin-left: 8px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__action-group {
    display: flex;
    align-items: center;
    gap: $action-gap;
    margin-right: 8px;
  }

  &__action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: var(--el-text-color-secondary);
    transition: $transition;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .el-icon {
      font-size: 18px;
    }
  }

  &__lang-selector {
    .app-header__lang-trigger {
      display: flex;
      align-items: center;
      width: 36px;
      height: 36px;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 50%;
      color: var(--el-text-color-secondary);
      transition: $transition;
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
      }

      .el-icon {
        font-size: 18px;
      }
    }
  }

  &__notification {
    position: relative;
    margin: 0 4px;
  }

  &__notification-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: var(--el-text-color-secondary);
    transition: $transition;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .el-icon {
      font-size: 18px;
    }
  }

  &__badge {
    :deep(.el-badge__content) {
      top: 4px;
      right: 4px;
    }
  }

  &__user-menu {
    margin-left: 8px;
  }

  &__user-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px 4px 4px;
    border-radius: 20px;
    transition: $transition;
    background: transparent;
    border: none;
    cursor: pointer;

    &:hover {
      background: var(--el-color-primary-light-9);

      .app-header__username {
        color: var(--el-color-primary);
      }

      .el-avatar {
        border-color: var(--el-color-primary);
      }
    }

    .el-avatar {
      border: 2px solid transparent;
      transition: $transition;
    }
  }

  &__username {
    color: var(--el-text-color-primary);
    font-weight: 500;
    transition: $transition;
    font-size: 14px;
  }
}

// 下拉菜单样式
:deep(.el-dropdown-menu) {
  padding: 8px 0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);

  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    font-size: 14px;
    color: var(--el-text-color-regular);
    transition: $transition;

    &:not(.is-disabled):hover {
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    &.is-active {
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .el-icon {
      font-size: 16px;
    }
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .app-header {
    &__container {
      padding: $mobile-header-padding;
    }

    &__action-group {
      gap: 6px;
      margin-right: 4px;
    }

    &__user-menu {
      margin-left: 4px;
    }
  }
}
</style>