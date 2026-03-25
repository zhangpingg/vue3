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
        :show-file-list="false"
        :disabled="isDragUploaded"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :on-progress="handleProgress"
        :class="[
            {
                'drag-uploaded': isDragUploaded,
                'horizontal-uploaded': isHorizontal && attrs?.limit <= 1,
                'hide-btn-uploaded': !isShowBtn
            },
            'upload-file-component'
        ]"
        v-bind="{ ...attrs, ...config }"
    >
        <template #trigger>
            <slot name="trigger" v-if="isShowBtn">
                <!-- 拖拽上传 -->
                <template v-if="isDragType">
                    <div class="drag-upload" v-if="fileList.length === 0">
                        <el-icon class="el-icon--upload" size="52"><upload-filled /></el-icon>
                        <div class="el-upload__text">点击或将文件拖拽到这里上传</div>
                        <div class="el-upload__tip" v-if="attrs?.accept">支持扩展名：{{ attrs?.accept }}</div>
                    </div>
                    <div class="drag-file flex-col-c" v-for="(item, index) in fileList" :key="index" v-else>
                        <p class="drag-file-main flex-c">
                            <Icon
                                class="cup"
                                type="md-document"
                                size="52"
                                color="red"
                                @click="
                                    onFileOperation(
                                        isAllowPreview(item.url, allowCheckFileTypes) ? 'preview' : 'download',
                                        index,
                                        item
                                    )
                                "
                            />
                            <i
                                class="drag-file-name e-1 cup"
                                @click="
                                    onFileOperation(
                                        isAllowPreview(item.url, allowCheckFileTypes) ? 'preview' : 'download',
                                        index,
                                        item
                                    )
                                "
                                >{{ item.name }}</i
                            >
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
            <slot name="tip"> </slot>
        </template>
        <template #file>
            <slot name="file"> </slot>
        </template>
        <div
            :class="['custom-show-file', { 'mt-10': !isHorizontal && allFileList.length > 0 && isShowBtn }]"
            v-if="isShowFiles"
        >
            <div class="csf-item el-upload-list__item-name" v-for="(item, index) in allFileList" :key="item.url">
                <div class="csf-item-file-name">
                    <el-icon><Document /></el-icon>
                    <span class="el-upload-list__item-file-name" :title="item.name">
                        {{ item.name }}
                    </span>
                </div>
                <div class="csf-item-file-icon">
                    <el-icon
                        class="csf-icon cup"
                        @click="onFileOperation('preview', index, item)"
                        v-if="authTypes.includes('preview') && isAllowPreview(item.url, allowCheckFileTypes)"
                    >
                        <View />
                    </el-icon>
                    <el-icon
                        class="csf-icon cup"
                        @click="onFileOperation('download', index, item)"
                        v-if="authTypes.includes('download')"
                    >
                        <Download />
                    </el-icon>
                    <el-icon
                        class="csf-icon cup"
                        @click="onFileOperation('delete', index, item)"
                        v-if="authTypes.includes('delete') && !disabled"
                    >
                        <Delete />
                    </el-icon>
                </div>
                <div class="csf-progress" v-if="item.status === 'uploading'">
                    <el-progress :show-text="false" :stroke-width="2" :percentage="item.percentage" />
                </div>
            </div>
        </div>
    </el-upload>
</template>

<script setup>
import { ref, computed, useAttrs, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElNotification, ElLoading } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import Cookies from 'js-cookie';
import { getEnvironment } from '@/libs/util.win';
import { downloadFile, previewFile, isAllowPreview } from '@/libs/util.tool';
import Setting from '@/globalSetting';

const { allowCheckFileTypes } = Setting; // 允许查看的文件类型

const props = defineProps({
    // 双向绑定文件列表
    bindList: {
        type: Array,
        default: () => []
    },
    // 绑定文件自定义key
    bindKeys: {
        type: Object,
        default: () => {
            return {
                url: 'url',
                name: 'name'
            };
        }
    },
    // 上传api
    api: {
        type: String,
        default: '/api/pt/common/file/upload'
    },
    // 重新上传覆盖上一次文件，limit必须为1
    isReUpload: {
        type: Boolean,
        default: false
    },
    // 是否水平布局，limit必须为1
    // 注：水平布局不会展示tip插槽
    isHorizontal: {
        type: Boolean,
        default: false
    },
    // loading目标
    loadingTarget: {
        type: String,
        default: '.upload-file-component'
    },
    // 接口返回格式
    // 1：code=200返回{data:'fileUrl'}，code!=200返回{data:'failExcelFileUrl'}报错并下载
    // 2：code=200返回{data:{fileUrl:'',failExcelFileUrl:'',...}}，failExcelFileUrl有值报错并下载，code!=200仅报错
    resType: {
        type: Number,
        default: 1
    },
    // 通用上传文件大小限制 maxSizeNum和maxSizeArr二选一
    maxSizeNum: {
        type: Number,
        default: null
    },
    // 根据文件类型分别设置上传文件大小限制
    // types: image=图片 video=视频 audio=音频 application=wps/pdf text=txt other=其他文件类型
    maxSizeArr: {
        type: Array,
        default: () => [
            // { types: ['image'], maxSize: 5, errTip: '图片文件大小不超过5M' },
            // { types: ['video', 'audio'], maxSize: 200, errTip: '视频音频文件大小不超过200M' },
            // { types: ['other'], maxSize: 10, errTip: '文件大小不能超过10M' },
        ]
    },
    // 文件操作权限控制
    authTypes: {
        type: Array,
        default: () => ['preview', 'download', 'delete']
    },
    // 是否展示上传的文件
    isShowFiles: {
        type: Boolean,
        default: true
    },
    // 禁用上传
    disabled: {
        type: Boolean,
        default: false
    },
    // 是否展示上传按钮
    isShowBtn: {
        type: Boolean,
        default: true
    }
});
const emit = defineEmits(['uploadSuccess', 'removeSuccess', 'update:bindList']);

