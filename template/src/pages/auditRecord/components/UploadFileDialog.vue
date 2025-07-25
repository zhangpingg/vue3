<template>
    <div class="ufd">
        <el-dialog v-model="visible" title="上传" width="580" :close-on-click-modal="false" class="loadingWrap">
            <el-form :model="formData" :label-width="labelWidth">
                <el-form-item label=" 营业执照：" prop="fileUrl" required v-if="dialogType === '1'">
                    <UploadFile
                        v-bind="{
                            ...uploadFileConfig,
                            accept: '.jpg,.png,.pdf,.bmp',
                            maxSizeArr: [{ types: ['image'], maxSize: 5, errTip: '图片文件大小不超过5M' }],
                        }"
                        @handleClickName="handleClickName"
                        @uploadSuccess="uploadSuccess"
                        @removeSuccess="removeSuccess"
                    >
                        <template #trigger>
                            <el-button>
                                <el-icon class="el-icon--right mr-10"><Upload /></el-icon>
                                {{ uploadBtnText }}
                            </el-button>
                        </template>
                        <template #tip>
                            <div class="el-upload__tip">支持jpg、png、pdf、bmp格式；图片文件大小不超过5M</div>
                        </template>
                    </UploadFile>
                </el-form-item>
                <el-form-item label="营业期限：" prop="expirationDate" required v-if="dialogType === '1'">
                    {{ formData.expirationDate || '-' }}
                </el-form-item>
                <el-form-item label="工艺流程图：" prop="fileUrl" required v-if="dialogType === '2'">
                    <UploadFile
                        v-bind="{
                            ...uploadFileConfig,
                            accept: '.pdf',
                        }"
                        @handleClickName="handleClickName"
                        @uploadSuccess="uploadSuccess"
                        @removeSuccess="removeSuccess"
                    >
                        <el-button>
                            <el-icon class="el-icon--right mr-10"><Upload /></el-icon>
                            {{ uploadBtnText }}
                        </el-button>
                        <template #tip>
                            <div class="el-upload__tip">支持pdf格式</div>
                        </template>
                    </UploadFile>
                </el-form-item>
                <el-form-item label="中策SQS审核表(Ⅰ类)：" prop="fileUrl" required v-if="dialogType === '3'">
                    <UploadFile
                        v-bind="{
                            ...uploadFileConfig,
                            accept: '.xlsx,.xls',
                        }"
                        @handleClickName="handleClickName"
                        @uploadSuccess="uploadSuccess"
                        @removeSuccess="removeSuccess"
                    >
                        <el-button>
                            <el-icon class="el-icon--right mr-10"><Upload /></el-icon>
                            {{ uploadBtnText }}
                        </el-button>
                        <template #tip>
                            <div class="el-upload__tip">支持xlsx、xls格式</div>
                        </template>
                    </UploadFile>
                </el-form-item>
                <!--456 待定-->
                <el-form-item label="CP：" prop="fileUrl" required v-if="dialogType === '7'">
                    <UploadFile
                        v-bind="{
                            ...uploadFileConfig,
                            accept: '.xlsx,.xls,.pdf',
                        }"
                        @handleClickName="handleClickName"
                        @uploadSuccess="uploadSuccess"
                        @removeSuccess="removeSuccess"
                    >
                        <el-button>
                            <el-icon class="el-icon--right mr-10"><Upload /></el-icon>
                            {{ uploadBtnText }}
                        </el-button>
                        <template #tip>
                            <div class="el-upload__tip">支持xlsx、xls、pdf格式</div>
                        </template>
                    </UploadFile>
                </el-form-item>
                <el-form-item label="FMEA：" prop="fileUrl" required v-if="dialogType === '8'">
                    <UploadFile
                        v-bind="{
                            ...uploadFileConfig,
                            accept: '.xlsx,.xls,.pdf',
                        }"
                        @handleClickName="handleClickName"
                        @uploadSuccess="uploadSuccess"
                        @removeSuccess="removeSuccess"
                    >
                        <el-button>
                            <el-icon class="el-icon--right mr-10"><Upload /></el-icon>
                            {{ uploadBtnText }}
                        </el-button>
                        <template #tip>
                            <div class="el-upload__tip">支持xlsx、xls、pdf格式</div>
                        </template>
                    </UploadFile>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="openCloseDialog(false)">取消</el-button>
                    <el-button type="primary" :loading="loadings.submit" @click="submit">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import UploadFile from '@/components/uploadFile';
