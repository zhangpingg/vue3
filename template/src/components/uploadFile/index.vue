<!--
 * @Author: chengleilei
 * @Date: 2024-05-27 15:50:02
 * @Description: 上传文件组件
-->
<template>
    <el-upload
        ref="elUploadRef"
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
        v-bind="{ ...attrs, ...config }"
    >
        <template #trigger>
            <slot name="trigger">
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
                <el-button
                    v-else
                    type="primary"
                    :icon="Plus"
                    :disabled="fileList.length >= attrs?.limit && !isReUpload"
                >
                    上传文件
                </el-button>
            </slot>
        </template>
        <slot> </slot>
        <template #tip>
            <slot name="tip">
                <div class="el-upload__tip" v-if="clickNameType === 'download' && fileList.length">
                    单击文件名可下载文件
                </div>
            </slot>
        </template>
        <template #file>
            <slot name="file"> </slot>
        </template>
    </el-upload>
</template>

<script setup>
import { ref, computed, useAttrs } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElNotification, ElLoading } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import Cookies from 'js-cookie';
import { getEnvironment } from '@/libs/util.win';
import { downloadFile, previewFile } from '@/libs/util.tool';

const props = defineProps({
    // 上传api
    api: {
        type: String,
        default: '/api/quality/common/file/upload',
    },
    // 重新上传覆盖上一次文件，limit必须为1
    isReUpload: {
        type: Boolean,
        default: false,
    },
    // loading目标
    loadingTarget: {
        type: String,
        default: '.upload-file-component',
    },
    // 接口返回格式
    // 1：code=200返回{data:'fileUrl'}，code!=200返回{data:'failExcelFileUrl'}报错并下载
    // 2：code=200返回{data:{fileUrl:'',failExcelFileUrl:'',...}}，failExcelFileUrl有值报错并下载，code!=200仅报错
    resType: {
        type: Number,
        default: 1,
    },
    // 单击文件名执行 download:下载，preview:查看预览
    clickNameType: {
        type: String,
        default: '',
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

const config = {
    name: 'uploadFile',
};
const attrs = useAttrs();
const router = useRouter();

const elUploadRef = ref();
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
    if (!checkAccept(rawFile)) return false;
    if (!checkSize(rawFile)) return false;
    if (!uploading.value) {
        uploading.value = ElLoading.service({
            target: document.querySelector(props.loadingTarget),
            text: '上传中...',
        });
    }
};

// 校验允许上传文件后缀名
const checkAccept = (rawFile) => {
    const accept = attrs?.accept;
    if (!accept) return true;
    const suffixName = rawFile.name.split('.').pop();
    if (!accept.includes(suffixName)) {
        ElMessage({ plain: true, message: '文件类型不正确', type: 'error' });
        return false;
    }
    return true;
};

// 校验文件大小
const checkSize = (rawFile) => {
    const { maxSizeNum, maxSizeArr } = props;
    const fileSize = rawFile.size / 1024 / 1024; // 文件大小
    const fileType = rawFile.type.split('/')[0]; // 文件类型
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
    return !sizeError;
};

// 上传成功
const handleSuccess = (response, uploadFile, uploadFiles) => {
    if (props.isReUpload && attrs?.limit === 1) {
        // 重新上传清空文件列表
        fileList.value = [];
    }
    switch (props.resType) {
        case 1:
            if (response.code !== 200) {
                catchUploadError(uploadFile, response.message);
                // 导入失败下载错误链接文件
                response.data && downloadFile(response.data);
            } else {
                uploadFile.url = typeof response.data === 'string' ? response.data : '';
            }
            break;
        case 2:
            if (response.code !== 200) {
                catchUploadError(uploadFile, response.message);
            } else {
                uploadFile.url = response?.data?.fileUrl || '';
                if (response?.data?.failExcelFileUrl) {
                    catchUploadError(uploadFile, '导入失败，请在文件中查看错误原因');
                    // 校验失败下载错误链接文件
                    downloadFile(response.data.failExcelFileUrl);
                }
            }
            break;
        default:
            break;
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

// 错误处理
const catchUploadError = (uploadFile, msg) => {
    uploadFile.status = 'fail';
    uploadFile.url = '';
    ElNotification({
        type: 'error',
        title: '提示',
        message: msg,
        duration: 3000,
    });
};

// 移除
const handleRemove = (uploadFile, uploadFiles) => {
    fileList.value = [...uploadFiles];
    emit('removeSuccess', fileList.value);
};

// 超出限制
const handleExceed = (files, uploadFiles) => {
    if (props.isReUpload && attrs?.limit === 1) {
        elUploadRef.value.clearFiles();
        elUploadRef.value.handleStart(files[0]); // 手动选择文件
        elUploadRef.value.submit(); // 手动上传
        return;
    }
    console.log('超出限制', files, uploadFiles);
    ElMessage({ plain: true, message: '超出上传数量限制', type: 'error' });
};

// 单击名称
const handlePreview = (uploadFile) => {
    switch (props.clickNameType) {
        case 'download':
            downloadFile(uploadFile.url, uploadFile.name);
            break;
        case 'preview':
            previewFile(uploadFile.url, uploadFile.name, router);
            break;
        default:
            emit('handleClickName', uploadFile);
            break;
    }
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
