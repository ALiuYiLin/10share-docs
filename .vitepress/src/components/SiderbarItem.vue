<script lang="ts" setup>
import { onBeforeMount, useTemplateRef, type PropType } from 'vue';

const props = defineProps({
  siderbarItem: {
    type: Object as PropType<SidebarItem>,
      required: true
    },
  pMenu: {
    type: Object as PropType<HTMLUListElement  | null>,
  }
})
const subMenu = useTemplateRef('submenu')
function handlerExpend(){
  const h = subMenu.value!.clientHeight
  const height = subMenu.value!.scrollHeight + "px";
  if(h === 0) {
    subMenu.value!.style =  `height: ${height};`
    props.pMenu!.style = 'height: auto;'
  }
  else subMenu.value!.style =  `height: 0;`
}
</script>
<template>
  <li class="siderbar-item">
    <div class="sidebar-item__content">
      <!-- 图标 -->
      <!-- 文本 -->
      <span class="sidebar-item__text">{{ siderbarItem.text }}</span>
      <!-- 展开折叠按钮 -->
      <button class="sidebar-item__expand-btn" v-if="siderbarItem.collapsed" @click="handlerExpend">
        <i class="icon-arrow"></i>
      </button>
    </div>
    <!-- 子菜单 -->
    <ul class="sidebar-submenu" ref="submenu">
      <SiderbarItem v-for="item in siderbarItem.items" :p-menu="subMenu" :siderbar-item="item" :key="item.link"></SiderbarItem>
    </ul>
  </li>
</template>

<style scoped>
.sidebar-submenu {
  height: 0;
  overflow: hidden;
  transition: height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.icon-arrow {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-top: 1px solid currentColor;
  border-right: 1px solid currentColor;
  transform: rotate(45deg);
  transition: transform 0.2s;
}

.icon-arrow.rotate {
  transform: rotate(135deg);
}

@keyframes expandBounce {
  0% {
    transform: scaleY(0.3);
    opacity: 0;
  }
  50% {
    transform: scaleY(1.15);
    opacity: 1;
  }
  70% {
    transform: scaleY(0.95);
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}


</style>
