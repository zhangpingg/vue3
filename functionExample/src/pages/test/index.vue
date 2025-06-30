<template>
    <div class="box">
        Test页面
        <h1 @click="hanldeClick">点击我报错!</h1>
    </div>
</template>

<script setup>
const hanldeClick = () => {
    throw new Error('test error.');
};
</script>

<style lang="less" scoped></style>
