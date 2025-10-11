<script setup lang="ts">
import Header from "./layout/header.vue";
import Sider from "./layout/sider.vue";
import { type Menu, data as posts } from "./posts.data";
console.log("posts: ", posts);
import { useData, useRoute } from "vitepress";
import Folder from "./layout/folder/folder.vue";
import { onMounted } from "vue";
// https://vitepress.dev/reference/runtime-api#usedata
const route = useRoute();
const { frontmatter } = useData();

function getMenus(menus: Menu[], url: string): Menu[] {
  if (url === "/") {
    return menus;
  }
  const childrenMenus: Menu[] = [];
  menus.forEach((item) => {
    if (item.url === url) {
      childrenMenus.push(...item.children);
    } else {
      childrenMenus.push(...getMenus(item.children, url));
    }
  });
  return childrenMenus;
}

onMounted(() => {
  console.log(getMenus(posts.menus, "/sss/"));
});
</script>

<template>
  <div class="wl-layout">
    <Header></Header>
    <div class="wl-content">
      <Sider :menus="posts.menus"></Sider>
      <main>
        <div class="main-content">
          <h1>{{ frontmatter.title }}</h1>
          <div v-if="route.path.endsWith('/')">
            <Folder :menus="getMenus(posts.menus, route.path)"></Folder>
          </div>
          <Content v-else class="vp-doc" />
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
  padding-left: 0;
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
}
</style>
