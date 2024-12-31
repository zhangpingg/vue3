<template>
    <div class="pt-10 pr-10 pl-10">
        <RichText ref="richTextRef" :content="richTextContent" />
        <el-button type="primary" @click="save"> 保存 </el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RichText from './richText';

const richTextRef = ref();
const richTextContent = ref(
    '<p>215421521</p><p>5521</p><p><a href="https://www.baidu.com/" rel="noopener noreferrer" target="_blank">百度</a></p><p>12</p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.baidu.com/"></iframe><p><br></p><p><img src="https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2024/12/30/31871239717507676_02.1735543526600.jpeg"><img src="https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2024/12/31/31938829356020738_03.1735611117154.png"></p>'
);

// 保存
const save = () => {
    console.log('内容', richTextRef.value.realTimeContent);
};

onMounted(() => {});
</script>

<style lang="less" scoped></style>
