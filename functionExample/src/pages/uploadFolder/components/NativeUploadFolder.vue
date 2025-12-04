<!--
* @Author: zhangping
* @Date: 2025-11-28 15:13:04
* @Description: 原生方式，上传文件夹
-->

<template>
    <div>
        <input ref="inputRef" type="file" webkitdirectory mozdirectory @change="changeInput" class="dn" />

        <!--接口上传成功后，页面没展示出来，是因为接口没有返回url-->
        <div v-for="item in uploadedFileList">
            <img :src="item.fileUrl" width="100px" />
        </div>
    </div>
</template>

<script setup>
import { ref, defineExpose, h, watch, nextTick, onBeforeUnmount } from 'vue';
import { ElMessage, ElNotification, ElLoading } from 'element-plus';
import { Refresh } from '@element-plus/icons-vue';
import axios from 'axios';
import Cookies from 'js-cookie';

const props = defineProps({
    // 父级id
    parentId: {
        type: [Number, String],
        default: null
    },
    // loading容器
    loadingContainer: {
        type: String,
        default: ''
    }
});
const emit = defineEmits(['onSuccess']);

const inputRef = ref(null);
const fileList = ref([]); // 选中的文件
const uploadedFileList = ref([]); // 已上传文件列表
const uploadedSuccessCount = ref(0); // 上传成功的数量
const uploadFailCount = ref(0); // 上传失败的数量
const notificationInstance = ref(); // 通知消息的实例
const timer = ref();
const hash = ref(); // 接口参数需要的hash
const loadingInstance = ref(null); // loading实例

// 获取格式化的日期时间作为 hash
const getDateTimeHash = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
// 打开上传文件夹
const openUploadFolder = () => {
    hash.value = getDateTimeHash();
    inputRef.value.click();
};
// 选择文件夹
const changeInput = async (e) => {
    fileList.value = Array.from(e.target.files);
    if (!loadingInstance.value) {
        loadingInstance.value = ElLoading.service({
            target: document.querySelector(props.loadingContainer),
            text: '上传中...'
        });
    }
    openUploadProgressNotification();
    // 串行上传文件
    for (let index = 0; index < fileList.value.length; index++) {
        const item = fileList.value[index];
        await uploadFileFn(item);
    }
    // 需要清空：不然如果上传同一个文件夹的时候，input 值不变，则不会触发 change 事件
    e.target.value = '';
};
// 判断是否上传结束
const JudgeUploadEnd = () => {
    if (uploadedSuccessCount.value + uploadFailCount.value === fileList.value.length) {
        ElMessage({
            type: 'success',
            message: `上传结束，总共${fileList.value.length || 0}个文件，成功${uploadedSuccessCount.value || 0}个，失败${uploadFailCount.value || 0}个`,
            duration: 4000
        });
        emit('onSuccess', [props.parentId]);
        timer.value = setTimeout(() => {
            closeNotification();
            fileList.value = [];
            uploadedFileList.value = [];
            uploadedSuccessCount.value = 0;
            uploadFailCount.value = 0;
            loadingInstance.value.close();
            loadingInstance.value = null;
        }, 1000);
    }
};
// 上传文件
const uploadFileFn = (file) => {
    return new Promise((resolve) => {
        let url = '/test/api/pt/customer/file/upload/folder';
        let formData = new FormData();
        formData.append('uploadFile', file, file.webkitRelativePath);
        formData.append('hash', hash.value);
        formData.append('parentId', props.parentId);
        let token = '';
        axios
            .post(url, formData, { headers: { Authorization: token } }) // CRM 的 token
            .then((res) => {
                if (!!res.data) {
                    uploadedFileList.value.push({ fileUrl: res.data.data });
                    uploadedSuccessCount.value++;
                } else {
                    uploadFailCount.value++;
                }
                JudgeUploadEnd();
                resolve();
            })
            .catch((err) => {
                uploadFailCount.value++;
                JudgeUploadEnd();
                resolve();
            });
    });
};
// 打开上传进度通知
const openUploadProgressNotification = () => {
    notificationInstance.value = ElNotification({
        message: h('div', {}, [
            h('div', { style: { fontWeight: 'bold', marginBottom: '5px', display: 'flex' } }, [
                h(Refresh, {
                    style: {
                        color: '#409eff',
                        margin: '2px 8px 0 0',
                        width: '20px',
                        height: '20px',
                        animation: 'spinAnimation 1s linear infinite'
                    }
                }),
                '任务运行中'
            ]),
            [
                h(
                    'div',
                    { id: 'notificationContent' },
                    `正在操作${fileList.value.length || 0}个文件，已成功${uploadedSuccessCount.value || 0}个，失败${uploadFailCount.value || 0}个`
                )
            ]
        ]),
        duration: 0,
        position: 'bottom-right'
    });
};
// 关闭上传进度通知
const closeNotification = () => {
    notificationInstance.value.close();
};
// 更新通知内容
const updateNotificationContent = () => {
    const notificationContentDom = document.getElementById('notificationContent');
    if (!!notificationContentDom) {
        notificationContentDom.textContent = `正在操作${fileList.value.length || 0}个文件，已成功${uploadedSuccessCount.value || 0}个，失败${uploadFailCount.value || 0}个`;
    }
};

defineExpose({
    openUploadFolder
});
// 监听上传计数变化
watch([uploadedSuccessCount, uploadFailCount], async () => {
    await nextTick();
    updateNotificationContent();
});
onBeforeUnmount(() => {
    clearTimeout(timer.value);
});
</script>

<style lang="less">
.boxxx {
    border: 1px solid #000;
}
</style>
