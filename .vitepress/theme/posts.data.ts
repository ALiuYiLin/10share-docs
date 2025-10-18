import path from "path";
import { createContentLoader, type ContentData } from "vitepress";



const docsRoot = path.resolve(__dirname, "../../docs");

declare const data: ContentData[]
export { data };

export default createContentLoader("**/*.md", {globOptions: {cwd: docsRoot}})
