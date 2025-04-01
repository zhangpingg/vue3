<template>
    <div>
        <div class="box mb-10" id="batchPolyline-mapContainer"></div>
        <el-button type="primary" :disabled="isMapLoading" @click="drawLine">绘制线</el-button>
        <el-button type="primary" :disabled="isMapLoading" @click="clearLine">清空线</el-button>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { hangzhou } from './hangzhou.js';
//import { beijing } from './beijing.js';
//import { anhui } from './anhui.js';

let map = null; // 地图实例
let polylineLayer = []; // 线-图层

const isMapLoading = ref(false);

// 地图点击事件
const mapClick = (e) => {
    new AMap.Marker({
        position: e.lnglat,
        map: map
    });
};
// 初始化-地图
const initMap = () => {
    map = new AMap.Map('batchPolyline-mapContainer', {
        zoom: 8, // 缩放级别
        center: [120.2126, 30.290851], // 杭州
        scrollWheel: true // 是否滚轮缩放
    });
    map.setDefaultCursor('default'); // 设置鼠标样式
    map.on('click', mapClick);
};
// 画线
const drawLine = () => {
    hangzhou.features.map((item, index) => {
        let shortPolyline = new AMap.Polyline({
            path: item.geometry.coordinates,
            isOutline: true, // 是否添加描边
            outlineColor: '#f00', // 描边颜色
            borderWeight: 2, // 描边宽度
            strokeColor: '#00f', // 线条颜色
            strokeOpacity: 1, // 线条透明度
            strokeWeight: 1, // 线条宽度
            strokeStyle: 'solid', // 折线样式：solid-实线 dashed-虚线
            // strokeStyle为'dashed'时有效，
            strokeDasharray: [10, 5], // 设置折线的虚线样式，虚线和间隙的长度
            lineJoin: 'round', // 折线拐点样式：miter-尖角 round-圆角 bevel-斜角
            lineCap: 'round', // 折线两端样式：butt-无头 round-圆头 square-方头
            zIndex: 50
        });
        // 使用 requestIdleCallback 来优化添加折线的操作
        requestIdleCallback(() => {
            isMapLoading.value = true;
            polylineLayer.push(shortPolyline);
            map.add(shortPolyline);
            console.log('绘制进度', index, hangzhou.features.length);
            if (index === hangzhou.features.length - 1) {
                isMapLoading.value = false;
                ElMessage({
                    message: '绘制完成',
                    type: 'success'
                });
            }
        });
    });
    map.setFitView();
};
// 清空线
const clearLine = () => {
    polylineLayer.map((item, index) => {
        requestIdleCallback(() => {
            isMapLoading.value = true;
            map.remove(item);
            console.log('清除进度', index, polylineLayer.length);
            if (index === polylineLayer.length - 1) {
                isMapLoading.value = false;
                polylineLayer = [];
                ElMessage({
                    message: '清除完成',
                    type: 'success'
                });
            }
        });
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
