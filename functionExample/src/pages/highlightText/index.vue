<template>
    <div>
        <span v-html="text"></span>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const text = ref('JavaScript是一种流行的编程语言。JavaScript可以用于前端和后端开发。');

const highlightText = (str, keyword) => {
    // 定义正则表达式，使用'i'标志不区分大小写，使用'g'标志全局匹配
    const regex = new RegExp(keyword, 'ig');
    // 使用replace方法替换匹配到的字符串
    const highlightedText = str.replace(regex, (match) => {
        return `<span class="highlight">${match}</span>`;
    });

    return highlightedText;
};

onMounted(() => {
    text.value = highlightText(text.value, 'javascript');
});
</script>

<style lang="less" scoped>
:deep(.highlight) {
    font-weight: bold;
    color: #f00;
}
</style>
