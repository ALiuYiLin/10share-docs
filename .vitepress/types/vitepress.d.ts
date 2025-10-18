import 'vitepress'
import type { ContentOptions, ContentData } from 'vitepress'

declare module 'vitepress' {
  function createContentLoader<T = ContentData[]>(
    pattern: string | string[],
    { includeSrc, render, excerpt: renderExcerpt, transform, globOptions }?: ContentOptions<T>
  ): {
    watch: string | string[]
    load: () => Promise<T>
  }
}
