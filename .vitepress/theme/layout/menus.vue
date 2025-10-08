<script lang="ts" setup>
import { useRouter } from "vitepress";
import { onMounted,type PropType, ref } from "vue";
const router = useRouter();

type Menu = {
  title: string;
  url: string;
  children: Menu[];
};

interface Props {
  menus?: Menu[];
}

const menusWrapper = ref<HTMLElement>()

const isChildMenusShow = ref<Record<string, boolean>>({});
const childMenus = ref<Record<string, Element>>({});

const {menus} = defineProps({
  menus: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
});

onMounted(()=>{
    menus.forEach((menu)=>{
      menu.children.forEach((child)=>{
        isChildMenusShow.value[child.url] = false
      })
    })
})

function handleClick(url: string) {
  router.go(url.split(".")[0]);
}

function handleExpend(event: PointerEvent, url: string) {
  const button = event.target as HTMLElement;
  const open = button.classList.contains("expend-btn-active");

  button.classList.toggle("expend-btn-active");

  const collapse = childMenus.value[url] as HTMLElement
  const inner = collapse.firstElementChild as HTMLElement

  if(!open){
    menusWrapper.value!.style = `height: auto;`
    const height = inner.scrollHeight + "px"
    collapse.style = `height: ${height};`
  }
  else{
    collapse.style = `height: 0; animation: expandBounce 0.35s cubic-bezier(.2,.8,.2,1);`
  }
}

function handleMounted(el:Element,url: string) {
  childMenus.value[url] = el;
}


</script>
<template>
  <div class="menus-wrapper" ref="menusWrapper">
    <ul class="menu__list">
      <li v-for="menu in menus" :key="menu.url" class="menu__list-item">
        <div class="menu__list-item-content" @click="handleClick(menu.url)">
          <a v-if="menu.children.length === 0">{{ menu.title }}</a>
          <template v-else>
            <a>{{ menu.title }}</a>
            <div
              aria-expanded="false"
              class="expend-btn"
              @click.stop="handleExpend($event, menu.url)"
            ></div>
          </template>
        </div>
        <Menus
          ref="menusRef"
          v-if="menu.children.length !== 0"
          @vue:mounted="({el})=>handleMounted(el as Element, menu.url)"
          :menus="menu.children"
        ></Menus>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu__list {
  padding-left: 10px;
}

.menu__list-item {
  list-style: none;
}
.menu__list-item-content {
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  height: 32px;
}

.menu__list-item-content:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}

.menu__list-item-content .expend-btn {
  height: 100%;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu__list-item-content .expend-btn::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("../assets/icons/menu-sublist.svg") 50% / 2rem 2rem;
  transform: rotate(90deg);
  transition: transform 220ms ease-in-out;
}

.menu__list-item-content .expend-btn-active::before {
  transform: rotate(180deg);
}

.menu__list-item-content .expend-btn:hover {
  background-color: #e6e6e6;
}


@keyframes expandBounce {
  0%   { transform: scaleY(0.3); opacity: 0; }
  50%  { transform: scaleY(1.15); opacity: 1; }
  70%  { transform: scaleY(0.95); }
  100% { transform: scaleY(1); opacity: 1; }
}


.menus-wrapper {
  height: 0;
  overflow: hidden;
  transition: height 0.35s cubic-bezier(.2,.8,.2,1);
}

.menus-wrapper:nth-child(1) {
  height: auto;
}
.menus-wrapper .menu__list {
  transform-origin: top;
  animation: none;
}

</style>
