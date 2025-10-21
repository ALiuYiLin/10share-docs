import { data as mdsContent} from '@/utils/content-load.data'
import { useData, useRoute } from 'vitepress'
import lodash from 'lodash'
import { flattenTreeToKeyedObject } from '@/utils'
import { computed } from 'vue'
const base_url = '/whale-docs'
/**
 * /temp/xxx.html => /temp/xxx
 * /temp/ => /temp
 * / => ''
 * /base_url/temp/ => /temp
 * @param url 
 */
function resolvedUrl(url: string){
  const decodeURI = url.startsWith(base_url)? decodeURIComponent(url).slice(base_url.length):decodeURIComponent(url)
  if(decodeURI === '/') return ''
  if(decodeURI.endsWith('.html')) return  decodeURI.slice(0, -5)
  if(decodeURI.endsWith('/')) return decodeURI.slice(0,-1)
  return decodeURI
}



export function useSiderBar(){
  const { theme } = useData()
  const route = useRoute()
  const siderbar = theme.value.sidebar as SidebarItem[] 
  const clonedSiderbar = lodash.cloneDeep(siderbar)

  // 构建frontmatter映射表
  const frontmatterMap: Record<string,Record<string,any>> = Object.fromEntries(
    mdsContent.map(cur => [resolvedUrl(cur.url), cur.frontmatter])
  )
  // sideritem 映射表
  const siderbarItemMap = flattenTreeToKeyedObject(siderbar[0] as Record<string, any>,'items','link') as Record<string,SidebarItem>
  

  // 获取当前路径下siderbarItem
  const currentSiderbarItem = computed(()=>{
    return siderbarItemMap[resolvedUrl(route.path)]
  })


  // 递归解析siderbar
  function resolvesSiderbar(items: SidebarItem[]) {
    for(const item of items) {
      const frontmatter = frontmatterMap[item.link!]
      // 更新 text
      if(frontmatter?.text) item.text = frontmatter.text

      // 递归子项
      if(Array.isArray(item.items) && item.items.length > 0) resolvesSiderbar(item.items)
    }
  }

  
  resolvesSiderbar(clonedSiderbar)
  return {
    siderbar: clonedSiderbar,
    frontmatterMap,
    currentSiderbarItem
  }

}