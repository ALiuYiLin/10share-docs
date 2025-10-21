import { useRoute } from 'vitepress'
import { Component, computed, DefineComponent } from 'vue'
export declare type RouteComponent = Component | DefineComponent
declare type Lazy<T> = () => Promise<T>
type MyLayout = {
  layout: string
  component: RouteComponent | Lazy<RouteComponent>
}
import docs from '@/views/docs.vue'
import dir from '@/views/dir.vue'
const layouts: MyLayout[] = [
  {
    layout: 'docs',
    component: docs
  },
  {
    layout: 'dir',
    component: dir
  }
]

export function useLayout() {
  const route = useRoute()
  const currentView = computed(() => {
    if (route.path.endsWith('/')) return layouts[1].component
    return layouts[0].component
  })
  return {
    currentView
  }
}
