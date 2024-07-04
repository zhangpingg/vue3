<!--
 * @Author: chengleilei
 * @Date: 2024-05-27 15:50:02
 * @Description: 上传文件组件
-->
<template>
    <el-upload
        name="uploadFile"
        :file-list="fileList"
        :headers="{ Authorization: Cookies.get('token') }"
        :action="action"
        :show-file-list="!isDragType"
        :disabled="isDragUploaded"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-preview="handlePreview"
        :class="[{ 'drag-uploaded': isDragUploaded }, 'upload-file-component']"
    >
        <slot>
            <!-- 拖拽上传 -->
            <template v-if="isDragType">
                <div class="drag-upload" v-if="fileList.length === 0">
                    <el-icon class="el-icon--upload" size="52"><upload-filled /></el-icon>
                    <div class="el-upload__text">点击或将文件拖拽到这里上传</div>
                    <div class="el-upload__tip" v-if="attrs?.accept">支持扩展名：{{ attrs?.accept }}</div>
                </div>
                <div class="drag-file flex-col-c" v-for="(item, index) in fileList" :key="index" v-else>
                    <p class="drag-file-main flex-c" @click="handlePreview(item)">
                        <Icon class="cup" type="md-document" size="52" color="red" />
                        <i class="drag-file-name e-1 cup">{{ item.name }}</i>
                    </p>
                    <Icon
                        class="cup"
                        type="ios-trash-outline"
                        color="#515a6e"
                        size="52"
                        @click.stop="removeDragFileItem(index)"
                    ></Icon>
                </div>
            </template>
            <!-- 常规上传 -->
            <el-button v-else type="primary" :icon="Plus" :disabled="fileList.length >= attrs?.limit">
                上传文件
            </el-button>
        </slot>
        <template #tip>
            <slot name="tip">
                <div class="el-upload__tip" v-if="needDownload">单击文件名可下载文件</div>
            </slot>
        </template>
        <template #file>
            <slot name="file"> </slot>
        </template>
    </el-upload>
</template>

<script setup>
import { ref, computed, useAttrs } from 'vue';
import { ElMessage, ElNotification, ElLoading } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { getEnvironment } from '@/libs/util.win';
import { downloadFile } from '@/libs/util.tool';
import Cookies from 'js-cookie';

const attrs = useAttrs();

const props = defineProps({
    // 上传api
    api: {
        type: String,
        default: '/api/quality/common/file/upload',
    },
    // loading目标
    loadingTarget: {
        type: String,
        default: '.upload-file-component',
    },
    // 是否需要下载
    needDownload: {
        type: Boolean,
        default: false,
    },
    // 通用上传文件大小限制 maxSizeNum和maxSizeArr二选一
    maxSizeNum: {
        type: Number,
        default: null,
    },
    // 根据文件类型分别设置上传文件大小限制
    // types: image=图片 video=视频 audio=音频 application=wps/pdf text=txt other=其他文件类型
    maxSizeArr: {
        type: Array,
        default: () => [
            // { types: ['image'], maxSize: 5, errTip: '图片文件大小不超过5M' },
            // { types: ['video', 'audio'], maxSize: 200, errTip: '视频音频文件大小不超过200M' },
            // { types: ['other'], maxSize: 10, errTip: '文件大小不能超过10M' },
        ],
    },
});
const emit = defineEmits(['uploadSuccess', 'removeSuccess', 'handleClickName']);

// 上传的文件列表 通过组件ref回显和取上传后的数据
const fileList = ref([]);
// 上传loading
const uploading = ref(null);
// 根据环境拼接api
const action = computed(() => {
    return getEnvironment() !== 'product' ? '/test' + props.api : props.api;
});
// 是否拖拽
const isDragType = computed(() => {
    // 解决drag属性简写问题
    return attrs?.drag || attrs.drag === '';
});
// 是否拖拽上传成功
const isDragUploaded = computed(() => {
    return isDragType.value && fileList.value.length > 0;
});

// 上传前
const beforeUpload = (rawFile) => {
    const { maxSizeNum, maxSizeArr } = props;
    const fileSize = rawFile.size / 1024 / 1024; // 图片大小
    const fileType = rawFile.type.split('/')[0]; // 图片类型
    // 通用上传文件大小限制
    if (maxSizeNum && fileSize > maxSizeNum) {
        ElMessage({ plain: true, message: `文件大小不能超过${maxSizeNum}M`, type: 'error' });
        return false;
    }
    // 根据文件类型分别设置上传文件大小限制
    let sizeError = false;
    for (let i = 0; i < maxSizeArr.length; i++) {
        if (
            (maxSizeArr[i].types.includes(fileType) || maxSizeArr[i].types.includes('other')) &&
            fileSize > maxSizeArr[i].maxSize
        ) {
            sizeError = true;
            ElMessage({ plain: true, message: maxSizeArr[i].errTip, type: 'error' });
            break;
        }
    }
    if (sizeError) return false;
    if (uploading.value) return false;
    uploading.value = ElLoading.service({
        target: document.querySelector(props.loadingTarget),
        text: '上传中...',
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
        // 导入失败下载错误链接文件
        response.data && downloadFile(response.data);
    }
    if (response.code === 200 && typeof response.data === 'string') {
        uploadFile.url = response.data;
    }
    fileList.value.push(uploadFile);
    if (fileList.value.length === uploadFiles.length) {
        fileList.value = uploadFiles.filter((k) => k.status === 'success');
        uploading.value.close();
        uploading.value = null;
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

// 单击名称
const handlePreview = (uploadFile) => {
    if (props.needDownload) {
        downloadFile(uploadFile.url, uploadFile.name);
        return;
    }
    emit('handleClickName', uploadFile);
};

// 删除已上传的拖拽文件
const removeDragFileItem = (index) => {
    fileList.value.splice(index, 1);
};

defineExpose({
    fileList,
});
</script>
<style lang="less" scoped>
.drag-uploaded {
    :deep(.el-upload-dragger:not(:focus)),
    :deep(.el-upload-dragger:focus),
    :deep(.el-upload-dragger:hover) {
        border-color: #dcdfe6;
        cursor: auto;
    }
}
.drag-upload,
.drag-file {
    height: 114px;
}
.drag-file {
    .drag-file-main {
        padding: 0 20px;
        width: 100%;
        .drag-file-name {
            color: var(--el-color-primary);
        }
    }
}
</style>
