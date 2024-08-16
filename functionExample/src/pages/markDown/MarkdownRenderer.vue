<template>
    <div v-html="htmlContent" class="markdownCon"></div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
// 方式1：直接引入 <script src="https://cdn.bootcdn.net/ajax/libs/marked/13.0.2/marked.min.js">
// 方式2：
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html'; // 防止跨站脚本攻击（XSS），增强安全性，使用 sanitize-html 来清理渲染的 HTML

const props = defineProps({
    markdown: {
        type: String,
        required: true
    }
});

const htmlContent = ref('');

const renderMarkdown = () => {
    const html = marked.parse(props.markdown);
    htmlContent.value = sanitizeHtml(html, {
        allowedTags: [
            'p',
            'br',
            'strong',
            'em',
            'code',
            'blockquote',
            'ul',
            'ol',
            'li',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'pre'
        ],
        allowedAttributes: {}
    });
};

// 监听 markdown 属性的变化
watch(() => props.markdown, renderMarkdown);

onMounted(() => {
    renderMarkdown();
});
</script>

<style scoped lang="less">
.markdownCon {
    :deep(pre) {
        width: 100%;
        overflow-x: auto;
        border: 1px solid #ccc;
        padding: 10px;
    }
}
</style>
