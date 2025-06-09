<!--
* @Author: zhangping
* @Date: 2025-05-29 17:47:38
* @Description: 图片不变形的拉伸
-->

<template>
    <div class="box">
        <div class="box1">内容</div>
    </div>
</template>

<script setup></script>

<style lang="less" scoped>
.box {
    /* 1. 先设定边框宽度（上 右 下 左）*/
    border-width: 20px 50px 20px 50px;
    border-style: solid;
    border-color: transparent; /* 透明即可，边框颜色会被 image 覆盖 */

    /* 2. 指定 border-image 源图片 */
    border-image-source: url('./pic.jpg');
    width: 560px;
    height: 160px;
    /* 3. 指定 slice， 把图片分成 9 块 */
    border-image-slice: 20 50 20 50 fill;
    /* 4. 指定拉伸（stretch）—— 
     上边/下边 拉伸水平；左边/右边 拉伸垂直；中间那块自由拉伸/填充 */
    border-image-repeat: stretch;
    transition: 1s;

    /* 5. 你可以给中间区域再加个背景，比如纯白或者另一张图 */
    /* 如果想用内容图，也可以启用下面这行： */
    /* background: url("content.png") no-repeat center/cover; */
    box-sizing: border-box; /* 确保 width/height 包括 border */

    &:hover {
        width: 400px;
        height: 100px;
    }
    .box1 {
        border: 1px solid #000;
        height: 100%;
        background: #fff;
    }
}
</style>
