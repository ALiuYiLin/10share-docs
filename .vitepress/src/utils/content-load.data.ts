import { createContentLoader, type ContentData } from "vitepress";

import { config } from "../config";

declare const data: ContentData[]
export { data };

export default createContentLoader("**/*.md", {globOptions: {cwd: config.project.DOCS_ROOT}})