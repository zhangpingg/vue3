<template>
    <div>
        <div>自定义地图</div>
        <div class="box mt-10" id="customMap-mapContainer"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('customMap-mapContainer', {
        zoom: 9, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        scrollWheel: true, // 是否滚轮缩放
        mapStyle: 'amap://styles/eed6bd92ef6e537a61874677487d66ca' //设置地图的显示样式
    });
};

onMounted(() => {
    initMap();
});
onUnmounted(() => {
    map.destroy();
});
</script>

<style lang="less" scoped>
.box {
    width: 600px;
    height: 400px;
    border: 1px solid #000;
}
</style>
