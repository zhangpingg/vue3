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

        <!-- 根据地点在地图上搜索，并定位标记画圆，可拖拽 -->
        <SearchAdress />
        <hr class="mt-50 mb-50" />

        <!-- 自定义地图 -->
        <CustomMap />
        <hr class="mt-50 mb-50" />
    </div>
</template>

<script setup>
import Base from './base';
import PolylineDemo from './polylineDemo';
import BatchMarker from './batchMarker';
import SearchAdress from './searchAdress';
import CustomMap from './customMap';
</script>

<style lang="less" scoped></style>

