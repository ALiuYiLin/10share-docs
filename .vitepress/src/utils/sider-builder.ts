import {globSync} from 'glob'
import { config } from '../config'
import path from 'path';
export function buildSidebar(cwd: string): SidebarItem {
  const isRoot = config.project.DOCS_ROOT === cwd;
  const url = "/" + path.relative(config.project.DOCS_ROOT, cwd).replace(/\\/g, "/");

  const siderBarItem: SidebarItem = {
    text: isRoot ? "首页" : path.basename(cwd),
    link: url === "/" ? "" : url,
    items: [],
  };

  // --- 读取该目录下的 .md 文件 ---
  const mdFiles = globSync("*.md", { cwd });
  if(mdFiles.length > 0 ) siderBarItem.collapsed = true
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
  if(dirs.length > 0) siderBarItem.collapsed = true
  for (const dir of dirs) {
    const subPath = path.resolve(cwd, dir);
    const subSidebar = buildSidebar(subPath);
    if (subSidebar.items?.length || subSidebar.link) {
      siderBarItem.items!.push(subSidebar);
    }
  }
  return siderBarItem;
}
