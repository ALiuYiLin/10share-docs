---
title: 代码压缩
---
vite 性能优化,使用vite-plugin-compression压缩代码案例
---

### 代码压缩
c压缩代码
vite-plugin-compression插件压缩代码成gzip格式或者br格式，nginx开启gzip，http缓存策略。
```typescript
import viteCompression from 'vite-plugin-compression'

export default () => {
  return {
    plugins: [
      viteCompression({
        threshold: 1024 * 20
        algorithm:  'gzip',
        ext: '.gz'
      })
    ]
  }
}

```