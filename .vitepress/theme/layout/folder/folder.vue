<script lang="ts" setup>
import { computed, ref, watch, watchEffect, type PropType } from "vue";
import { type Menu ,data as posts} from "../../posts.data";
import { useRoute, useRouter } from "vitepress";
const route = useRoute();
const router = useRouter();
const baseUrl = '/10share-docs'
const menus = computed(() => {
  // console.log('posts.map',posts.map);
  // console.log('route.path',decodeURIComponent(route.path));
  return posts.map[decodeURIComponent(route.path).replace('/10share-docs','')].children || []
})

function go(url:string){
  router.go(baseUrl + url)
}

</script>
<template>
  <div class="wl-folder">
    <div class="main-folder">
      <div v-for="item in menus" class="folder-child">
        <a @click="go(item.url)">
          <p>{{ item.children.length > 0 ?'🗃️':'📄' }}{{ item.title }}</p>
          <p v-if="item.children.length > 0">{{ item.children.length }}个项目</p>
          <p v-else class="text--truncate">{{ item.excerpt }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.folder-child > a > p:nth-child(1) {
  font-size: 1.2rem;
  padding-bottom: 16px;
}

.main-folder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.main-folder .folder-child {
  --folder-child-width: 50%;
  /* flex: 0 0 var(--folder-child-width); */
  width: var(--folder-child-width);
  margin-bottom: 32px;
  padding-inline: 16px;
}

@media screen and (max-width: 996px) {
  .main-folder .folder-child {
    --folder-child-width: 100%;
  }
}


.main-folder .folder-child a {
  display: block;
  border: 1px solid #ccc;
  padding: 32px;
  box-shadow: 0 1.5px 3px 0 #00000026;
  border: 1px solid #ebedf0;
  border-radius: 6.4px;
  transition: all 200ms ease;
  transition-property: border, box-shadow;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.main-folder .folder-child a:hover {
  cursor: pointer;
  border-color: #2e8555;
  box-shadow: 0 3px 6px 0 #0003;
}

</style>
