<template>
  <div class="color-picker">
    <h3 class="color-picker__title">主题色设置</h3>
    
    <div class="color-picker__section">
      <div class="color-picker__label">主题模式</div>
      <div class="color-picker__theme-switch">
        <el-switch
          v-model="isDarkMode"
          @change="toggleDarkMode"
          :active-value="true"
          :inactive-value="false"
        >
          <template #active-action>
            <el-icon><Moon /></el-icon>
          </template>
          <template #inactive-action>
            <el-icon><Sunny /></el-icon>
          </template>
        </el-switch>
        <span class="color-picker__theme-label">{{ isDarkMode ? '暗色模式' : '亮色模式' }}</span>
      </div>
    </div>
    
    <div class="color-picker__section">
      <div class="color-picker__label">主题颜色</div>
      <div class="color-picker__colors">
        <div
          v-for="(color, index) in presetColors"
          :key="index"
          class="color-picker__color-item"
          :class="{ 'is-active': currentColor === color }"
          :style="{ backgroundColor: color }"
          @click="changeThemeColor(color)"
        ></div>
      </div>
    </div>
    
    <div class="color-picker__section">
      <div class="color-picker__label">自定义颜色</div>
      <el-color-picker
        v-model="customColor"
        :predefine="presetColors"
        @change="changeThemeColor"
        show-alpha
        size="small"
      />
    </div>
    
    <div class="color-picker__section">
      <div class="color-picker__label">界面设置</div>
      <div class="color-picker__option">
        <span>紧凑模式</span>
        <el-switch v-model="isCompactMode" @change="toggleCompactMode" />
      </div>
      <div class="color-picker__option">
        <span>固定头部</span>
        <el-switch v-model="isFixedHeader" @change="toggleFixedHeader" />
      </div>
      <div class="color-picker__option">
        <span>显示标签栏</span>
        <el-switch v-model="showTabs" @change="toggleTabs" />
      </div>
    </div>
    
    <div class="color-picker__actions">
      <el-button type="primary" @click="saveSettings">保存设置</el-button>
      <el-button @click="resetSettings">恢复默认</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Moon, Sunny } from '@element-plus/icons-vue';
import useAppStore from '@/store/modules/app';

const appStore = useAppStore();

// 预设颜色
const presetColors = [
  '#409EFF', // 默认蓝色
  '#67C23A', // 绿色
  '#E6A23C', // 黄色
  '#F56C6C', // 红色
  '#909399', // 灰色
  '#9370DB', // 紫色
  '#13C2C2', // 青色
  '#1890FF', // 亮蓝色
];

// 状态
const isDarkMode = ref(false);
const currentColor = ref('#409EFF');
const customColor = ref('#409EFF');
const isCompactMode = ref(false);
const isFixedHeader = ref(true);
const showTabs = ref(true);

// 初始化
onMounted(() => {
  // 从本地存储或状态管理中获取设置
  const savedTheme = localStorage.getItem('theme-mode');
  const savedColor = localStorage.getItem('theme-color');
  
  isDarkMode.value = savedTheme === 'dark';
  if (savedColor) {
    currentColor.value = savedColor;
    customColor.value = savedColor;
    applyThemeColor(savedColor);
  }
  
  // 应用其他设置
  isCompactMode.value = localStorage.getItem('compact-mode') === 'true';
  isFixedHeader.value = localStorage.getItem('fixed-header') !== 'false';
  showTabs.value = localStorage.getItem('show-tabs') !== 'false';
});

// 切换暗色模式
const toggleDarkMode = (value: boolean) => {
  document.documentElement.classList.toggle('dark', value);
  localStorage.setItem('theme-mode', value ? 'dark' : 'light');
};

// 更改主题颜色
const changeThemeColor = (color: string) => {
  currentColor.value = color;
  customColor.value = color;
  applyThemeColor(color);
  localStorage.setItem('theme-color', color);
};

// 应用主题颜色到CSS变量
const applyThemeColor = (color: string) => {
  const el = document.documentElement;
  
  // 设置主色
  el.style.setProperty('--el-color-primary', color);
  
  // 生成不同深浅的主题色
  for (let i = 1; i <= 9; i++) {
    const lightColor = lightenColor(color, i * 0.1);
    el.style.setProperty(`--el-color-primary-light-${i}`, lightColor);
  }
  
  // 设置暗色
  const darkColor = darkenColor(color, 0.1);
  el.style.setProperty('--el-color-primary-dark-2', darkColor);
};

// 辅助函数：使颜色变亮
const lightenColor = (color: string, amount: number): string => {
  try {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const lightenChannel = (c: number) => Math.round(c + (255 - c) * amount);
    
    const rr = Math.min(lightenChannel(r), 255).toString(16).padStart(2, '0');
    const gg = Math.min(lightenChannel(g), 255).toString(16).padStart(2, '0');
    const bb = Math.min(lightenChannel(b), 255).toString(16).padStart(2, '0');
    
    return `#${rr}${gg}${bb}`;
  } catch (e) {
    return color;
  }
};

// 辅助函数：使颜色变暗
const darkenColor = (color: string, amount: number): string => {
  try {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    const darkenChannel = (c: number) => Math.round(c * (1 - amount));
    
    const rr = darkenChannel(r).toString(16).padStart(2, '0');
    const gg = darkenChannel(g).toString(16).padStart(2, '0');
    const bb = darkenChannel(b).toString(16).padStart(2, '0');
    
    return `#${rr}${gg}${bb}`;
  } catch (e) {
    return color;
  }
};

// 切换紧凑模式
const toggleCompactMode = (value: boolean) => {
  document.documentElement.classList.toggle('compact-mode', value);
  localStorage.setItem('compact-mode', value.toString());
};

// 切换固定头部
const toggleFixedHeader = (value: boolean) => {
  appStore.fixedHeader = value;
  localStorage.setItem('fixed-header', value.toString());
};

// 切换标签栏显示
const toggleTabs = (value: boolean) => {
  appStore.showTabs = value;
  localStorage.setItem('show-tabs', value.toString());
};

// 保存设置
const saveSettings = () => {
  // 可以添加保存到后端的逻辑
  ElMessage.success('设置已保存');
};

// 重置设置
const resetSettings = () => {
  isDarkMode.value = false;
  toggleDarkMode(false);
  
  currentColor.value = '#409EFF';
  customColor.value = '#409EFF';
  changeThemeColor('#409EFF');
  
  isCompactMode.value = false;
  toggleCompactMode(false);
  
  isFixedHeader.value = true;
  toggleFixedHeader(true);
  
  showTabs.value = true;
  toggleTabs(true);
  
  ElMessage.success('已恢复默认设置');
};
</script>

<style lang="scss" scoped>
.color-picker {
  padding: 16px;
  
  &__title {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
  
  &__section {
    margin-bottom: 24px;
  }
  
  &__label {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }
  
  &__colors {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 12px;
  }
  
  &__color-item {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    
    &:hover {
      transform: scale(1.1);
    }
    
    &.is-active {
      box-shadow: 0 0 0 2px var(--el-color-white), 0 0 0 4px var(--el-color-primary);
      
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
  
  &__theme-switch {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  &__theme-label {
    font-size: 14px;
    color: var(--el-text-color-regular);
  }
  
  &__option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    font-size: 14px;
    color: var(--el-text-color-regular);
  }
  
  &__actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }
}
</style>