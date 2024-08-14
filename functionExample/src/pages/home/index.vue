<template>
    <div class="home">
        <span @click="jumpPage('test')">测试</span><br />
        <span @click="jumpPage('directive')">
            自定义指令（input-倒序字符串，input-过滤表情包，复制，图片加载失败-默认图片，图片懒加载，按钮权限，loading，点击某元素其他地方事件） </span
        ><br />
        <span @click="jumpPage('routerHome')">路由</span><br />
        <span @click="jumpPage('plugin')">自定义vue插件（confirm对话框，自定义右键菜单）</span><br />
        <span @click="jumpPage('scroll')">横向滚动，滚动到某一项位置，或滚动到最右侧等</span><br />
        <span @click="jumpPage('previewPDF')">预览PDF</span> <br />
        <span @click="jumpPage('previewImg')">预览图片</span> <br />
        <span @click="jumpPage('previewPdfDocxExcel')">预览pdf/docx/excel</span> <br />
        <span @click="jumpPage('viewUiPlus')">view-ui-plus 框架</span><br />
        <span @click="jumpPage('jsx')">jsx语法子组件</span><br />
        <span @click="jumpPage('vueuseCore')"
            >@vueuse/core
            依赖插件（useClipboard-复制文本到剪切板，useToggle-类似react中的useState，useResizeObserver：监听DOM元素，isClient：判断当前环境是否为客户端，useFullscreen：全屏）</span
        ><br />
        <span @click="jumpPage('markDown')">markDown文件渲染</span><br />
        <span @click="jumpPage('cssVbind')">css v-bind 引用js中的变量</span><br />
        <span @click="jumpPage('zpElementPlus')">zp-element-plus 组件库</span><br />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { Button } from 'view-ui-plus';

const router = useRouter();

const jumpPage = (path) => {
    router.push({ path: `/${path}` });
};
</script>

<style scoped lang="scss">
.home {
    padding-left: 10px;
    span {
        cursor: pointer;
        &:hover {
            color: #f00;
        }
    }
}
</style>
