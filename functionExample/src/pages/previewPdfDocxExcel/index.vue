<!--
* @Author: zhangping
* @Date: 2026-01-09 15:17:09
* @Description: demo比较完美
-->

<template>
    <div>
        <el-tabs type="border-card" @tab-change="changeTab">
            <el-tab-pane label="预览PDF">
                (1)该插件是简易版，想要更完善的请查看完美版，详见 previewPDF
                <vue-office-pdf :src="pdfUrl" /> <br />
            </el-tab-pane>
            <el-tab-pane label="预览doc、docx">
                (1)不能预览doc文件，需要后台转换为docx，方可预览 <br />
                <vue-office-docx :src="docxUrl" /> <br />
            </el-tab-pane>
            <el-tab-pane label="预览xlx、xlsx">
                (1)不能预览xls文件，需要后台转换为xlsx，方可预览 <br />
                (2)文件里面的柱状图，形状会丢失，渲染不出来, 把柱状图可让后台转换为png
                <vue-office-excel
                    :src="xlsxUrl"
                    :options="{
                        //minColLength: 0, // excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.
                        //minRowLength: 0, // excel最少渲染多少行，如果想实现根据xlsx实际函数渲染，可以将此值设置为0.
                        widthOffset: 10, //如果渲染出来的结果感觉单元格宽度不够，可以在默认渲染的列表宽度上再加 Npx宽
                        heightOffset: 15 //在默认渲染的列表高度上再加 Npx高
                    }"
                />
            </el-tab-pane>
            <el-tab-pane label="预览ppt、pptx">
                (1)不能预览ppt，可以预览pptx
                <vue-office-pptx :src="pptxUrl" @rendered="renderedHandler" @error="errorHandler" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { nextTick } from 'vue';
import VueOfficePdf from '@vue-office/pdf';
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficePptx from '@vue-office/pptx';

const pdfUrl = 'https://pdfobject.com/pdf/sample-3pp.pdf#page=2';
const docxUrl = 'https://zc-oss.zcrubber.com/upload/files/2026/01/08/89190311345885905_05.1767860173163.docx';
const xlsUrl =
    'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/19/9554728736831008_02.1747620689508.xls';
const xlsxUrl =
    'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/19/9554754561609916_09.1747620714778.xlsx';
// 不能预览
const pptUrl =
    'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/29/6921423029642434_06.1748510338261.ppt';
// 能预览
const pptxUrl =
    'https://zc-resource-dev.oss-cn-hangzhou.aliyuncs.com/upload/files/2025/05/29/6921454793884033_07.1748510364908.pptx';

const renderedHandler = () => {
    console.log('渲染完成');
};
const errorHandler = () => {
    console.log('渲染失败');
};
// change-Tab
const changeTab = async () => {
    await nextTick();
    window.dispatchEvent(new Event('resize'));
};
</script>

<style scoped lang="less">
/** pdf */
:deep(.vue-office-pdf) {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
}
/** doc、docx */
:deep(.vue-office-docx) {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
    .docx-wrapper {
        background: none;
        padding-bottom: 30px;
        .docx {
            width: 100% !important;
            height: 100% !important;
            padding: 30px !important;
        }
    }
}
/** xlx、xlsx */
:deep(.vue-office-excel) {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
    .x-spreadsheet-sheet {
        width: 100% !important;
        .x-spreadsheet-table,
        .x-spreadsheet-overlayer {
            width: 100% !important;
            height: 100% !important;
        }
    }
    .x-spreadsheet-container {
        transform: none !important;
        max-width: 100%;
        max-height: 100%;
    }
}
/** ppt、pptx */
:deep(.vue-office-pptx) {
    width: 1200px;
    height: 300px;
    border: 1px solid #000;
    .pptx-preview-wrapper {
        width: 100% !important;
        height: 100% !important;
        background: none !important;
    }
}
</style>
