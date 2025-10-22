<script lang="ts" setup>
import Card from '@/components/card.vue';
import { useSiderBar } from '@/composables/use-siderbar';
import { useRouter } from 'vitepress';

const { currentSiderbarItem,getExcerpt } = useSiderBar()
const router = useRouter()
function go(item: SidebarItem){
  if(item.collapsed){
    router.go('/whale-docs'+ item.link!+ '/')
  }
  else{
    router.go('/whale-docs'+ item.link!)
  }
}
</script>
<template>
  <div>
    <ul class="dir--list">
      <li v-for="item in currentSiderbarItem?.items">
        <Card >
          <div @click="go(item)">
            <!-- <p class="text-2xl">{{ item.collapsed  ?'🗃️':'📄' }}{{ item.text }}</p> -->
            <p class="text-2xl">{{ item.collapsed  ?'🗃️':'📄' }}{{ item.text }}</p>
            <p  v-if="item.collapsed">{{ item.items?.length }}个项目</p>
            <p class="text--truncate" v-else>{{ getExcerpt(item) }}</p>
          </div>
        </Card>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dir--list {
  --li-width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 960px;
}
.dir--list > li {
  width: var(--li-width);
  padding: 10px;
}

@media screen and (max-width: 996px) {
  .dir--list {
    --li-width: 100%;
  }
}

</style>