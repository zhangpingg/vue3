<!--
* @Author: zhangping
* @Date: 2025-05-29 17:47:38
* @Description: 自定义打印样式
-->

<template>
    <div>
        <div>不需要打印的内容</div>
        <main id="printJsMain">
            <div class="box1">打印的内容1</div>
            <div class="box2">打印的内容2</div>
        </main>
        <Button type="primary" @click="printDom">打印</Button>
    </div>
</template>

<script setup>
import printJs from 'print-js';
import { printCss } from '../printCss.js'; // 自定义打印的样式
// 打印Dom
const printDom = () => {
    printJs({
        printable: 'printJsMain', // 打印的内容id
        type: 'html', // 打印的类型, 详细的可以在官方文档https://printjs.crabbly.com/中查询
        // 样式1
        //targetStyles: '*' // 继承原有样式, 不能自定义修改
        // 样式2
        scanStyles: false, // 开启自定义样式
        //style: '.box2{font-size:30px}'
        // 样式3
        style: printCss()
    });
};
</script>

<style lang="less" scoped>
.box1 {
    color: #0f0;
}
@page {
    margin: 0 10mm;
}
</style>
