<template>
    <div v-viewer="{ movable: true }">
        <img v-for="src in images" :key="src" :src="src" style="margin-right: 10px" />
    </div>
</template>

<script setup>
const images = [
    'https://file.iviewui.com/images/image-demo-10.jpg',
    'https://file.iviewui.com/images/image-demo-11.jpg',
    'https://file.iviewui.com/images/image-demo-12.jpg'
];
</script>

<style scoped>
img {
    width: 100px;
    height: 100px;
}
</style>
