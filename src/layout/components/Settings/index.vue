<template>
  <div class="settings-container">
    <el-tooltip content="系统设置" placement="left">
      <el-button
        class="settings-trigger"
        type="primary"
        circle
        @click="openDrawer"
      >
        <el-icon>
          <Setting />
        </el-icon>
      </el-button>
    </el-tooltip>

    <el-drawer
      v-model="drawerVisible"
      title="系统设置"
      direction="rtl"
      :size="drawerWidth"
      append-to-body
      :before-close="handleBeforeClose"
    >
      <div class="settings-content">
        <!-- 主题设置 -->
        <div class="settings-section">
          <h3 class="settings-title">
            <el-icon><Brush /></el-icon>
            <span>主题设置</span>
          </h3>
          <div class="settings-item">
            <theme-picker />
          </div>
        </div>

        <!-- 布局设置 -->
        <div class="settings-section">
          <h3 class="settings-title">
            <el-icon><Grid /></el-icon>
            <span>布局设置</span>
          </h3>
          <div class="settings-item">
            <el-form label-width="120px" label-position="left">
              <el-form-item label="导航模式">
                <el-radio-group>
                  <el-radio-button label="sidebar">侧边菜单</el-radio-button>
                  <el-radio-button label="top">顶部菜单</el-radio-button>
                  <el-radio-button label="mix">混合模式</el-radio-button>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item label="显示元素">
                <el-checkbox-group>
                  <el-checkbox label="showTags">标签栏</el-checkbox>
                  <el-checkbox label="showBreadcrumb">面包屑</el-checkbox>
                  <el-checkbox label="showFooter">页脚</el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="固定头部">
                <!-- <el-switch
                  v-model="settings.fixedHeader"
                  active-text="固定"
                  inactive-text="不固定"
                /> -->
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 其他设置 -->
        <div class="settings-section">
          <h3 class="settings-title">
            <el-icon><Operation /></el-icon>
            <span>其他设置</span>
          </h3>
          <div class="settings-item">
            <el-form>
              <!-- <el-form-item label="动画效果">
                <el-switch v-model="settings.enableAnimation" />
              </el-form-item>
              <el-form-item label="暗黑模式">
                <el-switch
                  v-model="settings.darkMode"
                  @change="toggleDarkMode"
                />
              </el-form-item> -->
            </el-form>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="drawer-footer">
          <el-button @click="resetSettings" plain>恢复默认</el-button>
          <el-button
            type="primary"
            @click="saveSettings"
            :loading="saving"
          >
            保存配置
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { Setting, Brush, Grid, Operation } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ThemePicker from './ThemePicker.vue'
import useAppStore  from '@/store/modules/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { saveLayoutSettings } = appStore
const { layoutSettings } = storeToRefs(appStore)

// 响应式状态
const drawerVisible = ref(false)
const saving = ref(false)
const localSettings = reactive(JSON.parse(JSON.stringify(layoutSettings.value)))

// 计算属性
const drawerWidth = computed(() => {
  return document.documentElement.clientWidth < 768 ? '80%' : '300px'
})

// 监听布局设置变化
watch(
  () => layoutSettings.value,
  (newVal) => {
    Object.assign(localSettings, newVal)
  },
  { deep: true }
)

// 方法
const openDrawer = () => {
  drawerVisible.value = true
}

const handleBeforeClose = (done: () => void) => {
  if (hasUnsavedChanges()) {
    ElMessageBox.confirm('设置未保存，是否放弃修改？', '提示', {
      confirmButtonText: '放弃',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => done())
      .catch(() => {})
  } else {
    done()
  }
}

const hasUnsavedChanges = () => {
  return JSON.stringify(localSettings) !== JSON.stringify(layoutSettings.value)
}

const resetSettings = () => {
  ElMessageBox.confirm('确定恢复默认设置吗？', '提示', {
    type: 'warning'
  }).then(() => {
    Object.assign(localSettings, {
      menuMode: 'sidebar',
      displayElements: ['showTags', 'showBreadcrumb', 'showFooter'],
      fixedHeader: true,
      enableAnimation: true,
      darkMode: false
    })
    ElMessage.success('已恢复默认设置')
  })
}

const saveSettings = async () => {
  saving.value = true
  try {
    await saveLayoutSettings(localSettings)
    ElMessage.success('设置保存成功')
    drawerVisible.value = false
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

const toggleDarkMode = (val: boolean) => {
  const html = document.documentElement
  val ? html.classList.add('dark') : html.classList.remove('dark')
}
</script>

<style lang="scss" scoped>
.settings-container {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;

  .settings-trigger {
    border-radius: 50%;
    box-shadow: var(--el-box-shadow-light);
    transition: all 0.3s;

    &:hover {
      transform: translateX(-5px);
    }
  }
}

.settings-content {
  padding: 16px 20px;
  height: calc(100% - 60px);
  overflow-y: auto;
}

.settings-section {
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px dashed var(--el-border-color-light);

  &:last-child {
    border-bottom: none;
  }

  .settings-title {
    display: flex;
    align-items: center;
    margin: 0 0 16px;
    font-size: 15px;
    color: var(--el-text-color-primary);

    .el-icon {
      margin-right: 8px;
      font-size: 18px;
    }
  }
}

.drawer-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .settings-container {
    top: auto;
    bottom: 20px;
    transform: none;
  }
  
  :deep(.el-drawer) {
    width: 80% !important;
  }
}

/* 抽屉样式覆盖 */
:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  color: var(--el-text-color-primary);
}

:deep(.el-drawer__body) {
  padding: 0;
}

:deep(.el-form-item__label) {
  color: var(--el-text-color-regular);
}
</style>