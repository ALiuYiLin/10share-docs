import path from 'path'
import { createContentLoader } from 'vitepress'
interface ResData {
  menus: Menu[]
  posts: Post[]
}

interface Post {
  title: string
  url: string
  date: {
    time: number
    string: string
  }
  excerpt: string | undefined
  menu: string | undefined
  src: string | undefined
}



interface ContentData {
    url: string;
    src: string | undefined;
    html: string | undefined;
    frontmatter: Record<string, any>;
    excerpt: string | undefined;
}


declare const data: ResData
export { data }

export default createContentLoader('./**/*.md', {
  excerpt: true,
  includeSrc: false,
  transform(raw): ResData {
    const menus = getMenus(raw)
    console.log('menus: ', menus);
    return {
      menus,
      posts: raw
        .map(({ url, frontmatter, excerpt, src }) => ({
          title: frontmatter.title,
          url,
          excerpt,
          date: formatDate(frontmatter.date),
          menu: frontmatter.menu,
          src
        }))
        .sort((a, b) => b.date.time - a.date.time)
    }
  }
})

function formatDate(raw: string): Post['date'] {
  const date = new Date(raw)
  date.setUTCHours(12)
  return {
    time: +date,
    string: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}


type Menu = {
  title: string
  url: string
  children: Menu[]
}


function getMenus(raw: ContentData[], url: string = '/') {
  const menus: Menu[] = raw.filter(p => isDirSub(p.url, url))
    .map(p => ({
      title: p.frontmatter.title,
      url: p.url,
      children: [...getMenus(raw, p.url)]
    }))
  return menus
}

function isDirSub(url:string , dir: string) {
  let p = ('/' + (url || '')).replace(/\/+/g, '/');
  if (p === dir) return false;         // 不包含自己
  if (!p.startsWith(dir)) return false; // 不在该目录下

  const sub = p.slice(dir.length);                // 去掉前缀
  const segments = sub.split('/').filter(Boolean); // 非空段数组
  return segments.length === 1;
}


