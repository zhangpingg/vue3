<template>
    <div v-viewer="{ movable: true }">
        <span v-for="(item, index) in images" :key="index">
            <img :src="item" />
            <el-icon><CirclePlus /></el-icon>
        </span>
    </div>
    <button @click="imgPreview">预览图片-js</button>
</template>

<script setup>
import { api as viewerApi } from 'v-viewer';

const images = [
    'https://file.iviewui.com/images/image-demo-10.jpg',
    'https://file.iviewui.com/images/image-demo-11.jpg',
    'https://file.iviewui.com/images/image-demo-12.jpg'
];

// 图片预览
const imgPreview = () => {
    viewerApi({
        options: {
            toolbar: true,
            initialViewIndex: 0
        },
        images: images
    });
};
</script>

<style scoped>
img {
    width: 100px;
    height: 100px;
}
</style>
