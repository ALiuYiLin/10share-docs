<script lang="ts" setup>
import { useSiderBar } from '@/composables/use-siderbar';
import SiderbarItem from './SiderbarItem.vue';
import { useTemplateRef } from 'vue';
const { siderbar } = useSiderBar()
const pmenu = useTemplateRef('pmenu')
</script>
<template>
  <aside class="siderbar">
    <ul class="sidebar__menu" ref="pmenu">
      <SiderbarItem v-for="item in siderbar[0].items" :p-menu="pmenu" :siderbar-item="item" :key="item.link"></SiderbarItem>
    </ul>
  </aside>
</template>

<style scoped>
.siderbar {
  width: 300px;
  height: calc(100vh - 60px);
  z-index: 100;
  overflow-y: scroll;
  background: #fff;
  @apply fixed top-[60px] left-0;
}
</style>
