<script lang="ts" setup>
import Menus from './menus.vue';
type Menu = {
  title: string
  url: string
  children: Menu[]
}

interface Props {
  menus?: Menu[]
}

withDefaults(defineProps<Props>(), {})


</script>
<template>
  <div class="wl-sider">
    <Menus :menus="menus"></Menus>
  </div>
</template>

<style scoped>
.wl-sider {
  height: calc(100vh - 60px);
  background-color: #fff;
  border: 1px solid #e5e5e5;
  min-width: 300px;
  padding-right: 10px;
}
</style>