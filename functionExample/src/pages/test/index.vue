<template>
    <div>test</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';

onMounted(() => {
    const uuid = uuidv4();
    console.log(11, uuid);
});
</script>

<style scoped lang="less"></style>
