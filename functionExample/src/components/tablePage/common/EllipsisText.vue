<!--
* @Author: zhangping
* @Date: 2025-09-29 14:59:25
* @Description: 省略号文本
使用示例：<EllipsisText :rowNumber="2" content="你好你好你好你好你好你好你好你好你好你好你好你好" />
-->

<template>
    <el-tooltip effect="dark" :content="content" placement="top-start" :disabled="!isOverflow">
        <div
            ref="textRef"
            :class="{
                [`e-${rowNumber}`]: true,
            }"
            @mouseover="checkOverflow"
        >
            {{ content }}
        </div>
    </el-tooltip>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
    content: {
        type: String,
        default: '',
    },
    // 展示的行数
    rowNumber: {
        type: [Number, String],
        default: 1,
    },
});

const isOverflow = ref(false);
const textRef = ref(null);

const checkOverflow = async () => {
    await nextTick();
    if (textRef.value) {
        const isOverflowing =
            textRef.value.scrollWidth > textRef.value.clientWidth ||
            textRef.value.scrollHeight > textRef.value.clientHeight;
        isOverflow.value = isOverflowing;
    }
};
const changeResize = () => {
    checkOverflow();
};

onMounted(() => {
    checkOverflow();
    window.addEventListener('resize', changeResize);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', changeResize);
});
</script>

<style lang="less" scoped></style>
