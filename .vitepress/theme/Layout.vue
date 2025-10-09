<script setup lang="ts">
import { useData } from "vitepress";
import Header from "./layout/header.vue";
import Sider from "./layout/sider.vue";
import { data as posts } from "./posts.data";
console.log("posts: ", posts);

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();
</script>

<template>
  <div class="wl-layout">
    <Header></Header>
    <div class="wl-content">
      <Sider :menus="posts.menus"></Sider>
      <main>
        <Content class="vp-doc"/>
        <footer>123</footer>
      </main>
    </div>
  </div>
</template>
<style scoped>  
.wl-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.wl-content {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
}
main {
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  padding-top: 60px;
}
</style>