<template>
    <div>
        <div class="mb-10">点击获取当前经纬度、自定义右键菜单、经纬度与地址之间的相互查询、点击展示弹框</div>
        <div class="box" id="batchMarker-mapContainer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例
let contextMenu1 = null; // 自定义右键菜单1
let contextMenu2 = null; // 自定义右键菜单2
let markerLayer = []; // 仓库标记图层
let infoWindowLayer = null; // 信息窗口图层

const current = ref();

// 设置-批量标记
const setBatchMarker = (type) => {
    const list1 = [
        { title: '张三', longitude: '120.232513', latitude: '30.305969' },
        { title: '李四', longitude: '120.234229', latitude: '30.273655' }
    ];
    const list2 = [{ title: '王五', longitude: '120.216377', latitude: '30.300337' }];
    map.remove(markerLayer);
    markerLayer = [];
    const _list = type ? list1 : list2;
    _list.map((item) => {
        contextMenu2 = new AMap.ContextMenu();
        let marker = new AMap.Marker({
            map: map,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
            position: new AMap.LngLat(item.longitude, item.latitude) // 这个经纬度是给该marker打点用的
        });
        marker.longitude = item.longitude; // 让marker对象携带经纬，这个是给下面，当你点击marker的时候，让弹框显示，弹框需要的经纬度
        marker.latitude = item.latitude;
        marker.aa = '自定义数据';
        markerLayer.push(marker);
        // marker-鼠标右击
        marker.on('rightclick', function (e) {
            current.value = e.target.index;
            contextMenu1?.close(); // 关闭自定义右键菜单1，如果有值的话
            contextMenu2.open(map, e.lnglat); // 打开自定义右键菜单2
        });
        contextMenu2.addItem('删除该仓库地址', function () {
            setBatchMarker(false);
        });
        // marker-鼠标左击
        marker.on('click', function (e) {
            const { target } = e;
            const content = []; // 构建信息窗体中显示的内容
            content.push(`<div style='padding:0px 40px 0px 10px;'>`);
            content.push(`名称：<b>张三</b>`);
            content.push(`数据：<b>${target.aa}</b>`);
            content.push(`</div>`);
            infoWindowLayer = new AMap.InfoWindow({
                content: content.join('<br/>'), // 使用默认信息窗体框样式，显示信息内容
                offset: new AMap.Pixel(0, -20) // 信息窗体显示位置偏移量
            });
            infoWindowLayer.open(map, [target.longitude, target.latitude]);
        });
    });
};
// 右键-添加
const rightclickAddMarker = () => {
    contextMenu1 = new AMap.ContextMenu();
    let geocoder = new AMap.Geocoder({}); // 地理编码，用于经纬度与地址之间的相互查询
    let currentPositon;
    // 地图-鼠标右击
    map.on('rightclick', function (e) {
        currentPositon = e.lnglat;
        contextMenu2?.close(); // 关闭自定义右键菜单2，如果有值的话
        contextMenu1.open(map, e.lnglat); // 打开自定义右键菜单1
    });
    contextMenu1.addItem('设置仓库地址到此处', function () {
        // 方式1：new AMap.LngLat(120.205104, 30.302248)
        // 方式2：currentPositon
        geocoder.getAddress(currentPositon, function (status, result) {
            if (status === 'complete' && result.regeocode) {
                console.log('添加 marker, 调接口', result.regeocode);
                setBatchMarker(true);
            } else {
                console.log('根据经纬度查询地址失败');
            }
        });
    });
};
// 初始化-地图
const initMap = () => {
    map = new AMap.Map('batchMarker-mapContainer', {
        zoom: 12, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        scrollWheel: true // 是否滚轮缩放
    });
    map.setDefaultCursor('default'); // 设置鼠标样式
    map.on('click', (e) => {
        infoWindowLayer?.close(); // 关闭信息窗口图层
    });
    rightclickAddMarker();
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
