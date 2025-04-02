<template>
    <div>
        <div>省份级行政区图层</div>
        <div class="box mt-10" id="provinceLayer-mapContainer"></div>
        <div class="mt-10">
            <el-button type="primary" @click="clearProvinceLayer">清空省份级行政区图层</el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例
let provinceLayer; // 省份级行政区-图层

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('provinceLayer-mapContainer', {
        zoom: 6, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        viewMode: '3D' // 地图视图模式
    });
    map.setDefaultCursor('default'); // 设置鼠标样式

    provinceLayer = new AMap.DistrictLayer.Province({
        visible: true, // 图层是否可见
        zIndex: 10, // 设置图层层级
        zooms: [5, 15], // 设置图层显示范围
        adcode: '330000', // 行政区的编码 340000-安徽省 330000-浙江省
        opacity: 0.5, // 跟下面的一样，保留一个即可
        depth: 2, // 设置数据显示层级，0：显示国家面，1：显示省级，当国家为中国时设置depth为2的可以显示市一级
        // 方式1
        styles: {
            'stroke-width': 5, // 描边线宽
            'province-stroke': '#f00', // 省界颜色
            fill: 'rgba(0,0,0,0.3)'
        }
    });
    // 方式2：动态设置行政区图层样式
    //provinceLayer.setStyles({
    //    'stroke-width': 0, // 描边线宽
    //    'province-stroke': '#f00', // 省界颜色
    //    fill: 'rgba(0,0,0,0.3)'
    //});
    map.add(provinceLayer);
};
// 清空省份级行政区图层
const clearProvinceLayer = () => {
    map.remove(provinceLayer);
    provinceLayer = null;
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
