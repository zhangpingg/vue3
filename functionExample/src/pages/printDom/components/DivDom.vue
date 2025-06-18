<!--
* @Author: zhangping
* @Date: 2025-05-29 17:47:38
* @Description: 打印 div DOM
-->

<template>
    <div>
        <div>不需要打印的内容</div>
        <main id="main">
            <div class="box1">打印的内容</div>
        </main>
        <Button type="primary" @click="printDom">打印</Button>
    </div>
</template>

<script setup>
// 打印Dom
const printDom = () => {
    let main = document.getElementById('main');
    document.body.innerHTML = main.innerHTML; // 将页面 body 的内容替换为要打印的内容
    window.print(); // 调用浏览器的打印功能，打印当前页面内容
    window.location.reload(); // 打印弹框关闭时，重新加载页面
};
</script>

<style lang="less" scoped>
.box1 {
    color: #0f0;
}
</style>
