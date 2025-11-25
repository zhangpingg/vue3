<!--上传文件夹：未完成-->

<template>
    <div style="padding: 30px; max-width: 1000px; margin: 0 auto">
        <h2>vue-upload-component 文件夹上传 Demo</h2>

        <!-- 上传组件核心 -->
        <FileUpload
            ref="uploadRef"
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
            <el-button type="primary" :icon="FolderOpened" :disabled="isUploading"> 选择文件夹（支持嵌套） </el-button>
        </FileUpload>

        <!-- 操作按钮 -->
        <el-button
            @click="startUpload"
            :disabled="!fileList.length || isUploading"
            style="margin-top: 15px; margin-right: 10px"
        >
            {{ isUploading ? '上传中...' : '开始上传' }}
        </el-button>
        <el-button @click="clearFiles" :disabled="!fileList.length || isUploading"> 清空文件 </el-button>

        <!-- 上传状态 -->
        <div style="margin-top: 20px">
            <h4>文件列表（含嵌套文件夹）：</h4>
            <div v-for="(file, index) in fileList" :key="index" style="margin: 8px 0">
                {{ file.relativePath }}（{{ formatSize(file.size) }}）
                <span v-if="file.progress > 0 && file.progress < 100"> - 上传中：{{ file.progress }}% </span>
                <span v-if="file.progress === 100" style="color: #1989fa">- 上传完成</span>
            </div>

            <div v-if="totalProgress > 0" style="margin-top: 15px">
                <el-progress :percentage="totalProgress"></el-progress>
                <p style="margin-top: 10px; color: #666">
                    总进度：{{ totalProgress }}%（{{ uploadedCount }}/{{ fileList.length }} 个文件）
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import FileUpload from 'vue-upload-component';
import { ElButton, ElProgress, ElMessage } from 'element-plus';
import { FolderOpened } from '@element-plus/icons-vue';

// 核心配置
const uploadApi = 'http://localhost:3001/api/upload/folder'; // 后端接口
const uploadRef = ref(null); // 上传组件实例
const fileList = ref([]); // 存储所有文件（含嵌套文件夹）
const isUploading = ref(false); // 上传中标记
const totalProgress = ref(0); // 总进度
const uploadedCount = ref(0); // 已上传文件数

// 格式化文件大小（B → KB/MB）
const formatSize = (size) => {
    if (size < 1024) return size + 'B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + 'KB';
    return (size / (1024 * 1024)).toFixed(2) + 'MB';
};

// 选择文件后回调：自动识别嵌套文件夹
const onInputFile = (file, fileList) => {
    console.log('onInputFile-file:', file);
    console.log('onInputFile-fileList:', fileList);
    //  对于文件夹上传，fileList 参数可能为空，我们需要从 file 对象中获取文件信息
    if (fileList && fileList.length > 0) {
        const formattedFiles = fileList.map((item) => ({
            name: item.name,
            size: item.size,
            relativePath: item.relativePath || item.name, // 保留嵌套路径
            progress: 0 // 初始化进度
        }));
        fileList.value = formattedFiles;
        ElMessage.success(`已选择 ${formattedFiles.length} 个文件（含子文件夹）`);
    } else if (file) {
        // 处理单个文件的情况
        const newFile = {
            name: file.name,
            size: file.size,
            relativePath: file.relativePath || file.name,
            progress: 0
        };

        // 避免重复添加相同文件
        const exists = fileList.value.some(
            (item) => item.relativePath === newFile.relativePath && item.size === newFile.size
        );

        if (!exists) {
            fileList.value.push(newFile);
            ElMessage.success(`已选择 ${fileList.value.length} 个文件（含子文件夹）`);
        }
    }
};

// 单个文件上传进度
const handleProgress = (event, file, fileList) => {
    console.log('handleProgress-file:', file);
    console.log('handleProgress-fileList:', fileList);
    //const progress = Math.round((event.loaded / event.total) * 100);
    //// 更新单个文件进度
    //const index = fileList.value.findIndex((item) => item.name === file.name);
    //if (index !== -1) {
    //    fileList.value[index].progress = progress;
    //}
    //// 计算总进度
    //const completedFiles = fileList.value.filter((item) => item.progress === 100).length;
    //uploadedCount.value = completedFiles;
    //totalProgress.value = Math.round((completedFiles / fileList.value.length) * 100);
};

// 单个文件上传成功
const handleSuccess = (response, file, fileList) => {
    console.log('handleSuccess-file:', file);
    console.log('handleSuccess-fileList:', fileList);
    ElMessage.success(`文件 ${file.relativePath} 上传成功`);
};

// 上传失败
const handleError = (error, file) => {
    ElMessage.error(`文件 ${file.relativePath} 上传失败：${error.message}`);
    isUploading.value = false;
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

// 开始上传所有文件
const startUpload = () => {
    if (fileList.value.length === 0) {
        ElMessage.warning('请先选择文件夹');
        return;
    }
    if (!uploadRef.value) {
        ElMessage.error('上传组件未正确初始化');
        return;
    }

    isUploading.value = true;
    console.log('开始上传:', uploadRef.value);

    console.log(11, uploadRef);
    uploadRef.value?.upload(); // 调用插件上传方法
};

// 清空所有文件
const clearFiles = () => {
    uploadRef.value.clear(); // 插件内置清空方法
    fileList.value = [];
    totalProgress.value = 0;
    uploadedCount.value = 0;
    ElMessage.info('文件列表已清空');
};

watch(
    fileList,
    (newVal, oldVal) => {
        console.log('changed-fileList:', newVal);
        // 在这里可以执行您需要的操作
        if (newVal.length > 0) {
            ElMessage.success(`已选择 ${newVal.length} 个文件`);
        }
    },
    { deep: true }
);
</script>

<style scoped>
/* 引入插件默认样式 */
/*@import 'vue-upload-component/dist/style.css';*/
</style>
