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