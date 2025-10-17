import path from "path";
import { createContentLoader } from "vitepress";

interface ContentData {
  url: string;
  src: string | undefined;
  html: string | undefined;
  frontmatter: Record<string, any>;
  excerpt: string | undefined;
}

const docsRoot = path.resolve(__dirname, "../../docs");

export default createContentLoader("**/*.md", {
  globOptions: {
    cwd: docsRoot,
  },
  transform(data) {
    const map: Record<string, ContentData> = {};
    data.forEach((contentData) => (map[contentData.url] = contentData));
    return map
  },
});

declare const data: Record<string, ContentData>
export { data };