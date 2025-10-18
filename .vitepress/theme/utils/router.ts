import { useRouter } from "vitepress";
import { type SidebarItem } from "@/types/sider";
import { isEmpty, isUndefined } from "lodash";

export function useRouterUtils() {
  const router = useRouter();
  const baseUrl = "/10share-docs";
  function routerPush(url: string) {
    console.log('url: ', url);
    router.go(url);
  }
  function routerPushBySiderBarItem(siderBarItem: SidebarItem) {
    if (isUndefined(siderBarItem.items) && isEmpty(siderBarItem.items))
      siderBarItem.link ? routerPush(baseUrl + siderBarItem.link) : 0;
    else siderBarItem.link ? routerPush(baseUrl + siderBarItem.link + "/") : 0;
  }
  return {
    routerPush,
    routerPushBySiderBarItem
  };
}
