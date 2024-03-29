<template>
    <div>test</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const timer = ref();

onMounted(() => {
    timer.value = setTimeout(() => {
        console.log('数据');
    }, 2000);
});
onUnmounted(() => {
    //clearInterval(timer);
});
</script>

<style scoped></style>
