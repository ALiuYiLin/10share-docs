<script setup lang="ts">
import '@/assets/style/base.css'
import { useSiderBar } from '@/composables/use-siderbar'
const { siderbar, frontmatterMap } = useSiderBar()
console.log('siderbar: ', siderbar)
</script>

<template>
  <div class="layout min-h-screen w-1/2 text-amber-200">
    <h1>aaaaa</h1>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <header></header>
    <main>
      <aside></aside>
      <div class="main-content">
        <Content></Content>
      </div>
      <footer></footer>
    </main>
  </div>
</template>

<style scoped></style>
