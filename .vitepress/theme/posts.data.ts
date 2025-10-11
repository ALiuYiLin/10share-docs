import { createContentLoader } from "vitepress";
interface ResData {
  menus: Menu[];
  map: Record<string, Menu>;
}

interface ContentData {
  url: string;
  src: string | undefined;
  html: string | undefined;
  frontmatter: Record<string, any>;
  excerpt: string | undefined;
}

export type Menu = {
  title: string;
  url: string;
  frontmatter: Record<string, any>;
  excerpt: string | undefined;
  children: Menu[];
};

declare const data: ResData;
export { data };
export default createContentLoader("./**/*.md", {
  excerpt: true,
  includeSrc: false,
  transform(raw): ResData {
    const menus = getMenus(raw);
    const map: Record<string, Menu> = {}
    getMenuMap(menus, map);
    return {
      menus,
      map,
    };
  },
});
function getMenuMap(menus: Menu[], menuMap:Record<string, Menu>) {
  if (!menuMap["/"]) {
    menuMap["/"] = {
      title: "home",
      url: "/",
      frontmatter: {},
      excerpt: undefined,
      children: menus,
    };
  }
 
  menus.forEach((item)=>{
    menuMap[item.url] = item;
    if(item.children.length > 0){
      getMenuMap(item.children, menuMap)
    }
  })
  
}

function getMenus(raw: ContentData[], url: string = "/") {
  const menus: Menu[] = raw
    .filter((p) => isDirSub(p.url, url))
    .map((p) => {
      const newMenu = {
        title: p.frontmatter.title,
        ...p,
        excerpt: p.excerpt?.match(/<p>(.*?)<\/p>/)?.[1] || "",
        children: [...getMenus(raw, p.url)],
      };
      return newMenu;
    });
  return menus;
}

function isDirSub(url: string, dir: string) {
  let p = ("/" + (url || "")).replace(/\/+/g, "/");
  if (p === dir) return false; // 不包含自己
  if (!p.startsWith(dir)) return false; // 不在该目录下

  const sub = p.slice(dir.length); // 去掉前缀
  const segments = sub.split("/").filter(Boolean); // 非空段数组
  return segments.length === 1;
}
