<template>
    <UploadFile ref="uploadFileRef" @handleClickName="handleClickName" v-bind="uploadConfig" />
    <el-button type="primary" @click="submitData">submitData</el-button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UploadFile from '@/components/uploadFile';

// 配置
const uploadConfig = {
    // drag: true,
    multiple: true,
    showFileList: true,
    clickNameType: 'download',
    limit: 3,
    maxSizeArr: [
        { types: ['image'], maxSize: 5, errTip: '图片文件大小不超过5M' },
        { types: ['video', 'audio'], maxSize: 200, errTip: '视频音频文件大小不超过200M' },
        { types: ['other'], maxSize: 10, errTip: '文件大小不能超过10M' },
    ],
};

const uploadFileRef = ref();

// 获取详情回显
const getDetail = () => {
    // 请求接口
    setTimeout(() => {
        const files = [
            {
                name: 'element-plus-logo.svg',
                url: 'https://element-plus.org/images/element-plus-logo.svg',
            },
            {
                name: 'element-plus-logo2.svg',
                url: 'https://element-plus.org/images/element-plus-logo.svg',
            },
        ];
        uploadFileRef.value.fileList = [...files];
    }, 1000);
};

// 提交数据
const submitData = () => {
    const params = {
        files: uploadFileRef.value.fileList.map((k) => k.url),
    };
    console.log('params', params);
};

// 单击名称 clickNameType为空才执行
const handleClickName = (uploadFile) => {
    console.log('单击了', uploadFile);
};

onMounted(() => {
    getDetail();
});
</script>
