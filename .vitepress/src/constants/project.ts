import path from "path";

export const PROJECT_ROOT = path.resolve(__dirname,'../../..')

export const DOCS_ROOT = path.resolve(PROJECT_ROOT,'docs')

export const POSTCSS_CONFIG = path.resolve(PROJECT_ROOT,'postcss.config.js')

export const VITEPRESS_ROOT = path.resolve(PROJECT_ROOT,'.vitepress')

export const SRC_ROOT = path.resolve(VITEPRESS_ROOT,'src')

export const OUT_DIR = path.resolve(PROJECT_ROOT,'dist')

export const BASE_URL = '/whale-docs'


