import { globSync } from "glob";
import path from "path";
import { createContentLoader, defineConfig } from "vitepress";
import { SidebarItem } from "./types/sider";
// https://vitepress.dev/reference/site-config
const docsRoot = path.resolve(__dirname, "../docs");

export default defineConfig({
  srcDir: path.resolve(__dirname, "../docs"),
  title: "10share-docs",
  description: "A VitePress Site",
  outDir: path.resolve(__dirname, "../dist"),
  base: "/10share-docs/",
  markdown: {
    frontmatter: {
      renderExcerpt: false,
      grayMatterOptions: {
        excerpt: true,
      },
    },
  },
  themeConfig: {
    sidebar: [buildSidebar(docsRoot)],
  },
});


export function buildSidebar(cwd: string): SidebarItem {
  const isRoot = docsRoot === cwd;
  const url = "/" + path.relative(docsRoot, cwd).replace(/\\/g, "/");

  const siderBarItem: SidebarItem = {
    text: isRoot ? "首页" : path.basename(cwd),
    link: url === "/" ? "" : url,
    items: [],
  };

  // --- 读取该目录下的 .md 文件 ---
  const mdFiles = globSync("*.md", { cwd });

  for (const filename of mdFiles) {
    const fileUrl = url === "/" ? `/${filename}` : `${url}/${filename}`;

    // index.md 通常作为当前目录入口
    if (filename === "index.md") {
      continue;
    }

    siderBarItem.items!.push({
      text: path.basename(filename, ".md"),
      link: fileUrl.replace('.md',''),
    });
  }

  // --- 递归子文件夹 ---
  const dirs = globSync("*/", { cwd });
  for (const dir of dirs) {
    const subPath = path.resolve(cwd, dir);
    const subSidebar = buildSidebar(subPath);
    if (subSidebar.items?.length || subSidebar.link) {
      siderBarItem.items!.push(subSidebar);
    }
  }
  return siderBarItem;
}
