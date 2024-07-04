<template>
    <router-view />
</template>

<script setup>
import { useLayoutStore } from '@/store';

const layoutStore = useLayoutStore();

layoutStore.listenFullscreen(); // 初始化全屏监听
</script>

<style scoped></style>
