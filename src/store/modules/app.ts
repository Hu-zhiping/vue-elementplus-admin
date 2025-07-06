import { defineStore } from "pinia";

interface Tab {
  title: string;
  path: string;
  name?: string;
  query?: Record<string, string>;
  params?: Record<string, string>;
}

interface LayoutSettings {
  showTags: boolean;
  showBreadcrumb: boolean;
  showFooter: boolean;
  fixedHeader: boolean;
  menuMode: 'sidebar' | 'top' | 'mix';
  theme: {
    primaryColor: string;
    isDark: boolean;
  };
}

const defaultSettings: LayoutSettings = {
  showTags: true,
  showBreadcrumb: true,
  showFooter: true,
  fixedHeader: true,
  menuMode: 'sidebar',
  theme: {
    primaryColor: '#409EFF',
    isDark: false,
  },
};

const useAppStore = defineStore("appStore", {
  state: () => ({
    isCollapse: false, // 是否折叠
    allMenus: [], // 所有菜单
    showMenus: [], // 渲染菜单
    paths: [], // 路由路径
    tabs: [] as Tab[], // 标签页
    userInfo: [], // 用户信息
    isFullscreen: false,
    userSetting: {
      language: "zhCN" // 语言
    },
    layoutSettings: { ...defaultSettings } as LayoutSettings,
  }),
  
  getters: {
    // 获取当前激活的标签页
    activeTab(): Tab | undefined {
      return this.tabs.find(tab => tab.path === window.location.pathname);
    },
  },
  
  actions: {
    // 侧边栏折叠控制
    setIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    // 标签页相关操作
    addTab(tab: Tab) {
      if (!this.tabs.some(t => t.path === tab.path)) {
        this.tabs.push(tab);
      }
    },

    removeTab(tab: Tab) {
      const index = this.tabs.findIndex(t => t.path === tab.path);
      if (index !== -1) {
        this.tabs.splice(index, 1);
      }
    },

    closeOtherTabs(path: string) {
      this.tabs = this.tabs.filter(tab => 
        tab.path === path || tab.path === '/dashboard'
      );
    },

    closeAllTabs() {
      this.tabs = this.tabs.filter(tab => tab.path === '/dashboard');
    },

    // 布局设置相关操作
    updateLayoutSettings(settings: Partial<LayoutSettings>) {
      this.layoutSettings = {
        ...this.layoutSettings,
        ...settings,
      };
    },

    // 重置布局设置
    resetLayoutSettings() {
      this.layoutSettings = { ...defaultSettings };
    },

    // 更新主题色
    setThemeColor(color: string) {
      this.layoutSettings.theme.primaryColor = color;
      // 应用主题色到CSS变量
      document.documentElement.style.setProperty('--el-color-primary', color);
    },

    // 切换暗色/亮色模式
    toggleDarkMode(isDark: boolean) {
      this.layoutSettings.theme.isDark = isDark;
      document.documentElement.classList.toggle('dark', isDark);
    },

    // 初始化布局设置
    initLayoutSettings() {
      // 从localStorage获取已保存的设置
      const savedSettings = localStorage.getItem('layoutSettings');
      if (savedSettings) {
        this.layoutSettings = JSON.parse(savedSettings);
        // 应用主题设置
        this.setThemeColor(this.layoutSettings.theme.primaryColor);
        this.toggleDarkMode(this.layoutSettings.theme.isDark);
      }
    },
    
    // 设置语言
    setLanguage(lang) {
      if (this.userSetting) {
        this.userSetting.language = lang;
      }
    }
  },
  
  persist: {
    key: 'app-store',
    paths: ['layoutSettings', 'tabs', 'userSetting'],
  }
});

export default useAppStore;