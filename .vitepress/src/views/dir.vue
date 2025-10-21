<script lang="ts" setup>
import Card from '@/components/card.vue';
import { useSiderBar } from '@/composables/use-siderbar';

const { currentSiderbarItem } = useSiderBar()
console.log('currentSiderbarItem: ', currentSiderbarItem);

</script>
<template>
  <div>
    <ul class="dir--list">
      <li v-for="item in currentSiderbarItem.items">
        <Card>
          <div>
            <p>{{ item.collapsed  ?'🗃️':'📄' }}{{ item.text }}</p>
            <p v-if="item.collapsed">{{ item.items?.length }}个项目</p>
            <p v-else>...</p>
          </div>
        </Card>
      </li>
    </ul>
  </div>
</template>

<style scoped>


.dir--list {
  --li-width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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