<template>
    <div>
        <span @click="jumpPage('test')">测试</span><br />
        <span @click="jumpPage('directive')">
            自定义指令（倒序字符串，复制，图片加载失败-默认图片，图片懒加载，按钮权限，loading，点击某元素其他地方事件） </span
        ><br />
        <span @click="jumpPage('routerHome')">路由</span><br />
        <span @click="jumpPage('plugin')">自定义vue插件（confirm对话框，自定义右键菜单）</span><br />
        <span @click="jumpPage('scroll')">横向滚动，滚动到某一项位置，或滚动到最右侧等</span><br />
        <span @click="jumpPage('previewPDF')">预览PDF</span> <br />
        <span @click="jumpPage('previewImg')">预览图片</span> <br />
        <span @click="jumpPage('previewPdfDocxExcel')">预览pdf/docx/excel</span> <br />
        <span @click="jumpPage('viewUiPlus')">view-ui-plus 框架</span><br />
        <span @click="jumpPage('jsx')">jsx语法子组件</span><br />
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
span {
    cursor: pointer;
    &:hover {
        color: #f00;
    }
}
</style>
