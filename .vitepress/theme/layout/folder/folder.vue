<script lang="ts" setup>
import { onMounted, type PropType } from 'vue';
import { type Menu } from '../../posts.data';
import { useRouter } from 'vitepress';
const router = useRouter()
const props = defineProps({
  menus: {
    type: Array as PropType<Menu[]>,
  }
})

</script>
<template>
  <div class="main-folder">
    <div v-for="item in menus" class="folder-child">
      <a @click="router.go(item.url)">
        <p>{{ item.title }}</p>
        <p>{{ item.children.length }}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.main-folder {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.main-folder .folder-child {
  flex: 0 0 50%;
  margin-bottom: 32px;
  padding-inline: 16px;
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
}

.main-folder .folder-child a:hover {
  cursor: pointer;
  border-color: #2e8555;
  box-shadow: 0 3px 6px 0 #0003;
}

</style>