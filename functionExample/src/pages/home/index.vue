<template>
    <div>
        <p @click="jumpPage('directive')">
            自定义指令（倒序字符串，复制，图片加载失败-默认图片，图片懒加载，按钮权限，loading，点击某元素其他地方事件）
        </p>
        <br />
        <p @click="jumpPage('routerHome')">路由</p>
        <br />
        <p @click="jumpPage('plugin')">自定义vue插件（confirm对话框，自定义右键菜单）</p>
        <br />
        <p @click="jumpPage('scroll')">横向滚动，滚动到某一项位置，或滚动到最右侧等</p>
        <br />
        <p @click="jumpPage('previewPDF')">预览PDF</p>
        <br />
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
p {
    cursor: pointer;
}
</style>
