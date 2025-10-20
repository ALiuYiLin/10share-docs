<script setup lang="ts">
import '@/assets/style/base.css'
import { useSiderBar } from '@/composables/use-siderbar'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Siderbar from '@/components/Siderbar.vue'
const { siderbar, frontmatterMap } = useSiderBar()
console.log('siderbar: ', siderbar)
</script>

<template>
  <div class="layout relative">
    <Header></Header>
    <main>
      <Siderbar></Siderbar>
      <div class="main-content">
        <Content class="flex-1"></Content>
        <Footer></Footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
main {
  min-height: calc(100vh - 60px);
}
.main-content {
  @apply flex flex-col ml-[300px]  justify-center;
}
</style>
