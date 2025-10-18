import type { SidebarItem } from "@/types/sider";
import { isEmpty, isUndefined } from "lodash";

export function hasChildren(item: SidebarItem){
  if(!item) return false
  return !isUndefined(item.items) && !isEmpty(item.items)
}