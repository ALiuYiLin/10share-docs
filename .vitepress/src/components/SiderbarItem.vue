<template>
  <li class="sidebar-item">
    <!-- 菜单项内容 -->
    <div 
      class="sidebar-item__content"
      :class="{ 'active': isActive, 'has-children': hasChildren }"
      @click="handleClick"
      role="menuitem"
      :aria-haspopup="hasChildren ? 'true' : 'false'"
      :aria-expanded="isExpanded ? 'true' : 'false'"
    >
      <!-- 图标 -->
      <span class="sidebar-item__icon" v-if="item.icon">
        <i :class="item.icon"></i>
      </span>
      
      <!-- 文本 -->
      <span class="sidebar-item__text">{{ item.text }}</span>
      
      <!-- 展开/折叠按钮 -->
      <button 
        v-if="hasChildren"
        class="sidebar-item__expand-btn"
        @click.stop="handleExpand"
        aria-label="展开子菜单"
      >
        <i class="icon-arrow" :class="{ 'rotate': isExpanded }"></i>
      </button>
    </div>
    
    <!-- 子菜单 -->
    <transition name="sidebar-submenu">
      <ul 
        v-if="hasChildren && isExpanded"
        class="sidebar-submenu"
        role="menu"
        :aria-labelledby="item.id"
      >
        <SidebarItem 
          v-for="child in item.items"
          :key="child.id || child.link"
          :item="child"
          :active-path="activePath"
          @update:active-path="handleActivePathUpdate"
        />
      </ul>
    </transition>
  </li>
</template>

<script setup lang="ts">
import { ref, computed, inject, provide } from 'vue';
import { useRoute } from 'vitepress';

// 定义类型
interface SidebarItemProps {
  item: {
    id?: string;
    text: string;
    link?: string;
    icon?: string;
    items?: SidebarItemProps['item'][];
    disabled?: boolean;
  };
  activePath?: string;
}

// 定义props
const props = defineProps<SidebarItemProps>();

// 定义emits
const emit = defineEmits<{
  (e: 'update:active-path', path: string): void;
}>();

// 获取路由信息
const route = useRoute();

// 检查是否有子菜单
const hasChildren = computed(() => {
  return props.item.items && props.item.items.length > 0;
});

// 检查是否为激活状态
const isActive = computed(() => {
  if (!props.item.link) return false;
  return props.activePath ? props.activePath === props.item.link : route.path === props.item.link;
});

// 展开/折叠状态
const isExpanded = ref(false);

// 处理点击事件
const handleClick = () => {
  if (props.item.disabled) return;
  
  // 如果有子菜单，切换展开/折叠状态
  if (hasChildren.value) {
    isExpanded.value = !isExpanded.value;
    return;
  }
  
  // 如果有链接，导航到对应页面
  if (props.item.link) {
    emit('update:active-path', props.item.link);
  }
};

// 处理展开/折叠按钮点击
const handleExpand = () => {
  if (props.item.disabled) return;
  isExpanded.value = !isExpanded.value;
};

// 处理子菜单激活路径更新
const handleActivePathUpdate = (path: string) => {
  emit('update:active-path', path);
};

// 初始化：如果当前菜单项是激活的，自动展开其父菜单
const initExpandState = () => {
  if (hasChildren.value && props.activePath) {
    const isChildActive = props.item.items?.some(
      child => child.link === props.activePath || 
               (child.items && child.items.some(subChild => subChild.link === props.activePath))
    );
    
    if (isChildActive) {
      isExpanded.value = true;
    }
  }
};

// 初始化展开状态
initExpandState();
</script>

<style scoped>
.sidebar-item {
  position: relative;
  list-style: none;
}

.sidebar-item__content {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.sidebar-item__content:hover {
  background-color: #f5f5f5;
}

.sidebar-item__content.active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.sidebar-item__content.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.sidebar-item__icon {
  margin-right: 0.5rem;
  font-size: 1rem;
}

.sidebar-item__text {
  flex: 1;
}

.sidebar-item__expand-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: #666;
  transition: transform 0.2s;
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

.sidebar-submenu {
  padding-left: 1.5rem;
  background-color: #fafafa;
  overflow: hidden;
}

/* 过渡动画 */
.sidebar-submenu-enter-active,
.sidebar-submenu-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
}

.sidebar-submenu-enter-from,
.sidebar-submenu-leave-to {
  max-height: 0;
  opacity: 0;
}

.sidebar-submenu-enter-to,
.sidebar-submenu-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
