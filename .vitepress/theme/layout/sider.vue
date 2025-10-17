<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';
import Menus from './menus.vue'
const { theme } = useData()
const siderItems = computed(()=>{
  return theme.value.sidebar[0].items
})

// console.log('siderItems: ', siderItems.value);
</script>
<template>
  <div class="wl-sider" ref="sider">
    <Menus :siderBarItems="siderItems"></Menus>
  </div>
</template>

<style scoped>
.wl-sider {
  --wl-sider-width: 300px;
  height: 100vh;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  width: var(--wl-sider-width);
  padding-right: 10px;
  overflow-y: scroll;
  padding-top: 76px;

}


@media screen and (max-width: 996px) {
  .wl-sider {
    --wl-sider-width: 0;
  }
}
</style>