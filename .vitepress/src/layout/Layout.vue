<script setup lang="ts">
import '@/assets/style/base.css'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Siderbar from '@/components/Siderbar.vue'
import { useLayout } from '@/router'
const { currentView } = useLayout()

</script>

<template>
  <div class="layout relative">
    <Header></Header>
    <main>
      <Siderbar></Siderbar>
      <div class="main-content">
         <div class="flex-1 p-5">
            <component :is="currentView"></component>
         </div>
        <Footer></Footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}
.main-content {
  min-height: calc(100vh - 60px);
  @apply flex flex-col ml-[300px]  justify-center;
}

@media screen and (max-width: 996px) {
  .main-content{
    margin-left: 0;
  }
}
</style>
