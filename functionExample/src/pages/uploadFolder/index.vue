<!--上传文件夹：已完成-->

<template>
    <div>
        <!-- 上传组件核心 -->
        <FileUpload
            ref="fileUploadRef"
            v-model="fileList"
            :post-action="uploadApi"
            :auto-upload="false"
            :multiple="true"
            :directory="true"
            @on-progress="handleProgress"
            @on-success="handleSuccess"
            @on-error="handleError"
            @input-file="onInputFile"
            @input-filter="onInputFilter"
            accept="*"
        >
            <el-button type="primary" :icon="FolderOpened"> 选择文件夹（支持嵌套） </el-button>
        </FileUpload>

        <!-- 操作按钮 -->
        <el-button @click="clearFileList"> 清空文件 </el-button>

        <!-- 上传状态 -->
        <div>总进度：{{ uploadedCount || 0 }}/{{ fileList.length || 0 }} 个文件</div>

        <div v-for="item in uploadedFileList">
            <img :src="item.fileUrl" width="100px" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import FileUpload from 'vue-upload-component';
import { ElButton, ElMessage } from 'element-plus';
import { FolderOpened } from '@element-plus/icons-vue';
import axios from 'axios';

const fileUploadRef = ref(null); // 上传组件实例
const fileList = ref([]); // 存储选中的所有文件（含嵌套文件夹）
const uploadedCount = ref(0); // 已上传文件数
const uploadedFileList = ref([]); // 已上传文件列表（主要是为了预览）

// 选择文件后回调：自动识别嵌套文件夹，也可以在这里调接口上传
const onInputFile = (file, fileList) => {
    //console.log('onInputFile-file:', file);
    //console.log('onInputFile-fileList:', fileList);
};

// 过滤文件
const onInputFilter = (newFile, oldFile, prevent) => {
    if (newFile && !oldFile) {
        // 过滤不是图片后缀的文件
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
            return prevent();
        }
    }
    // 创建 blob 字段 用于图片预览
    newFile.blob = '';
    let URL = window.URL || window.webkitURL;
    if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file);
    }
};

// 清空文件列表
const clearFileList = () => {
    fileUploadRef.value.clear(); // 插件内置清空方法
    fileList.value = [];
    uploadedCount.value = 0;
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
                'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODIxMTExMTExMSIsInNjb3BlcyI6WyIxMDAwMTAiLCIxMDAwMjAiLCIxMDAwMzAiLCIxMDAwMzEiLCIxMDAwMzIiLCIxMDAwNDAiLCIxMDAwNDEiLCIxMDAwNDIiLCIxMDAwNDMiLCIxMDAwNTAiLCIxMDAwNTEiLCIxMDAwNTIiLCIxMDAwNTMiLCIxMDAwNTQiLCIxMDAwNjAiLCIxMDAwNjEiLCIxMDAwNjIiLCIxMDAwNjMiXSwiaXNzIjoic2VjdXJpdHkiLCJpYXQiOjE3NjQxMjY0OTAsImV4cCI6MTc2NDEzODQ5MH0.-e0-Ry2TOLIvCkyugmqPBEW4yTf30GCra4BBEl7wIalZKt-PVcns9G6wO9SFdV8kgmE2BgVbGf7uuE9Xg0I9rw'
        }
    };
    axios
        .post(url, forms, configs)
        .then((res) => {
            uploadedFileList.value.push({ fileUrl: res.data.data });
            uploadedCount.value++;
            if (uploadedCount.value === fileList.value.length) {
                ElMessage.success('上传成功！');
                clearFileList();
            }
        })
        .catch((err) => {
            ElMessage.success('上传失败，请重试！');
        });
};

watch(
    fileList,
    (newFileList) => {
        console.log('change-fileList:', newFileList);
        newFileList.forEach((item) => {
            uploadFileFn(item.file);
        });
    },
    { deep: true }
);
</script>

<style lang="less" scoped></style>
