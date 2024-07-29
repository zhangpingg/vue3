<template>
    <div class="box">内容</div>
</template>

<script setup>
import { computed } from 'vue';

const textColor = computed(() => {
    return true ? '#f00' : '#0f0';
});
</script>

<style scoped lang="less">
.box {
    color: v-bind(textColor);
}
</style>
