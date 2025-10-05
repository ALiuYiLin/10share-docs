import { createContentLoader } from 'vitepress'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  
  title: "10share-docs",
  description: "A VitePress Site",

  async buildEnd(){
    const posts = await createContentLoader('docs/*.md').load()
    console.log('posts: ', posts);
  }
})
