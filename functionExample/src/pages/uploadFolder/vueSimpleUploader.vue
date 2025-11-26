<!--vue-simple-uploader插件，上传文件夹：可拿到文件，未实现调接口部分-->

<template>
    <div>
        <uploader
            :options="options"
            :file-status-text="statusText"
            class="uploader-example"
            ref="uploaderRef"
            @file-complete="fileComplete"
            @complete="complete"
        >
        </uploader>
        <button @click="getFileList">获取当前文件列表</button>
    </div>
</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue';

const uploaderRef = ref(null);
const options = {
    target: '//localhost:3000/upload', // '//jsonplaceholder.typicode.com/posts/',
    testChunks: false
};
const attrs = {
    accept: 'image/*'
};
const statusText = {
    success: 'success',
    error: 'error',
    uploading: 'uploading',
    paused: 'paused',
    waiting: 'waiting'
};
const complete = () => {
    console.log('complete', arguments);
};
const fileComplete = () => {
    console.log('file complete', arguments);
};
// 获取当前文件列表
const getFileList = () => {
    if (uploaderRef.value && uploaderRef.value.uploader) {
        const files = uploaderRef.value.uploader.files;
        console.log('当前所有文件:', files);

        // 获取不同状态的文件
        const allFiles = files.map((file) => ({
            name: file.name,
            size: file.size,
            status: file.status,
            progress: file.progress(),
            relativePath: file.relativePath || file.name
        }));

        console.log('文件详情:', allFiles);
        return allFiles;
    }
    return [];
};

onMounted(() => {
    nextTick(() => {
        window.uploader = uploaderRef.value.uploader;
    });
});
</script>

<style>
.uploader-example {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
    margin-right: 4px;
}
.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
