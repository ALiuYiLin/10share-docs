<script lang="ts" setup>
import { useSiderbar } from "@/theme/composables/siderbar";
import { useRouterUtils } from "@/theme/utils";
const { routerPushBySiderBarItem } = useRouterUtils()
const { currentSiderBarItem, getPageExcerpt,getItemText} = useSiderbar()

</script>
<template>
  <div class="wl-folder">
    <div class="main-folder">
      <div v-for="item in currentSiderBarItem?.items" class="folder-child">
        <a @click="routerPushBySiderBarItem(item)">
          <p>{{ !!item.items  ?'🗃️':'📄' }}{{ getItemText(item) }}</p>
          <p v-if="!!item.items">{{ item.items!.length }}个项目</p>
          <p v-else class="text--truncate">{{ getPageExcerpt(item) }}</p>
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
