<template>
    <div class="pt-10 pr-10 pb-10 pl-10">
        <div style="border: 1px solid #ccc">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
        </div>
        <el-button type="primary" class="mt-10" @click="getValue">按钮</el-button>
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const editorRef = shallowRef(); // 编辑器实例，必须用 shallowRef
const valueHtml = ref('<p>默认内容</p>'); // 内容 HTML
const mode = ref('default'); // default、simple
const toolbarConfig = { modalAppendToBody: true };
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            server: '/api/upload/fileUpload',
            fieldName: 'your-custom-name',
            meta: {
                token: 'xxx',
                otherKey: 'yyy'
            },
            headers: {
                Accept: 'text/x-json',
                otherKey: 'xxx'
            },
            withCredentials: true
        }
    }
};

const handleCreated = (editor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
};
// 获取内容
const getValue = () => {
    console.log(12, valueHtml.value);
};

onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    }, 1500);
    // 上传图片的配置
    console.log(11, editorConfig);
    // editorConfig.MENU_CONF['uploadImage'] = {
    //     server: '/api/upload/fileUpload',
    //     fieldName: 'your-custom-name',
    //     meta: {
    //         token: 'xxx',
    //         otherKey: 'yyy'
    //     },
    //     headers: {
    //         Accept: 'text/x-json',
    //         otherKey: 'xxx'
    //     },
    //     withCredentials: true
    // };
});
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
});
</script>

<style lang="less" scoped></style>
