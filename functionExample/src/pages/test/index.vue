<template>
    <div>
        <el-input v-model="textarea" style="width: 200px" type="textarea" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const textarea = ref('');

watch(
    textarea,
    (newVal) => {
        const input = 'Hello 😊 World! 🌍';
        const cleanedInput = input.replace(/[\p{Emoji_Presentation}]/gu, '');
        console.log(cleanedInput); // 输出："Hello  World! "
    },
    {
        immediate: true,
        deep: true,
    }
);
</script>

<style scoped lang="less"></style>
