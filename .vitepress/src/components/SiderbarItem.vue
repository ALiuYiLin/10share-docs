<script lang="ts" setup>
import { useRouter } from 'vitepress';
import { onBeforeMount, ref, useTemplateRef, type PropType } from 'vue';

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
const expended = ref(false)
const router = useRouter()
function handlerExpend(){
  const h = subMenu.value!.clientHeight
  const height = subMenu.value!.scrollHeight + "px";
  if(h === 0) {
    subMenu.value!.style =  `height: ${height};`
    props.pMenu!.style = 'height: auto;'
    expended.value = true
  }
  else {
    subMenu.value!.style =  `height: 0;`
    expended.value = false
  }
}
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
  <li class="siderbar-item">
    <div class="sidebar-item__content rounded">
      <!-- 图标 -->
      <!-- 文本 -->
      <span class="sidebar-item__text px-2 flex-1" @click="go(siderbarItem)">{{ siderbarItem.text }}</span>
      <!-- 展开折叠按钮 -->
      <button class="sidebar-item__expand-btn" v-if="siderbarItem.collapsed" @click="handlerExpend">
        <i class="icon-arrow" :class="expended ? 'rotate': ''"></i>
      </button>
    </div>
    <!-- 子菜单 -->
    <ul class="sidebar-submenu" ref="submenu">
      <SiderbarItem v-for="item in siderbarItem.items" :p-menu="subMenu" :siderbar-item="item" :key="item.link"></SiderbarItem>
    </ul>
  </li>
</template>

<style scoped>
.sidebar-item__text {
  padding: 6px 12px;
}
.siderbar-item + .siderbar-item {
  margin-top: 5px;
}
.siderbar-item ul {
  margin-left: 10px;
}
.sidebar-item__expand-btn:hover {
  @apply bg-gray-200;
}
.sidebar-item__expand-btn {
  padding: 6px 12px;
  display: flex;
  @apply rounded;
}
.sidebar-item__content:hover {
  @apply bg-gray-100;
  cursor: pointer;
}
.sidebar-item__content {
  @apply flex flex-row items-center;
}
.sidebar-submenu {
  height: 0;
  overflow: hidden;
  transition: height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.icon-arrow {
  display: inline-block;
  transition: transform 0.2s;
  background: url('@/assets/icons/sublist.svg') 50% / 2rem 2rem;
  height: 1.25rem;
  transform: rotate(180deg);
  width: 1.25rem;
  filter: none;
  content: "";
  transition: transform 200ms linear;
}

.icon-arrow.rotate {
  transform: rotate(90deg);
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