const config = {
    name: 'uploadFile'
};
const attrs = useAttrs();
const router = useRouter();

const elUploadRef = ref();
// 上传成功的文件列表 通过组件ref回显和取上传后的数据
const fileList = ref([]);
// 所有上传状态的文件列表
const allFileList = ref([]);
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
            text: '上传中...'
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
        if (fileList.value.length) {
            emit('uploadSuccess', convertFiles(fileList.value, false));
            emit('update:bindList', convertFiles(fileList.value, false));
        }
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
        duration: 3000
    });
};
// 上传错误
const handleError = (err, UploadFile, UploadFiles) => {
    uploading.value.close();
    uploading.value = null;
    fileList.value = [];
    emit('update:bindList', []);
    ElNotification({
        type: 'error',
        title: '提示',
        message: '上传失败',
        duration: 3000
    });
};
// 移除
const handleRemove = (uploadFile, uploadFiles) => {
    fileList.value = [...uploadFiles];
    emit('removeSuccess', convertFiles(fileList.value, false));
    emit('update:bindList', convertFiles(fileList.value, false));
};
// 超出限制
const handleExceed = (files, uploadFiles) => {
    if (props.isReUpload && attrs?.limit === 1) {
        elUploadRef.value.clearFiles();
        elUploadRef.value.handleStart(files[0]); // 手动选择文件
        elUploadRef.value.submit(); // 手动上传
        return;
    }
    ElMessage({ plain: true, message: '超出上传数量限制', type: 'error' });
};
// 文件操作 预览/下载/删除
const onFileOperation = (type, index, uploadFile) => {
    switch (type) {
        case 'preview':
            previewFile(uploadFile.url, uploadFile.name, router);
            break;
        case 'download':
            downloadFile(uploadFile.url, uploadFile.name);
            break;
        case 'delete':
            fileList.value.splice(index, 1);
            emit('removeSuccess', convertFiles(fileList.value, false));
            emit('update:bindList', convertFiles(fileList.value, false));
            break;
        default:
            break;
    }
};
// 删除已上传的拖拽文件
const removeDragFileItem = (index) => {
    fileList.value.splice(index, 1);
    emit('update:bindList', convertFiles(fileList.value, false));
};
// 文件上传时
const handleProgress = (evt, uploadFile, uploadFiles) => {
    allFileList.value = uploadFiles;
};
// 文件key转换 true:转换为{url, name}  false:转换为自定义key
const convertFiles = (files, isFlag) => {
    const { url, name } = props.bindKeys;
    if (isFlag) {
        return files.map((item) => {
            const p = {
                url: item[url] || item.url,
                name: item[name] || item.name
            };
            if (typeof item?.response?.data === 'object') {
                p.data = item.response.data;
            }
            return p;
        });
    } else {
        return files.map((item) => {
            const p = {
                [url]: item.url,
                [name]: item.name
            };
            if (typeof item?.response?.data === 'object') {
                p.data = item.response.data;
            }
            return p;
        });
    }
};

defineExpose({
    fileList
});

watch(
    () => props.bindList,
    (val) => {
        fileList.value = convertFiles(val, true);
    },
    { deep: true, immediate: true }
);
watch(
    () => fileList.value,
    (val) => {
        allFileList.value = convertFiles(val, true);
    },
    { deep: true, immediate: true }
);
</script>

<style lang="less" scoped>
.upload-file-component {
    display: block;
    width: 100%;
    text-align: left;
    :deep(.el-upload-list__item.is-success:focus:not(:hover)) {
        display: none !important;
    }
}
.hide-btn-uploaded {
    :deep(.el-upload) {
        display: none;
    }
    :deep(.el-upload-list) {
        margin-top: 0;
    }
}
.horizontal-uploaded {
    display: flex;
    align-items: center;
    min-width: 0;
    :deep(.el-upload-list) {
        flex: 1;
        min-width: 0;
        width: 100%;
        margin: 5px 0 0 0;
    }
    .custom-show-file {
        flex: 1;
        min-width: 0;
    }
}
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
// 自定义文件列表样式
.custom-show-file {
    .csf-item {
        display: flex;
        align-items: center;
        position: relative;
        transition: background-color 0.3s ease;
        min-height: 32px;
        .csf-item-file-name {
            flex: 1;
            display: flex;
            align-items: center;
            min-width: 0;
        }
        .csf-item-file-icon {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            min-width: 0;
            margin-left: 10px;
        }
        .csf-icon:hover {
            color: var(--el-color-primary);
        }
        .csf-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    .csf-item:hover {
        background-color: #f5f7fa;
    }
}
</style>
