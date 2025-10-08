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
  <div>
    <Header></Header>
    <div class="wl-content">
      <Sider :menus="posts.menus"></Sider>
      <Content />
    </div>
  </div>
</template>

<style scoped>
.wl-content {
  display: flex;
  flex-direction: row;
}
</style>