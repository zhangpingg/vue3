<!--原生实现上传文件夹：可拿到文件，未实现调接口部分-->

<template>
    <div>
        <input type="file" webkitdirectory mozdirectory multiple @change="handleFolderSelect" />
        <ul>
            <li v-for="f in files" :key="f.path">{{ f.path }} ({{ formatSize(f.size) }})</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElButton, ElMessage } from 'element-plus';

const files = ref([]);

const handleFolderSelect = (e) => {
    const items = Array.from(e.target.files);
    console.log(11, items);
    files.value = items.map((file) => ({
        name: file.name,
        size: file.size,
        path: file.webkitRelativePath || file.name, // 保留文件夹结构
        file: file
    }));
    files.value.forEach((file) => {
        uploadFileFn(file.file);
    });
    console.log('选中的文件（含路径）:', files.value);
};

const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 上传
const uploadFileFn = (file) => {
    let url = `/test/api/pt/common/file/upload`;
    let forms = new FormData();
    forms.append('uploadFile', file, file.name);
    let configs = {
        headers: {
            // CRM项目
            Authorization:
                'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODIxMTExMTExMiIsInNjb3BlcyI6WyIxMDAwMTAiLCIxMDAwMjAiLCIxMDAwMzAiLCIxMDAwMzEiLCIxMDAwMzIiLCIxMDAwNDAiLCIxMDAwNDEiLCIxMDAwNDIiLCIxMDAwNDMiLCIxMDAwNTAiLCIxMDAwNTEiLCIxMDAwNTIiLCIxMDAwNTMiLCIxMDAwNTQiLCIxMDAwNjAiLCIxMDAwNjEiLCIxMDAwNjIiLCIxMDAwNjMiXSwiaXNzIjoic2VjdXJpdHkiLCJpYXQiOjE3NjQxNDE0MTQsImV4cCI6MTc2NDE1MzQxNH0.tyo7H8gRfiBUn3LNlcayxYKq1zy2xMt_Aa_9IaXRKFW4dpWSebe-ZU-koybrmN1qvxcU0D2_h1GJ1DTnnI1T8g'
        }
    };
    axios
        .post(url, forms, configs)
        .then((res) => {})
        .catch((err) => {
            ElMessage.success('上传失败，请重试！');
        });
};
</script>
