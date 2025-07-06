<template>
  <footer class="app-footer">
    <div class="footer-main">
      <p class="copyright">
        Copyright © 2023-{{ currentYear }}
        <a href="https://github.com/your-username/vue-elementplus-admin" target="_blank" class="link">
          Vue Element Plus Admin
        </a>
      </p>
      <div class="footer-links">
        <a href="https://github.com/your-username/vue-elementplus-admin" target="_blank" class="link">
          <el-icon></el-icon>
          GitHub
        </a>
        <a href="https://element-plus.org" target="_blank" class="link">
          <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Element Plus" class="element-logo">
          Element Plus
        </a>
        <a href="https://ant.design" target="_blank" class="link">
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" class="ant-logo">
            <path d="M716.3 313.8c19-18.9 19-49.7 0-68.6l-69.9-69.9.1.1c-18.5-18.5-50.3-50.3-95.3-95.2-21.2-20.7-55.5-20.5-76.5.5L80.9 474.2a53.84 53.84 0 000 76.4L474.6 944a54.14 54.14 0 0076.5 0l165.1-165c19-18.9 19-49.7 0-68.6a48.7 48.7 0 00-68.7 0l-125 125.2c-5.2 5.2-13.3 5.2-18.5 0L189.5 521.4c-5.2-5.2-5.2-13.3 0-18.5l314.4-314.2c.4-.4.9-.7 1.3-1.1 5.2-4.1 12.4-3.7 17.2 1.1l125.2 125.1c19 19 49.8 19 68.7 0zM408.6 514.4a106.3 106.3 0 00-150.7 0 106.15 106.15 0 000 150.6c41.5 41.6 109.1 41.6 150.7 0 41.5-41.6 41.5-109.1 0-150.6zm-55.5 55.5a39.11 39.11 0 0155.4 55.4c-15.2 15.3-40.2 15.3-55.4 0-15.3-15.2-15.3-40.1 0-55.4zM880 418H624c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 160H624c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32zm0 160H624c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32z" />
          </svg>
          Ant Design
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<style lang="scss" scoped>
.app-footer {
  padding: 24px;
  text-align: center;
  background-color: #f5f5f5;
  border-top: 1px solid var(--el-border-color-light);
  color: rgba(0, 0, 0, 0.65);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  .footer-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    
    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 16px;
    }
  }
  
  .copyright {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin: 0;
  }
  
  .footer-links {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  
  .link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(0, 0, 0, 0.65);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 14px;
    
    &:hover {
      color: var(--el-color-primary);
    }
    
    .el-icon {
      font-size: 16px;
    }
  }
  
  .element-logo {
    width: 16px;
    height: 16px;
  }
  
  .ant-logo {
    font-size: 16px;
  }
}
</style>