import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

export default ({ mode }) => {
  // Load environment variables from .env file based on the mode
  const env = loadEnv(mode, process.cwd(), '')
  console.log(`Using environment variables for mode: ${mode}`)

  return defineConfig({
    plugins: [
      vue(),
      vueDevTools(),
      Components({
        resolvers: [PrimeVueResolver()],
        extensions: ['vue'],
        deep: true,
        include: [/\.vue$/],
        dts: 'src/components.d.ts',
      }),
      AutoImport({
        include: [
          /\.[tj]s?$/, // .ts, .js
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: ['vue', 'vue-router', 'pinia'],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          // Folder auto imports to create global variables
          'src/composable/**',
          'src/stores/**',
        ],
        vueTemplate: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: env.VITE_CLIENT_PORT,
      watch: {
        usePolling: true,
      },
    },
  })
}
