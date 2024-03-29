<template>
    <div>
        <p>1)预览PDF</p>
        <vue-office-pdf :src="pdfUrl" class="box" />
        <p>2)预览docx</p>
        <vue-office-docx :src="docxUrl" class="box" />
        <p>3)预览excel</p>
        <vue-office-excel :src="excelUrl" class="box" />
    </div>
</template>

<script setup>
import VueOfficePdf from '@vue-office/pdf';
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';

const pdfUrl = 'https://pdfobject.com/pdf/sample-3pp.pdf';
const docxUrl = 'http://static.shanhuxueyuan.com/test6.docx';
const excelUrl = 'http://static.shanhuxueyuan.com/demo/excel.xlsx';
</script>

<style scoped lang="less">
:deep(.box) {
    width: 400px;
    height: 400px;
}
</style>
