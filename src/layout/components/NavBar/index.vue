<template>
  <div class="navbar" :class="{ 'is-fixed': appStore.fixedHeader }">
    <!-- 左侧区域 -->
    <div class="navbar__left">
      <div class="navbar__collapse" @click="toggleSideBar">
        <el-icon :class="{ 'is-active': !appStore.isCollapse }">
          <Expand v-if="appStore.isCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
      <breadcrumb class="navbar__breadcrumb hidden-sm-and-down" />
    </div>

    <!-- 右侧区域 -->
    <div class="navbar__right">
      <!-- 全局搜索 -->
      <div class="navbar__item navbar__search">
        <el-tooltip content="全局搜索" placement="bottom">
          <el-icon @click="handleSearch">
            <Search />
          </el-icon>
        </el-tooltip>
      </div>

      <!-- 刷新页面 -->
      <div class="navbar__item">
        <el-tooltip content="刷新页面" placement="bottom">
          <el-icon @click="handleRefresh">
            <RefreshRight />
          </el-icon>
        </el-tooltip>
      </div>

      <!-- 全屏切换 -->
      <div class="navbar__item">
        <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏显示'" placement="bottom">
          <el-icon @click="toggleFullScreen">
            <FullScreen v-if="!isFullscreen" />
            <Aim v-else />
          </el-icon>
        </el-tooltip>
      </div>

      <!-- 语言切换 -->
      <el-dropdown class="navbar__item navbar__lang" trigger="click">
        <div class="navbar__lang-label">
          <el-icon><Bell/></el-icon>
          <span class="hidden-sm-and-down">{{ currentLang }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in languages"
              :key="item.value"
              :command="item.value"
              :class="{ 'is-active': item.value === currentLang }"
              @click="handleSetLanguage(item.value)"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 通知中心 -->
      <div class="navbar__item navbar__notice" @click="handleNotice">
        <el-badge :value="3" :max="99" class="notice-badge">
          <el-icon><Bell /></el-icon>
        </el-badge>
      </div>

      <!-- 主题设置 -->
      <div class="navbar__item">
        <el-popover
          placement="bottom-end"
          :width="300"
          trigger="click"
          popper-class="theme-popover"
          transition="el-zoom-in-top"
        >
          <template #reference>
            <el-icon><Setting /></el-icon>
          </template>
          <color-picker />
        </el-popover>
      </div>

      <!-- 用户菜单 -->
      <el-dropdown class="navbar__item navbar__user" trigger="click">
        <div class="navbar__user-info">
          <el-avatar :size="32" :src="userStore.avatar || defaultAvatar" />
          <span class="hidden-sm-and-down">{{ userStore.name }}</span>
          <el-icon class="el-icon--right">
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleProfile">
              <el-icon><User /></el-icon>个人中心
            </el-dropdown-item>
            <el-dropdown-item @click="handleSettings">
              <el-icon><Setting /></el-icon>账号设置
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">
              <el-icon><SwitchButton /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import useAppStore from '@/store/modules/app'
import useUserStore from '@/store/modules/user'
import Breadcrumb from '@/layout/components/NavBar/BreadCrumb.vue'
import ColorPicker from './ColorPicker.vue'
// 使用默认头像
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
import {
  Expand,
  Fold,
  Search,
  RefreshRight,
  FullScreen,
  Aim,
  Bell,
  Setting,
  User,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

// 全屏状态
const isFullscreen = ref(false)

// 语言选项
const languages = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' }
]

// 当前语言
const currentLang = computed(() => {
  return appStore.language === 'zh-CN' ? '简体中文' : 'English'
})

// 切换侧边栏
const toggleSideBar = () => {
  appStore.toggleSidebar()
}

// 切换全屏
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// 处理全局搜索
const handleSearch = () => {
  // 实现全局搜索逻辑
}

// 刷新页面
const handleRefresh = () => {
  window.location.reload()
}

// 设置语言
const handleSetLanguage = (lang: string) => {
  appStore.setLanguage(lang)
}

// 处理通知
const handleNotice = () => {
  // 实现通知中心逻辑
}

// 个人中心
const handleProfile = () => {
  router.push('/profile')
}

// 账号设置
const handleSettings = () => {
  router.push('/settings')
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
.navbar {
  height: var(--navbar-height, 60px);
  padding: 0 16px;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  
  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: var(--el-box-shadow-light);
  }

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__collapse {
    cursor: pointer;
    font-size: 20px;
    color: var(--el-text-color-regular);
    transition: color 0.3s;

    &:hover {
      color: var(--el-color-primary);
    }

    .el-icon {
      transition: transform 0.3s;
      
      &.is-active {
        transform: rotate(180deg);
      }
    }
  }

  &__breadcrumb {
    margin-left: 8px;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 8px;
    cursor: pointer;
    color: var(--el-text-color-regular);
    transition: all 0.3s;

    &:hover {
      color: var(--el-color-primary);
    }

    .el-icon {
      font-size: 20px;
    }
  }

  &__lang {
    &-label {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }

  &__notice {
    position: relative;
    
    .notice-badge {
      line-height: 1;
    }
  }

  &__user {
    margin-left: 8px;
    
    &-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      
      .el-avatar {
        border: 2px solid var(--el-border-color-lighter);
        transition: border-color 0.3s;
        
        &:hover {
          border-color: var(--el-color-primary);
        }
      }
      
      span {
        color: var(--el-text-color-regular);
        transition: color 0.3s;
      }
      
      &:hover {
        span {
          color: var(--el-color-primary);
        }
      }
    }
  }
}

// 响应式设计
@media screen and (max-width: 768px) {
  .navbar {
    padding: 0 12px;
    
    &__item {
      padding: 0 6px;
    }
    
    &__user {
      margin-left: 4px;
    }
  }
}

// 主题弹出框样式
:deep(.theme-popover) {
  padding: 0;
  
  .el-popover__title {
    margin: 0;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid var(--el-border-color-light);
  }
}

// 下拉菜单样式
:deep(.el-dropdown-menu) {
  .el-dropdown-menu__item {
    display: flex;
    align-items: center;
    gap: 8px;
    
    &.is-active {
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
    }
    
    .el-icon {
      margin-right: 4px;
    }
  }
}
</style>