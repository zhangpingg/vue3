<!--
* @Author: zhangping
* @Date: 2025-12-02 09:40:43
* @Description: 菜单名称-模块名称
-->

<template>
    <div>
        <div>其他内容</div>
        <el-button @click="uploadFolder" id="box1">上传文件夹</el-button>
        <NativeUploadFolder ref="nativeUploadFolderRef" :parentId="100" loadingContainer="#box1" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import NativeUploadFolder from './components/NativeUploadFolder';

const nativeUploadFolderRef = ref(null);

// 上传文件夹
const uploadFolder = () => {
    nativeUploadFolderRef.value.openUploadFolder();
};
</script>
