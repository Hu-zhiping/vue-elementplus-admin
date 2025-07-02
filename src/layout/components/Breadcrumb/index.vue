<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="index === breadcrumbs.length - 1 || item.redirect === 'noRedirect'"
          class="no-redirect"
        >{{ generateTitle(item.meta.title) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
import { compile } from 'path-to-regexp'

// 国际化函数，根据项目实际情况可能需要调整
const generateTitle = (title: string) => {
  // 如果项目使用了i18n，可以在这里添加翻译逻辑
  return title
}

const route = useRoute()
const router = useRouter()
const breadcrumbs = ref<RouteLocationMatched[]>([])

// 获取面包屑数据
const getBreadcrumb = () => {
  // 如果当前路由没有设置meta.title，则不显示在面包屑中
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  
  // 如果第一个不是首页，则添加首页到面包屑
  const first = matched[0]
  if (first && first.path !== '/dashboard') {
    matched = [
      {
        path: '/dashboard',
        meta: { title: '首页' }
      } as unknown as RouteLocationMatched
    ].concat(matched)
  }
  
  breadcrumbs.value = matched
}

// 处理面包屑点击
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  
  // 如果设置了重定向，则跳转到重定向路径
  if (redirect) {
    router.push(redirect.toString())
    return
  }
  
  // 否则跳转到路径
  router.push(pathCompile(path))
}

// 编译路径，处理路径中的参数
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}

// 监听路由变化，更新面包屑
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 60px;
  
  .no-redirect {
    color: var(--el-text-color-regular);
    cursor: text;
  }
  
  a {
    color: var(--el-text-color-primary);
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: var(--el-color-primary);
    }
  }
}

// 面包屑动画
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>