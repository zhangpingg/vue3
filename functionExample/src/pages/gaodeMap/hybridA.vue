<template>
    <div>
        <div>自定义地图，点击 (左击) 地图获取该点的信息，画线，画点（点弹框）</div>
        <div class="box mt-10" id="hybridA-mapContainer"></div>
        <div class="mt-10">
            <el-button type="primary" @click="drawLine">画线</el-button>
            <el-button type="primary" @click="clearLine">清空线</el-button>
            <el-button type="primary" @click="setBatchMarker">打批量标记</el-button>
            <el-button type="primary" @click="claerBatchMarker">清空批量标记</el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例
let polylineLayer; // 线图层
let markerLayer = []; // 标记图层
let infoWindowLayer = null; // 信息窗口图层

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('hybridA-mapContainer', {
        zoom: 9, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        scrollWheel: true, // 是否滚轮缩放
        mapStyle: 'amap://styles/eed6bd92ef6e537a61874677487d66ca', //设置地图的显示样式
        viewMode: '3D', // 地图视图模式
        pitch: 40 // 地图俯仰角度，2D地图下无效
    });
    map.setDefaultCursor('default'); // 设置鼠标样式

    var geocoder = new AMap.Geocoder({});
    map.on('click', (e) => {
        infoWindowLayer?.close(); // 关闭信息窗口图层
        geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], (status, res) => {
            if (status === 'complete' && res.regeocode) {
                console.log('道路信息:', res.regeocode.formattedAddress);
                if (res.regeocode.formattedAddress.includes('高速')) {
                    // 过滤高速编号
                    const regex = /[A-Z]\d+(?=[\u4e00-\u9fa5]+高速)/; // 匹配一个大写字母后跟一个或多个数字，但要求其后必须紧跟着中文字符和"高速"字符
                    const result = res.regeocode.formattedAddress.match(regex);
                    // 匹配高速名称
                    const highwayRegex = /([\u4e00-\u9fa5]+)(高速)/;
                    const match = res.regeocode.formattedAddress.match(highwayRegex);
                    const highwayName = match[1] + match[2]; // 匹配到的高速名称 如：杭瑞高速
                    if (result) {
                        const codeHighwayName = `${result[0]}${highwayName}`;
                        console.log(20, codeHighwayName); // G56杭瑞高速
                    }
                }
            }
        });
    });
};
// 画线
const drawLine = () => {
    var path = [
        [116.362209, 39.887487],
        [116.422897, 39.878002],
        [116.372105, 39.90651],
        [116.428945, 39.89663]
    ];
    polylineLayer = new AMap.Polyline({
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
    map.add([polylineLayer]);
    map.setFitView();
};
// 清空线
const clearLine = () => {
    map.remove(polylineLayer);
    polylineLayer = null;
};
// 设置-批量标记
const setBatchMarker = () => {
    const list1 = [
        { title: '张三', longitude: '120.232513', latitude: '30.305969' },
        { title: '李四', longitude: '120.234229', latitude: '30.273655' },
        { title: '王五', longitude: '120.216377', latitude: '30.300337' }
    ];
    if (markerLayer.length > 0) {
        map.remove(markerLayer);
        markerLayer = [];
    }
    list1.map((item) => {
        let marker = new AMap.Marker({
            map: map,
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
            position: new AMap.LngLat(item.longitude, item.latitude)
        });
        marker.longitude = item.longitude;
        marker.latitude = item.latitude;
        marker.aa = '自定义数据';
        markerLayer.push(marker);
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
    map.setFitView();
};
// 清空标记
const claerBatchMarker = () => {
    infoWindowLayer?.close(); // 关闭信息窗口图层
    map.remove(markerLayer);
    markerLayer = [];
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
