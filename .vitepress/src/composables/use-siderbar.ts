import { data as mdsContent} from '@/utils/content-load.data'
import { useData } from 'vitepress'
import lodash from 'lodash'
/**
 * /temp/xxx.html => /temp/xxx
 * /temp/ => /temp
 * / => ''
 * @param url 
 */
function resolvedUrl(url: string){
  if(url === '/') return ''
  if(url.endsWith('.html')) return  url.slice(0, -5)
  if(url.endsWith('/')) return url.slice(0,-1)
  return url
}



export function useSiderBar(){
  const { theme } = useData()
  const siderbar = theme.value.sidebar as SidebarItem[] 
  const clonedSiderbar = lodash.cloneDeep(siderbar)

  // 构建frontmatter映射表
  const frontmatterMap: Record<string,Record<string,any>> = Object.fromEntries(
    mdsContent.map(cur => [resolvedUrl(cur.url), cur.frontmatter])
  )

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
    frontmatterMap
  }

}