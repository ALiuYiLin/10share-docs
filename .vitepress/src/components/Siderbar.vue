<template>
  <div 
    class="sidebar"
    :class="{ 'collapsed': isCollapsed }"
    role="navigation"
    aria-label="侧边导航栏"
  >
    <!-- 侧边栏头部 -->
    <div class="sidebar__header" v-if="showHeader">
      <slot name="header">
        <h2 class="sidebar__title">{{ title }}</h2>
      </slot>
    </div>
    
    <!-- 菜单列表 -->
    <div class="sidebar__menu-container" ref="menuContainer">
      <ul class="sidebar__menu" role="menu">
        <template v-if="useVirtualScroll && items.length > virtualScrollThreshold">
          <!-- 虚拟滚动列表 -->
          <div 
            class="sidebar__virtual-list"
            ref="virtualList"
            @scroll="handleScroll"
          >
            <div 
              class="sidebar__virtual-list-container"
              :style="{ height: `${totalHeight}px` }"
            >
              <div 
                class="sidebar__virtual-list-items"
                :style="{ transform: `translateY(${offsetTop}px)` }"
              >
                <SidebarItem
                  v-for="(item, index) in visibleItems"
                  :key="item.id || item.link || index"
                  :item="item"
                  :active-path="activePath"
                  @update:active-path="handleActivePathUpdate"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <!-- 普通列表 -->
          <SidebarItem
            v-for="(item, index) in items"
            :key="item.id || item.link || index"
            :item="item"
            :active-path="activePath"
            @update:active-path="handleActivePathUpdate"
          />
        </template>
      </ul>
    </div>
    
    <!-- 折叠/展开按钮 -->
    <button 
      v-if="showToggle"
      class="sidebar__toggle-btn"
      @click="toggleCollapse"
      aria-label="折叠侧边栏"
    >
      <i class="icon-toggle" :class="{ 'rotate': isCollapsed }"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import SidebarItem from './SiderbarItem.vue';
import { useRoute, useRouter } from 'vitepress';

// 定义类型
interface SidebarItem {
  id?: string;
  text: string;
  link?: string;
  icon?: string;
  items?: SidebarItem[];
  disabled?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
  showHeader?: boolean;
  showToggle?: boolean;
  defaultCollapsed?: boolean;
  useVirtualScroll?: boolean;
  virtualScrollThreshold?: number;
  itemHeight?: number;
}

// 定义props
const props = withDefaults(defineProps<SidebarProps>(), {
  title: '侧边导航',
  showHeader: true,
  showToggle: true,
  defaultCollapsed: false,
  useVirtualScroll: false,
  virtualScrollThreshold: 20,
  itemHeight: 48
});

// 定义emits
const emit = defineEmits<{
  (e: 'update:active-path', path: string): void;
  (e: 'update:collapsed', collapsed: boolean): void;
}>();

// 获取路由和路由器
const route = useRoute();
const router = useRouter();

// 状态管理
const isCollapsed = ref(props.defaultCollapsed);
const activePath = ref(route.path);
const menuContainer = ref<HTMLElement | null>(null);
const virtualList = ref<HTMLElement | null>(null);

// 虚拟滚动相关状态
const totalHeight = ref(0);
const offsetTop = ref(0);
const visibleCount = ref(0);
const startIndex = ref(0);
const visibleItems = ref<SidebarItem[]>([]);

// 计算总高度
const calculateTotalHeight = () => {
  if (props.useVirtualScroll) {
    totalHeight.value = props.items.length * props.itemHeight;
  }
};

// 计算可视区域内的项目
const calculateVisibleItems = () => {
  if (!virtualList.value || !props.useVirtualScroll) return;
  
  const scrollTop = virtualList.value.scrollTop;
  const clientHeight = virtualList.value.clientHeight;
  
  // 计算开始索引
  startIndex.value = Math.floor(scrollTop / props.itemHeight);
  
  // 计算可见项目数量
  visibleCount.value = Math.ceil(clientHeight / props.itemHeight) + 2; // 额外添加2个项目作为缓冲
  
  // 确保不超出边界
  const endIndex = Math.min(startIndex.value + visibleCount.value, props.items.length);
  
  // 更新可视项目
  visibleItems.value = props.items.slice(startIndex.value, endIndex);
  
  // 更新偏移量
  offsetTop.value = startIndex.value * props.itemHeight;
};

// 处理滚动事件
const handleScroll = () => {
  calculateVisibleItems();
};

// 处理激活路径更新
const handleActivePathUpdate = (path: string) => {
  activePath.value = path;
  emit('update:active-path', path);
  
  // 如果提供了链接，导航到对应页面
  if (path) {
    router.go(path);
  }
};

// 切换折叠/展开状态
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('update:collapsed', isCollapsed.value);
};

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    activePath.value = newPath;
  }
);

// 监听项目变化
watch(
  () => props.items,
  () => {
    calculateTotalHeight();
    calculateVisibleItems();
  },
  { deep: true }
);

// 初始化
onMounted(() => {
  calculateTotalHeight();
  
  if (props.useVirtualScroll && virtualList.value) {
    calculateVisibleItems();
    
    // 添加滚动事件监听
    virtualList.value.addEventListener('scroll', handleScroll);
  }
  
  // 设置初始激活路径
  activePath.value = route.path;
});
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #eee;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar__header {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.sidebar__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1890ff;
}

.sidebar__menu-container {
  flex: 1;
  overflow: hidden;
}

.sidebar__menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sidebar__virtual-list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.sidebar__virtual-list-container {
  position: relative;
}

.sidebar__virtual-list-items {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.sidebar__toggle-btn {
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.icon-toggle {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-top: 1px solid #666;
  border-right: 1px solid #666;
  transform: rotate(45deg);
  transition: transform 0.2s;
}

.icon-toggle.rotate {
  transform: rotate(225deg);
}

/* 折叠状态样式 */
.sidebar.collapsed .sidebar__title,
.sidebar.collapsed .sidebar-item__text,
.sidebar.collapsed .sidebar-item__expand-btn {
  display: none;
}

.sidebar.collapsed .sidebar-item__content {
  justify-content: center;
  padding: 0.75rem;
}

.sidebar.collapsed .sidebar-item__icon {
  margin-right: 0;
}
</style>
