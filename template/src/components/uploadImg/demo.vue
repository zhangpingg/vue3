<template>
    <UploadImg ref="uploadImgRef" v-bind="uploadConfig" />
    <el-button type="primary" @click="submitData">submitData</el-button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UploadImg from '@/components/uploadImg';

// 配置
const uploadConfig = {
    multiple: true,
    limit: 3,
};

const uploadImgRef = ref();

// 获取详情回显
const getDetail = () => {
    // 请求接口
    setTimeout(() => {
        const files = [
            'https://zc-oss.zcrubber.com/upload/files/2024/05/09/36576764771962449_rule.1715246624840.jpg',
            'https://zc-oss.zcrubber.com/upload/files/2024/05/06/34820447598633902_2024年4月各科室销售达人榜.1714986468567.png',
        ];
        uploadImgRef.value.fileList = files.map((item) => {
            return { url: item };
        });
    }, 1000);
};

// 提交数据
const submitData = () => {
    const params = {
        imgs: uploadImgRef.value.fileList.map((k) => k.url),
    };
    console.log('params', params);
};

onMounted(() => {
    getDetail();
});
</script>

<style lang="less" scoped></style>

