<script lang="ts" setup>
import { useRoute, useRouter } from "vitepress";
import {  ref, watch } from "vue";
import { useSiderbar } from "../../composables/siderbar";
import { type SidebarItem } from "../../../types/sider";
const route = useRoute();
const router = useRouter()
const { siderBarItemsMap } = useSiderbar()
const baseUrl = '/10share-docs'
const currentSiderBar = ref<SidebarItem|null>(null)

watch(()=>route.path,(newPath)=>{
  let url = decodeURIComponent(newPath)
  url = url.endsWith('/') ? url.slice(0, -1) : url
  url = url.replace(baseUrl,'')
  currentSiderBar.value = siderBarItemsMap[url]
},{immediate: true})


function go(item: SidebarItem){
  let url = !!item.items ? baseUrl + item.link + '/' : baseUrl + item.link
  console.log('url: ', url);
  router.go(url)
}

</script>
<template>
  <div class="wl-folder">
    <div class="main-folder">
      <div v-for="item in currentSiderBar?.items" class="folder-child">
        <a @click="go(item)">
          <p>{{ !!item.items  ?'🗃️':'📄' }}{{ item.text }}</p>
          <p v-if="!!item.items">{{ item.items!.length }}个项目</p>
          <p v-else class="text--truncate">{{  }}</p>
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
