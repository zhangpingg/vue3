<template>
    <div>
        预览PDF
        <div id="box"></div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import PDFObject from 'pdfobject';

onMounted(() => {
    // 公司地址，不能在线预览，会直接下载，有时间限制，过期了，需要重新获取pdf地址
    // const companyUrl =
    'https://esignoss.esign.cn/1111563786/a929ed8c-cce8-44b9-882b-66c91a93636b/2024%E5%A5%BD%E8%BF%90%E4%B8%AD%E7%AD%96%E6%A9%A1%E8%83%B6%E6%A0%B8%E5%BF%83%E9%97%A8%E5%BA%97%E5%90%88%E4%BD%9C%E5%8D%8F%E8%AE%AE.pdf?Expires=1711704771&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=4WvWlH%2BqHjkIEQkbdmsrlb8l5T8%3D';
    // 网上的线上地址，可在线预览
    const onlineUrl = 'https://pdfobject.com/pdf/sample-3pp.pdf#page=2';
    let options = {
        page: 2, // 页码
        pdfOpenParams: {
            view: 'FitV',
            pagemode: 'thumbs' // 显示页面缩略图
        }
    };
    PDFObject.embed(onlineUrl, '#box', options);
});
</script>

<style scoped>
/** 该类名会默认加在 '#box' 容器上 */
.pdfobject-container {
    height: 400px;
    border: 1px solid #f00;
}
</style>

