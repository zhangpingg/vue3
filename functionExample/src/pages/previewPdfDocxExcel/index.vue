<template>
    <div>
        <p>1)预览PDF</p>
        (1)该插件是简易版，想要更完善的请查看完美版，详见 previewPDF
        <vue-office-pdf :src="pdfUrl" class="box" /> <br />

        <p>2)预览docx</p>
        (1)不能预览doc文件，需要后台转换为docx，方可预览 <br />
        (2)excel文件里面的柱状图会丢失，渲染不出来，可让后台转换为png，前端展示
        <vue-office-docx :src="docxUrl" class="box" /> <br />

        <p>3)预览excel</p>
        (1)不能预览xls文件，需要后台转换为xlsx，方可预览 <br />
        (2)文件里面的柱状图，形状会丢失，渲染不出来
        <vue-office-excel
            :src="url2"
            :options="{
                //minColLength: 0, // excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.
                //minRowLength: 0, // excel最少渲染多少行，如果想实现根据xlsx实际函数渲染，可以将此值设置为0.
                widthOffset: 10, //如果渲染出来的结果感觉单元格宽度不够，可以在默认渲染的列表宽度上再加 Npx宽
                heightOffset: 15 //在默认渲染的列表高度上再加 Npx高
            }"
            class="box"
        />
    </div>
</template>

<script setup>
import VueOfficePdf from '@vue-office/pdf';
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';

const pdfUrl = 'https://pdfobject.com/pdf/sample-3pp.pdf#page=2';
const docxUrl = 'http://static.shanhuxueyuan.com/test6.docx';
const excelUrl = 'http://static.shanhuxueyuan.com/demo/excel.xlsx';
const url1 =
    'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/19/9554728736831008_02.1747620689508.xls';
const url2 =
    'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/19/9554754561609916_09.1747620714778.xlsx';
</script>

<style scoped lang="less">
:deep(.box) {
    width: 400px;
    height: 400px;
}
</style>
