// https://vitepress.dev/guide/custom-theme
import Layout from '@/theme/Layout.vue'
import type { Theme } from 'vitepress'
import './style.css'
import '@/theme/styles/vars.css'
import '@/theme/styles/base.css'
import '@/theme/styles/icons.css'
import '@/theme/styles/utils.css'
import '@/theme/styles/components/custom-block.css'
import '@/theme/styles/components/vp-code.css'
import '@/theme/styles/components/vp-code-group.css'
import '@/theme/styles/components/vp-doc.css'
import '@/theme/styles/components/vp-sponsor.css'
export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
  }
} satisfies Theme

