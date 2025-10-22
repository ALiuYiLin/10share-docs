import { config } from './src/config'
import {defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config

import { buildSidebar } from './src/utils/sider-builder'

export default defineConfig({
  srcDir: config.project.DOCS_ROOT,
  title: 'whale-docs',
  description: 'A VitePress Site',
  outDir: config.project.OUT_DIR,
  base: config.project.BASE_URL + '/',
  themeConfig: {
    sidebar: [buildSidebar(config.project.DOCS_ROOT)],
  },
  vite: {
    resolve: {
      alias: {
        '@': config.project.SRC_ROOT
      }
    }
  }
})
