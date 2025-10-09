// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import './style.css'
import './styles/base.css'
import './styles/vars.css'
import './styles/fonts.css'
import './styles/icons.css'
import './styles/utils.css' 
import './styles/components/vp-doc.css' 
import './styles/components/vp-code.css' 
import './styles/components/custom-block.css' 
import './styles/components/vp-code-group.css' 

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme

