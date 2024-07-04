<template>
    <el-upload
        list-type="picture-card"
        accept=".png,.jpg,.jpeg"
        name="uploadFile"
        limit="9"
        :file-list="fileList"
        :headers="{ Authorization: Cookies.get('token') }"
        :action="action"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-preview="handlePreview"
        :class="{ hide: fileList.length >= $attrs?.limit }"
    >
        <el-icon><Plus /></el-icon>
    </el-upload>
</template>

<script setup>
import { ref, computed } from 'vue';
import { api as viewerApi } from 'v-viewer';
import { ElMessage, ElNotification } from 'element-plus';
import { getEnvironment } from '@/libs/util.win';

const props = defineProps({
    // 上传api
    api: {
        type: String,
        default: '/api/quality/common/file/upload',
    },
});
const emit = defineEmits(['uploadSuccess', 'removeSuccess']);

// 上传的图片列表 通过组件ref回显和取上传后的数据
const fileList = ref([]);
// 根据环境拼接api
const action = computed(() => {
    return getEnvironment() !== 'product' ? '/test' + props.api : props.api;
});

// 图片预览
const handlePreview = (uploadFile) => {
    const idx = fileList.value.findIndex((k) => k.url === uploadFile.url);
    viewerApi({
        options: {
            toolbar: true,
            initialViewIndex: idx,
        },
        images: fileList.value.map((k) => k.url),
    });
};

// 上传成功
const handleSuccess = (response, uploadFile, uploadFiles) => {
    if (response.code !== 200) {
        uploadFile.status = 'fail';
        uploadFile.url = '';
        ElNotification({
            type: 'error',
            title: '提示',
            message: response.message,
            duration: 3000,
        });
    }
    if (response.code === 200 && typeof response.data === 'string') {
        uploadFile.url = response.data;
    }
    fileList.value.push(uploadFile);
    if (fileList.value.length === uploadFiles.length) {
        fileList.value = uploadFiles.filter((k) => k.status === 'success');
        console.log('接口全部请求完成', fileList.value);
        fileList.value.length && emit('uploadSuccess', fileList.value);
    }
};

// 移除
const handleRemove = (uploadFile, uploadFiles) => {
    fileList.value = [...uploadFiles];
    emit('removeSuccess', fileList.value);
};

// 超出限制
const handleExceed = (files, uploadFiles) => {
    console.log('超出限制', files, uploadFiles);
    ElMessage({ plain: true, message: '超出上传数量限制', type: 'error' });
};

defineExpose({ fileList });
</script>

<style lang="less" scoped>
.hide :deep(.el-upload--picture-card) {
    display: none;
}
:deep(.el-upload-list__item),
:deep(.el-upload--picture-card) {
    width: 90px;
    height: 90px;
}
.img60 {
    height: 60px;
    :deep(.el-upload-list__item),
    :deep(.el-upload--picture-card) {
        width: 60px;
        height: 60px;
    }
}
.limit1 {
    :deep(.el-upload-list__item),
    :deep(.el-upload--picture-card) {
        margin: 0;
    }
}
</style>
