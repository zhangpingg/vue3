<template>
    <div>
        <div>批量绘制线</div>
        <div class="box mb-10" id="batchPolyline-mapContainer"></div>

        <div>绘制进度：{{ drawNum }} / {{ hangzhou.features.length }}</div>
        <div>清除进度：{{ clearNum }} / {{ drawNum }}</div>
        <el-button type="primary" :disabled="isMapLoading" @click="drawLine">绘制线</el-button>
        <el-button type="primary" :disabled="isMapLoading" @click="clearLine">清空线</el-button>
        <el-button type="primary" :disabled="isMapLoading" @click="clearOverlayGroup">清空图层组</el-button>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { hangzhou } from './hangzhou.js';

let map = null; // 地图实例
let polylineLayer = []; // 线-图层
let overlayGroup; // 图层组

const isMapLoading = ref(false);
const drawNum = ref(0);
const clearNum = ref(0);

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
    isMapLoading.value = true;
    overlayGroup = new AMap.OverlayGroup();
    clearNum.value = 0;
    hangzhou.features.map((item, index) => {
        let shortPolyline = new AMap.Polyline({
            path: item.geometry.coordinates,
            isOutline: true, // 是否添加描边
            outlineColor: '#f00', // 描边颜色
            borderWeight: 1, // 描边宽度
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
        // 方式1：使用 requestIdleCallback 来优化添加折线的操作
        requestIdleCallback(() => {
            polylineLayer.push(shortPolyline);
            map.add(shortPolyline);
            drawNum.value = ++index;
            if (index === hangzhou.features.length - 1) {
                isMapLoading.value = false;
                ElMessage({
                    message: '绘制完成',
                    type: 'success'
                });
            }
        });
        // 方式2：图层组（加载更快，但是页面拖拽之类的好像很卡）
        //overlayGroup.addOverlay(shortPolyline);
        //overlayGroup.setMap(map);
        //drawNum.value = ++index;
        //if (index === hangzhou.features.length - 1) {
        //    isMapLoading.value = false;
        //    ElMessage({
        //        message: '绘制完成',
        //        type: 'success'
        //    });
        //}
    });
    map.setFitView();
};
// 清空线
const clearLine = () => {
    isMapLoading.value = true;
    polylineLayer.map((item, index) => {
        requestIdleCallback(() => {
            map.remove(item);
            clearNum.value = ++index;
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
// 清空图层组（清除更快）
const clearOverlayGroup = () => {
    clearNum.value = 0;
    overlayGroup.clearOverlays();
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

<!--
    // 如果是通过接口分页调取的数据,需要按如下编写，因为drawLine函数会调多次，即图层组也有好多个，所以需要循环清除
    let overlayGroup = {}; // 图层组
    overlayGroup[current.value] = new AMap.OverlayGroup(); 
    overlayGroup[current.value].addOverlay(shortPolyline);
    overlayGroup[current.value].setMap(map);
    // 清空图层组
    for (let key in overlayGroup) {
        overlayGroup[key].clearOverlays();
    }
-->
