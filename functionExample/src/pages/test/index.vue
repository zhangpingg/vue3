<!--
* @Author: zhangping
* @Date: 2025-05-19 10:26:39
* @Description: 菜单名称-模块名称
-->

<template>
    <div>
        <vue-office-pptx :src="pptx" @rendered="renderedHandler" @error="errorHandler" class="box" />
    </div>
</template>

<script>
import VueOfficePptx from '@vue-office/pptx';
export default {
    components: {
        VueOfficePptx
    },
    data() {
        return {
            // 不能预览
            ppt: 'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/29/6921423029642434_06.1748510338261.ppt',
            // 能预览
            pptx: 'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/29/6921454793884033_07.1748510364908.pptx'
        };
    },
    mounted() {},
    methods: {
        renderedHandler() {
            console.log('渲染完成');
        },
        errorHandler() {
            console.log('渲染失败');
        }
    }
};
</script>

<style scoped lang="less">
:deep(.box) {
    width: 800px;
    height: 600px;
}
</style>
