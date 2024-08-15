<template>
    <div class="box">内容</div>
</template>

<script setup>
import { computed } from 'vue';

const textColor = computed(() => {
    return '#f00';
});
</script>

<style scoped lang="less">
.box {
    color: v-bind(textColor);
}
</style>

