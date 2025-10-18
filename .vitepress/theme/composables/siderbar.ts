import { useData, useRoute, type ContentData } from "vitepress";
import { type SidebarItem } from "@/types/sider";
import { watch, ref } from "vue";
import { BASE_URL } from "@/theme/constance";
import { isEmpty, isUndefined } from "lodash";
import { data } from "@/theme/posts.data";
import { hasChildren } from "@/theme/utils/sider";
export type SiderBarItemsMap = {
  [key: string]: SidebarItem;
};

function buildSiderBarItemsMap(items: SidebarItem[]) {
  let map: SiderBarItemsMap = {};
  items.forEach((item) => {
    const flag = hasChildren(item);
    map[flag ? item.link! + "/" : item.link!] = item;
    if (item.items) {
      map = { ...map, ...buildSiderBarItemsMap(item.items) };
    }
  });
  return map;
}

export function useSiderbar() {
  const { theme } = useData();
  const route = useRoute();
  const siderBar = theme.value.sidebar[0] as SidebarItem;
  const siderBarItems = siderBar.items as SidebarItem[];
  const siderBarItemsMap = buildSiderBarItemsMap([theme.value.sidebar[0]]);
  const currentSiderBarItem = ref<SidebarItem | null>(null);
  const contentDataMap = data.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.url.endsWith(".html") ? cur.url.replace(".html", "") : cur.url]: cur,
    }),
    {}
  ) as { [key: string]: ContentData };
  console.log("contentDataMap: ", contentDataMap);
  function getPageExcerpt(item: SidebarItem) {
    if (contentDataMap[item.link!]) {
      return contentDataMap[item.link!]?.frontmatter.except || "";
    }
    return "";
  }

  function getItemText(item: SidebarItem) {
    // 1️⃣ 优先从 item.text 取文本
    let text = item.text;

    // 2️⃣ 安全获取 link
    const link = item.link ?? "";
    const url = hasChildren(item) ? `${link.replace(/\/$/, "")}/` : link;

    // 3️⃣ 查找对应内容
    const pageData = contentDataMap?.[url];

    // 4️⃣ 如果 frontmatter 中存在 text 字段，优先使用
    if (pageData?.frontmatter?.text) {
      text = pageData.frontmatter.text;
    }

    return text;
  }
  watch(
    () => route.path,
    (newPath) => {
      let url = decodeURIComponent(newPath);
      url = url.replace(BASE_URL, "");
      currentSiderBarItem.value = !isUndefined(siderBarItemsMap[url])
        ? siderBarItemsMap[url]!
        : null;
    },
    { immediate: true }
  );

  return {
    siderBar,
    siderBarItems,
    siderBarItemsMap,
    currentSiderBarItem,
    contentDataMap,
    getPageExcerpt,
    getItemText,
  };
}
