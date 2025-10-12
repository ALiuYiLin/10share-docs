import path from 'path'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: path.resolve(__dirname, '../docs'),
  title: "10share-docs",
  description: "A VitePress Site",
  outDir: path.resolve(__dirname, '../dist'),
})
