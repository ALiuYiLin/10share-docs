<script setup lang="ts">
import { useData } from 'vitepress'
// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()

console.log('frontmatter: ', frontmatter.value);
console.log('site: ', site.value);
</script>

<template>
  <div class="wl-header">
    <div class="wl-navbar">
      <div class="wl-navbar-item">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <div class="wl-navbar-item">
        <span>whale-docs</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wl-header {
  height: 60px;
  box-shadow: 0 1px 2px 0 #0000001a;
  width: 100%;
  background: #fff;
  z-index: 10;
  position: fixed;
  top: 0;
}
.wl-navbar {
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
  gap: 8px;
}
.wl-navbar-item {
  height: 44px;
  display: flex;
  align-items: center;
}
.wl-navbar-item img {
  display: inline;
  height: 100%;
}

</style>
  