import { api as viewerApi } from 'v-viewer';
import { previewFile, downloadFile } from '@/libs/util.tool';
import { apiConvertFileType } from '@/api/common';
import { apiParseBusinessLicense, apiUploadData } from '@/api/auditRecord';
import Setting from '@/globalSetting';

const router = useRouter();
const { allowPreviewTypes } = Setting;

const emit = defineEmits(['onSuccess']);

const visible = ref(false);
const formData = reactive({});
const dialogType = ref();
const uploadFileRef = ref();
const loadings = reactive({ submit: false });

// 上传文件的公共配置
const uploadFileConfig = computed(() => {
    return {
        ref: 'uploadFileRef',
        api: '/api/supplier/common/file/upload',
        needDownload: false,
    };
});
// 上传按钮文本
const uploadBtnText = computed(() => {
    return formData.fileUrl ? '重新上传' : '上传文件';
});
// 表单的label宽度
const labelWidth = computed(() => {
    switch (dialogType.value) {
        case '3':
            return 190;
        default:
            return 110;
    }
});
// 打开弹框
const openCloseDialog = (flag, data) => {
    visible.value = flag;
    if (flag) {
        dialogType.value = data.dialogType;
        Object.assign(formData, data);
        Promise.resolve().then(() => {
            if (data.fileUrl) {
                uploadFileRef.value.fileList = [{ name: data.fileName, url: data.fileUrl }];
            }
        });
    } else {
        formData.id = null;
        formData.fileUrl = null;
        formData.expirationDate = null;
        uploadFileRef.value.fileList = [];
    }
};
// 提交
const submit = async () => {
    try {
        loadings.submit = true;
        const res = await apiUploadData(formData);
        if (res) {
            ElMessage({
                message: '上传成功',
                type: 'success',
                plain: true,
            });
            openCloseDialog(false);
            emit('onSuccess');
        }
        loadings.submit = false;
    } catch (error) {
        loadings.submit = false;
    }
};
// 单击名称 needDownload为false才执行
const handleClickName = (uploadFile) => {
    const _list = uploadFile.name.split('.');
    const extension = _list[_list.length - 1];
    if (allowPreviewTypes.includes(extension)) {
        previewFile(uploadFile.url, uploadFile.name, router);
    } else {
        downloadFile(uploadFile.url, uploadFile.name);
    }
};
// 上传成功
const uploadSuccess = async (list) => {
    const lastItem = list[list.length - 1];
    formData.fileUrl = lastItem.url;
    formData.fileName = lastItem.name;
    uploadFileRef.value.fileList = [lastItem];
    if (dialogType.value === '1') {
        try {
            const res = await apiParseBusinessLicense({ url: formData.fileUrl });
            formData.expirationDate = res;
        } catch (error) {
            formData.expirationDate = null;
        }
    }
};
// 移除成功
const removeSuccess = (list) => {
    formData.fileUrl = null;
};

defineExpose({ openCloseDialog });
</script>

<style lang="less" scoped>
.ufd {
    :deep(.el-form-item) {
        margin-bottom: 0;
        .el-form-item__label {
            padding-right: 0;
        }
        .el-form-item__content {
            padding-right: 30px;
            .el-upload__tip {
                margin-top: 2px;
                line-height: 20px;
                color: #999;
            }
            .el-upload-list__item-info {
                margin-left: 0;
            }
            .el-upload-list__item-name {
                padding-left: 0;
            }
            .upload-file-component {
                min-width: 300px;
            }
        }
    }
}
</style>
