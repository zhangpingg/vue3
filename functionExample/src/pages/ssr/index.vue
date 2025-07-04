<template>
    <div>
        <iframe :srcdoc="htmlContent" frameborder="0" class="iframeBox"></iframe>
        <Button @click="getSSRhtml">获取 ssr 的 html</Button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { apiGetSSRhtml } from '@/api/ssr.js';

const htmlContent = ref(''); // 后端返回的完整 HTML 字符串

// 获取sssr的html
const getSSRhtml = async () => {
    const res = await apiGetSSRhtml();
    console.log(res);
    htmlContent.value = res;
};
</script>

<style lang="less" scoped>
.iframeBox {
    width: 300px;
    height: 300px;
    border: 1px solid #000;
}
</style>
