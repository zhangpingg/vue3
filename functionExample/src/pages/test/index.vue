<template>
    <div id="polyline-mapContainer"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例

var path = [
    [116.362209, 39.887487],
    [116.422897, 39.878002],
    [116.372105, 39.90651],
    [116.428945, 39.89663]
];

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('polyline-mapContainer', {
        zoom: 12, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        scrollWheel: true, // 是否滚轮缩放
        mapStyle: 'amap://styles/eed6bd92ef6e537a61874677487d66ca'
    });
    var polyline = new AMap.Polyline({
        path: path,
        isOutline: true, // 是否添加描边
        outlineColor: '#f00', // 描边颜色
        borderWeight: 2, // 描边宽度
        strokeColor: '#00f', // 线条颜色
        strokeOpacity: 1, // 线条透明度
        strokeWeight: 2, // 线条宽度
        strokeStyle: 'solid', // 折线样式：solid-实线 dashed-虚线
        // strokeStyle为'dashed'时有效，
        strokeDasharray: [10, 5], // 设置折线的虚线样式，虚线和间隙的长度
        lineJoin: 'round', // 折线拐点样式：miter-尖角 round-圆角 bevel-斜角
        lineCap: 'round', // 折线两端样式：butt-无头 round-圆头 square-方头
        zIndex: 50
    });
    map.add([polyline]);
    map.setFitView();
};

onMounted(() => {
    initMap();
});
onUnmounted(() => {
    map.destroy();
});
</script>

<style lang="less" scoped>
#polyline-mapContainer {
    width: 600px;
    height: 400px;
    border: 1px solid #000;
}
</style>
