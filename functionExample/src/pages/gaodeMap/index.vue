<!--
* @Author: zhangping
* @Date: 2025-03-28 15:52:19
* @Description: 高德地图
-->

<template>
    <div class="pt-20 pl-20">
        <Base />
        <hr class="mt-50 mb-50" />
        <!--画线-->
        <PolylineDemo />
        <hr class="mt-50 mb-50" />
        <!-- 批量打点 -->
        <BatchMarker />
        <hr class="mt-50 mb-50" />
    </div>
</template>

<script setup>
import Base from './base';
import PolylineDemo from './polylineDemo';
import BatchMarker from './batchMarker';
</script>

<style lang="less" scoped></style>

