<template>
    <div id="box1">
        <ZpUploadFile
            ref="uploadFileRef"
            loadingContainer="#box1"
            name="uploadFile"
            action="/test/api/quality/common/file/upload"
            :show-file-list="true"
            @onPreviewFile="previewFile"
        />
        <el-button type="primary" @click="getFileList">获取文件列表</el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ZpUploadFile } from 'zp-element-plus';

const uploadFileRef = ref();

// 单击名称 needDownload 为false才执行
const previewFile = (uploadFile) => {
    console.log('文件', uploadFile);
};
// 获取文件列表
const getFileList = () => {
    const fileList = uploadFileRef.value.fileList.map((item) => ({
        name: item.name,
        url: item.url
    }));
    console.log('文件列表', fileList);
};
</script>
