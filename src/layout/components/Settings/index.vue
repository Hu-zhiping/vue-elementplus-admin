<template>
  <div class="settings-container">
    <el-button
      class="settings-trigger"
      type="primary"
      circle
      @click="drawer = true"
    >
      <el-icon>
        <Setting />
      </el-icon>
    </el-button>

    <el-drawer
      v-model="drawer"
      title="系统设置"
      direction="rtl"
      size="300px"
    >
      <div class="settings-content">
        <!-- 主题色设置 -->
        <div class="settings-section">
          <h3 class="settings-title">主题色</h3>
          <div class="settings-item">
            <ColorPicker />
          </div>
        </div>

        <!-- 界面设置 -->
        <div class="settings-section">
          <h3 class="settings-title">界面设置</h3>
          <div class="settings-item">
            <el-form :model="layoutSettings" label-width="120px">
              <el-form-item label="显示标签栏">
                <el-switch v-model="layoutSettings.showTags" />
              </el-form-item>
              <el-form-item label="显示面包屑">
                <el-switch v-model="layoutSettings.showBreadcrumb" />
              </el-form-item>
              <el-form-item label="显示页脚">
                <el-switch v-model="layoutSettings.showFooter" />
              </el-form-item>
              <el-form-item label="固定头部">
                <el-switch v-model="layoutSettings.fixedHeader" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 界面风格 -->
        <div class="settings-section">
          <h3 class="settings-title">界面风格</h3>
          <div class="settings-item">
            <el-form :model="layoutSettings" label-width="120px">
              <el-form-item label="导航模式">
                <el-select v-model="layoutSettings.menuMode" class="w-full">
                  <el-option label="侧边菜单" value="sidebar" />
                  <el-option label="顶部菜单" value="top" />
                  <el-option label="混合菜单" value="mix" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="settings-footer">
          <el-button @click="resetSettings">重置设置</el-button>
          <el-button type="primary" @click="saveSettings">保存设置</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ColorPicker from './components/ColorPicker.vue'
import useMenuStore from "@/store/modules/menu";
import useAppStore from "@/store/modules/app";

const drawer = ref(false)
const appStore = useAppStore()

// 布局设置
const layoutSettings = reactive({
  showTags: true,
  showBreadcrumb: true,
  showFooter: true,
  fixedHeader: true,
  menuMode: 'sidebar'
})

// 重置设置
const resetSettings = () => {
  layoutSettings.showTags = true
  layoutSettings.showBreadcrumb = true
  layoutSettings.showFooter = true
  layoutSettings.fixedHeader = true
  layoutSettings.menuMode = 'sidebar'
  ElMessage.success('已重置为默认设置')
}

// 保存设置
const saveSettings = () => {
  // TODO: 将设置保存到 store 和 localStorage
  ElMessage.success('设置已保存')
  drawer.value = false
}
</script>

<style lang="scss" scoped>
.settings-container {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2000;

  .settings-trigger {
    border-radius: 4px 0 0 4px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  }
}

.settings-content {
  padding: 20px;
}

.settings-section {
  margin-bottom: 24px;

  .settings-title {
    margin: 0 0 12px;
    font-size: 14px;
    color: #606266;
    font-weight: bold;
  }

  .settings-item {
    margin-top: 12px;
  }
}

.settings-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0 20px;
}

:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}

:deep(.el-drawer__body) {
  padding: 0;
}

:deep(.el-drawer__footer) {
  padding: 16px 0;
  border-top: 1px solid var(--el-border-color-light);
}
</style>