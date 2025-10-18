<script lang="ts" setup>
import { useRoute, useRouter } from "vitepress";
import { onMounted, type PropType, ref } from "vue";
import { type SidebarItem } from "@/types/sider";
import { hasChildren } from "@/theme/utils/sider";
import { useSiderbar } from "../composables/siderbar";
const router = useRouter();
const baseUrl = "/10share-docs";
const { getItemText } = useSiderbar()

const siderBarItemsWrapper = ref<HTMLElement>();

const isChildsiderBarItemsShow = ref<Record<string, boolean>>({});
const childsiderBarItems = ref<Record<string, Element>>({});

const { siderBarItems } = defineProps({
  siderBarItems: {
    type: Array as PropType<SidebarItem[]>,
    default: () => [],
  },
});


onMounted(() => {
  siderBarItems.forEach((siderBarItem) => {
    if (siderBarItem.items) {
      siderBarItem.items!.forEach((child) => {
        isChildsiderBarItemsShow.value[child.link!] = false;
      });
    }
  });
});

function handleClick(item:SidebarItem) {
  const toUrl = (item.items?.length ?? 0) === 0  ? baseUrl+item.link! : baseUrl+item.link!+'/'
  router.go(toUrl)
}

function handleExpend(event: PointerEvent, url: string) {
  const button = event.target as HTMLElement;
  const open = button.classList.contains("expend-btn-active");

  button.classList.toggle("expend-btn-active");

  const collapse = childsiderBarItems.value[url] as HTMLElement;
  const inner = collapse.firstElementChild as HTMLElement;

  if (!open) {
    siderBarItemsWrapper.value!.style = `height: auto;`;
    const height = inner.scrollHeight + "px";
    collapse.style = `height: ${height};`;
  } else {
    collapse.style = `height: 0; animation: expandBounce 0.35s cubic-bezier(.2,.8,.2,1);`;
  }
}

function handleMounted(el: Element, url: string) {
  childsiderBarItems.value[url] = el;
}
</script>
<template>
  <div class="siderBarItems-wrapper" ref="siderBarItemsWrapper">
    <ul class="siderBarItem__list">
      <li
        v-for="siderBarItem in siderBarItems"
        :key="siderBarItem.link"
        class="siderBarItem__list-item"
      >
        <div
          class="siderBarItem__list-item-content"
          @click="handleClick(siderBarItem)"
        >
          <a v-if="hasChildren(siderBarItem)">{{getItemText(siderBarItem)}}</a>
          <template v-else>
            <a>{{ siderBarItem.text }}</a>
            <div
              aria-expanded="false"
              class="expend-btn"
              @click.stop="handleExpend($event, siderBarItem.link!)"
            ></div>
          </template>
        </div>
        <Menus
          ref="siderBarItemsRef"
          v-if="siderBarItem.items && siderBarItem.items!.length !== 0"
          @vue:mounted="({el})=>handleMounted(el as Element, siderBarItem.link!)"
          :siderBarItems="siderBarItem.items"
        ></Menus>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.siderBarItem__list {
  padding-left: 10px;
}

.siderBarItem__list-item {
  list-style: none;
}
.siderBarItem__list-item-content {
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  height: 32px;
}

.siderBarItem__list-item-content:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}

.siderBarItem__list-item-content .expend-btn {
  height: 100%;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.siderBarItem__list-item-content .expend-btn::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("../assets/icons/menu-sublist.svg") 50% / 2rem 2rem;
  transform: rotate(90deg);
  transition: transform 220ms ease-in-out;
}

.siderBarItem__list-item-content .expend-btn-active::before {
  transform: rotate(180deg);
}

.siderBarItem__list-item-content .expend-btn:hover {
  background-color: #e6e6e6;
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

.siderBarItems-wrapper {
  height: 0;
  overflow: hidden;
  transition: height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.siderBarItems-wrapper:nth-child(1) {
  height: auto;
}
.siderBarItems-wrapper .siderBarItem__list {
  transform-origin: top;
  animation: none;
}
</style>
