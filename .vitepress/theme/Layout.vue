<script setup lang="ts">
import Header from "./layout/header.vue";
import Sider from "./layout/sider.vue";
import { data as posts } from "./posts.data";
// console.log('posts: ', posts);
import { useData, useRoute } from "vitepress";
import Folder from "./layout/folder/folder.vue";
// https://vitepress.dev/reference/runtime-api#usedata
const route = useRoute();
const { frontmatter } = useData();

</script>

<template>
  <div class="wl-layout">
    <Header></Header>
    <div class="wl-content">
      <Sider></Sider>
      <main>
        <div class="main-content">
          <h1>{{ frontmatter.title }}</h1>
          <div v-if="route.path.endsWith('/')">
            <Folder></Folder>
          </div>
          <Content v-else class="vp-doc" />
          <h1 class="main-content--bottom"></h1>
        </div>
      </main>
    </div>
  </div>
</template>
<style scoped>

.main-content > h1{
  font-size: 3rem;
  line-height: normal;
  padding: 16px;
  padding-left: 16px;
}

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
  /* padding-bottom: 60px; */
}
main {
  flex: 1;
  width: 100%;
  overflow-y: scroll;
  padding-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
main .main-content {
  width: 1190px;
  padding-inline: 16px;
}
.main-content--bottom {
  visibility: hidden;
}
</style>
