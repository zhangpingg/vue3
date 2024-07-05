<template>
    <div>
        <p>(1) useClipboard 复制文本到剪切板</p>
        <button @click="copyText">复制文本</button>
        <button @click="modifyText">修改需要copy的内容</button><br /><br />

        <p>(2) useToggle 类似 react 中的 useState</p>
        <button @click="setIsOpen(!isOpen)">切换状态</button>
        <p>{{ isOpen ? '打开' : '关闭' }}</p>
        <br />

        <p>(3) 监听DOM元素</p>
        <div ref="divRef" class="box">div内容</div>
        <br />

        <p>(4)全屏</p>
        <button @click="toggle">进入/退出全屏</button>
        <p ref="pRef">{{ isFullscreen ? '全屏' : '小屏' }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useClipboard, useToggle, useResizeObserver, isClient, useFullscreen } from '@vueuse/core';
import { ElMessage } from 'element-plus';

const content = ref('一段内容');
const divRef = ref();
const pRef = ref();

// (1)复制文本到剪切板-useClipboard 函数
const { copy, isSupported } = useClipboard();
// (2)类似react中的useState
const [isOpen, setIsOpen] = useToggle(false);
// (3)DOM元素变化的回调
const changeDivCallback = () => {
    console.log('盒子的宽', divRef.value.offsetWidth);
};
// (3)监听 divRef
useResizeObserver(divRef, changeDivCallback);
// (4)全屏
const { isFullscreen, toggle } = useFullscreen(); // 或者想让某个特定元素进入全屏:pRef

// (1)修改需要copy的内容
const modifyText = () => {
    content.value = '新的一段内容';
};
// (1)复制文本到剪切板
const copyText = async () => {
    if (!isSupported) {
        ElMessage.error('复制失败');
    }
    try {
        await copy(content.value);
        ElMessage.success('已复制');
    } catch (e) {
        ElMessage.error(e.message);
    }
};

onMounted(() => {
    // (4)判断当前环境是否为客户端
    if (isClient) {
        console.log('在客户端环境中执行');
    } else {
        console.log('在服务端环境中执行');
    }
});
</script>

<style scoped lang="less">
.box {
    border: 1px solid #000;
}
</style>
