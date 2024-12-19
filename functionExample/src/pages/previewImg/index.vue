<template>
    <div>(1)指令</div>
    <div v-viewer>
        <span v-for="src in imgList" :key="src">
            <img :src="src" />
            <el-icon><CirclePlus /></el-icon>
        </span>
    </div>

    <div>(2)组件</div>
    <viewer :images="imgList">
        <span v-for="src in imgList" :key="src">
            <img :src="src" />
            <el-icon><CirclePlus /></el-icon>
        </span>
    </viewer>

    <div>(3)api</div>
    <el-button type="primary" @click="imgPreview">图片预览</el-button>
</template>

<script setup>
import { api as viewerApi } from 'v-viewer';

const imgList = ['https://picsum.photos/200/200', 'https://picsum.photos/300/200', 'https://picsum.photos/250/200'];

// 图片预览
const imgPreview = () => {
    viewerApi({
        options: {
            initialViewIndex: 1
        },
        images: imgList
    });
};
</script>

<style scoped>
img {
    width: 100px;
    height: 100px;
}
</style>
