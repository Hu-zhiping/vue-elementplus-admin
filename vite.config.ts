import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// mockjs
import { viteMockServe } from "vite-plugin-mock";

import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// viteEslint(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
			imports: ["vue", "vue-router"],
			eslintrc: {
				enabled: false //是否自动生成 eslint 规则，建议生成之后设置 false
			}
		}),
		Components({
			resolvers: [
				ElementPlusResolver({
					importStyle: "sass"
				})
			]
		}),
		viteMockServe({
			mockPath: "mock",
			localEnabled: true,
			prodEnabled: false
		}),
		createSvgIconsPlugin({
			//指定需要缓存的图标文件夹
			iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
			//指定symbolId格式
			symbolId: "icon-[dir]-[name]"
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
	// css: {
	// 	preprocessorOptions: {
	// 		scss: {
	// 			additionalData: `@use "@/style/var.css" as *;`
	// 		}
	// 	}
	// }
});
