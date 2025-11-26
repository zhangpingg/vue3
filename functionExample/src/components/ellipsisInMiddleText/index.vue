<!--
* @Author: zhangping
* @Date: 2025-11-26 16:01:50
* @Description: 自适应父级div宽度，文字多时，中间部分省略号，省略号后面展示位数自定义
【使用示例】
    <EllipsisInMiddleText content="是否hiis和覅啊哈覅好哇覅问哈覅青蛙合法" :rightSliceLength="8" />
-->

<template>
    <div class="emt">
        <div class="emt-main" :id="`${uuid}-all`">
            <div class="e-1">
                {{ content }}
            </div>
            <span class="emt-main-right" v-if="isLongStr">{{ content.slice(-`${rightSliceLength}`) }}</span>
        </div>
        <div class="emt-originalContent dib" :id="`${uuid}-content`">{{ content }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const uuid = ref(uuidv4());
const isLongStr = ref(true);

const props = defineProps({
    // 文本内容
    content: {
        type: String,
        default: ''
    },
    // 右侧截取字符串长度
    rightSliceLength: {
        type: Number,
        default: 6
    }
});

// 判断内容是否为长文字
const judgeContentLongStr = () => {
    const allDom = document.getElementById(`${uuid.value}-all`);
    const originalContentDom = document.getElementById(`${uuid.value}-content`);
    if (
        allDom &&
        originalContentDom &&
        originalContentDom.getBoundingClientRect().width < allDom.getBoundingClientRect().width
    ) {
        isLongStr.value = false;
    }
};

watch(
    () => props.content,
    async () => {
        await nextTick();
        isLongStr.value = true;
        judgeContentLongStr();
    },
    { immediate: true }
);
</script>

<style lang="less" scoped>
.emt {
    .emt-main {
        display: flex;
        .emt-main-right {
            white-space: nowrap;
        }
    }
    .emt-originalContent {
        height: 0px;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
    }
}
</style>
