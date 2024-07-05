<template>
    <div>
        <p>1)预览PDF</p>
        <vue-office-pdf :src="pdfUrl" class="box" /> <br />

        <p>2)预览docx</p>
        (1)不能预览doc文件，需要后台转换为docx，方可预览 <br />
        (2)文件里面的柱状图会丢失，渲染不出来
        <vue-office-docx :src="docxUrl" class="box" /> <br />

        <p>3)预览excel</p>
        (1)不能预览xls文件，需要后台转换为xlsx，方可预览 <br />
        (2)文件里面的柱状图，形状会丢失，渲染不出来
        <vue-office-excel
            :src="excelUrl"
            :options="{
                minColLength: 0,
                widthOffset: 10,
                heightOffset: 15,
                minRowLength: 0,
            }"
            class="box"
        />
    </div>
</template>

<script setup>
import VueOfficePdf from '@vue-office/pdf';
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';

const pdfUrl = 'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.pdf';
const docxUrl = 'http://static.shanhuxueyuan.com/test6.docx';
const excelUrl = 'http://static.shanhuxueyuan.com/demo/excel.xlsx';
</script>

<style scoped lang="less">
:deep(.box) {
    width: 400px;
    height: 400px;
}
</style>
