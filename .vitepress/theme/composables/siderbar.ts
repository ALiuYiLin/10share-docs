import { useData } from "vitepress"
import { type SidebarItem} from "../../types/sider"

function buildSiderBarItemsMap(items:SidebarItem[]){
  let map:{[key:string]:SidebarItem} = {}
  items.forEach(item=>{
    map[item.link!] = item
    if(item.items){
      map = {...map,...buildSiderBarItemsMap(item.items)}
    }
  })
  return map
}

export function useSiderbar(){
  const { theme } = useData()

  const siderBar = theme.value.sidebar[0] as SidebarItem
  const siderBarItems = siderBar.items as SidebarItem[]
  const siderBarItemsMap = buildSiderBarItemsMap(siderBarItems)

  return {
    siderBar,
    siderBarItems,
    siderBarItemsMap
  }
}


