<script lang="ts" setup>
import { useRouter } from 'vitepress';
const router = useRouter();
type Menu = {
  title: string
  url: string
  children: Menu[]
}

interface Props {
  menus?: Menu[]
}

withDefaults(defineProps<Props>(), {})
function handleClick(url: string) {
  console.log('url: ', url.split('.')[0]);
  router.go(url.split('.')[0]);
}

</script>
<template>
  <div class="wl-aside-menus">
    <ul>
      <li v-for="menu in menus" :key="menu.url">
        <span @click="handleClick(menu.url)">{{ menu.title }}</span>
        <ul v-if="menu.children.length > 0">
          <li v-for="subMenu in menu.children" :key="subMenu.url">
            <span @click="handleClick(subMenu.url)">{{ subMenu.title }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>