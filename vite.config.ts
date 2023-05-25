import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: 'localhost',
		port: 5375,
		open: true,
	},
	plugins: [vue(), eslintPlugin()],
})
