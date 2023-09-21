import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// mockjs
import { viteMockServe } from "vite-plugin-mock";
import viteEslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// viteEslint(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: ["vue", "vue-router"]
		}),
		Components({
			resolvers: [ElementPlusResolver()]
		}),
		viteMockServe({
			mockPath: "mock",
			localEnabled: true,
			prodEnabled: false
		})
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src")
		}
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8081",
				changeOrigin: true,
				rewrite: path => path.replace(new RegExp("/^\\/api/"), "")
			}
		}
	}
});
