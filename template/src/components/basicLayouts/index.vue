<!--
 * @Author: zhangping
 * @Date: 2024-05-13 13:43:00
 * @Description: 布局组件：顶部导航栏+左侧侧边栏菜单
-->

<template>
    <el-container class="bl">
        <el-aside :width="menuSideWidth" class="bl-aside"><SideMenu /></el-aside>
        <el-container>
            <el-header class="bl-header">
                <HeaderTool />
                <HeaderTabs />
            </el-header>
            <el-main class="bl-main mt-5">
                <router-view v-slot="{ Component, route }">
                    <keep-alive :exclude="[]">
                        <component :is="Component" :key="route.name" v-if="route.meta.cache" />
                    </keep-alive>
                    <component :is="Component" :key="route.name" v-if="!route.meta.cache" />
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { computed } from 'vue';
import SideMenu from './sideMenu';
import HeaderTool from './headerTool';
import HeaderTabs from './headerTabs';
import { useLayoutStore } from '@/store';

const layoutStore = useLayoutStore();

// 左侧菜单栏宽度
const menuSideWidth = computed(() => {
    return layoutStore.layoutInfo.isMenuCollapse ? '70px' : '210px';
});
</script>

<style lang="less" scoped>
.bl {
    height: 100%;
    .bl-aside {
        transition: all 0.7s;
        z-index: 14;
    }
    .bl-header {
        padding: 0;
        height: auto;
    }
    .bl-main {
        padding: 0 24px 24px 24px;
    }
}
</style>
