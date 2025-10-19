<script setup lang="ts">
import { useSiderBar } from '@/composables/use-siderbar';
const {siderbar,frontmatterMap}= useSiderBar()
console.log('siderbar: ', siderbar);

</script>

<template>
  <div class="layout">
    <!-- <Content></Content> -->
  </div>
</template>

<style scoped>
</style>