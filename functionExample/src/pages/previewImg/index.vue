<template>
    <div>
        <div v-viewer>
            <img v-for="src in images" :key="src" :src="src" style="margin-right: 10px" />
        </div>
    </div>
</template>

<script setup>
const images = ['https://picsum.photos/200/200', 'https://picsum.photos/300/200', 'https://picsum.photos/250/200'];
</script>

<style scoped></style>
