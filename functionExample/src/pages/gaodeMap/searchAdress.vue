<template>
    <div class="sa">
        <div>根据地点在地图上搜索，并定位标记画圆，可拖拽</div>
        <div class="sa-header">
            <el-input placeholder="请输入" type="textarea" v-model="formData.address" class="mb-10"></el-input>
            <el-select v-model="formData.distance" class="mb-10">
                <el-option v-for="item in distanceList" :value="item.value" :key="item.value">
                    {{ item.label }}
                </el-option>
            </el-select>
            <el-button type="primary" class="mb-10" @click="searchMap">搜索定位</el-button>
        </div>
        <div class="sa-map mb-10" id="searchAdress-mapContainer"></div>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="echo">回显数据</el-button>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from 'vue';
import { distanceList } from './const.js';

let map = null; // 地图实例
let markerLayer = []; // 标记-图层
let circleLayer; // 圆形-图层

const formData = reactive({
    address: '浙江省杭州市钱塘区云帆6幢',
    distance: 300,
    longitude: '', // 经度
    latitude: '' // 纬度
});

// 搜索-地址
const searchMap = () => {
    AMap.plugin(['AMap.PlaceSearch'], () => {
        const placeSearch = new AMap.PlaceSearch({
            pageSize: 1, // 单页显示结果条数
            pageIndex: 1, // 页码
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        placeSearch.search(formData.address, (status, result) => {
            if (status === 'complete') {
                console.log(11, result);
                const { location } = result.poiList.pois[0];
                formData.longitude = location.lng;
                formData.latitude = location.lat;
                map.remove(markerLayer); // 清除点标记
                setCenterAndMarker(location.lng, location.lat);
                drawCircle(location.lng, location.lat);
            }
        });
    });
};
/**
 * @description 设为地图中心点并创建点标记
 * @param {Array} position [lng, lat]
 */
const setCenterAndMarker = (lng, lat) => {
    map.setZoomAndCenter(12, [lng, lat]); // 设置地图缩放级别和中心点
    // 创建点标记
    const marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        draggable: true
    });
    // 拖拽结束
    marker.on('dragend', (result) => {
        const { lnglat } = result;
        formData.longitude = lnglat.lng;
        formData.latitude = lnglat.lat;
        // 拖拽结束仅修改中心点
        map.setCenter([lnglat.lng, lnglat.lat]);
        map.remove(markerLayer);
        setCenterAndMarker(lnglat.lng, lnglat.lat);
        drawCircle(lnglat.lng, lnglat.lat);
    });
    markerLayer = [marker];
    map.add(markerLayer); // 添加点标记
};
// 绘制圆圈
const drawCircle = (lng, lat) => {
    const { distance } = formData;
    if (circleLayer) {
        map.remove(circleLayer);
    }
    circleLayer = new AMap.Circle({
        center: new AMap.LngLat(lng, lat),
        radius: distance,
        strokeColor: '#1791fc',
        strokeOpacity: 0.7,
        strokeWeight: 2,
        fillColor: '#1791fc',
        fillOpacity: 0.2
    });
    map.add(circleLayer);
    map.setFitView();
};
//保存
const save = () => {
    console.log('表单数据：', formData);
};
// 回显
const echo = () => {
    const res = {
        address: '安徽省黄山市黄山区永丰乡洪田村陈家',
        longitude: 117.995212,
        latitude: 30.424137,
        distance: 400
    };
    Object.assign(formData, res);
    setCenterAndMarker(res.longitude, res.latitude);
    drawCircle(res.longitude, res.latitude);
};
// 初始化-地图
const initMap = () => {
    map = new AMap.Map('searchAdress-mapContainer', {
        zoom: 12, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        scrollWheel: true // 是否滚轮缩放
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
.sa {
    .sa-header {
        width: 500px;
    }
    .sa-map {
        width: 500px;
        height: 400px;
        border: 1px solid #000;
    }
}
</style>

