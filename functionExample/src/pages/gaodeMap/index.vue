<!--
* @Author: zhangping
* @Date: 2025-03-28 15:52:19
* @Description: 高德地图
-->

<template>
    <div class="pt-20 pl-20">
        <h2 class="mb-30">如果地图展示有问题，记得在index.html中，把高德的秘钥，key恢复正常即可</h2>

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

        <!-- 标注和标注图层-海量点 -->
        <MassiveAnnotation />
        <hr class="mt-50 mb-50" />

        <!-- 标注和标注图层-文字标注 -->
        <MassiveAnnotationText />
        <hr class="mt-50 mb-50" />

        <!-- 海量点 -->
        <MassivePoints />
        <hr class="mt-50 mb-50" />

        <!-- 混合：自定义地图，点击 (左击) 地图获取该点的信息，画线，画点（点弹框） -->
        <HybridA />
        <hr class="mt-50 mb-50" />
    </div>
</template>

<script setup>
import Base from './base';
import PolylineDemo from './polylineDemo';
import BatchMarker from './batchMarker';
import SearchAdress from './searchAdress';
import CustomMap from './customMap';
import MassiveAnnotation from './massiveAnnotation';
import MassiveAnnotationText from './massiveAnnotationText';
import MassivePoints from './massivePoints';
import HybridA from './hybridA';
</script>

<style lang="less" scoped></style>
