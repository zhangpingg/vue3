<template>
    <div>
        <div class="box mb-10" id="base-mapContainer"></div>
        <button class="mr-10 mb-10" @click="setZoom">地图缩放</button>
        <button class="mr-10 mb-10" @click="setCenterPoint">设置中心点</button><br />
        <button class="mr-10 mb-10" @click="setMark">设置 标记+拖拽</button>
        <button class="mr-10 mb-10" @click="clearMark">清除 标记+拖拽</button> <br />
        <button class="mr-10 mb-10" @click="setMarkAndContent">设置 标记+内容</button>
        <button class="mr-10 mb-10" @click="clearMarkAndContent">清除 标记+内容</button> <br />
        <button class="mr-10 mb-10" @click="setCircular">画圆形</button>
        <button class="mr-10 mb-10" @click="closeCircular">清除圆形</button>
        <button class="mr-10 mb-10" @click="curve">曲线</button>
        <button class="mr-10 mb-10" @click="clearCurve">清除曲线</button>
        <button class="mr-10 mb-10" @click="openModal">打开弹框</button>
        <button class="mr-10 mb-10" @click="closeModal">关闭弹框</button>
        <button class="mr-10 mb-10" @click="drawLine">绘制线</button>
        <button class="mr-10 mb-10" @click="clearLine">清空制线</button>
        <button class="mr-10 mb-10" @click="drawLine2">绘制线2</button>
        <button class="mr-10 mb-10" @click="clearLine2">清空制线2</button>
    </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
let map = null; // 地图实例
let markerLayer; // 标记+拖拽-图层
let markAndContentLayer = []; // 标记+内容-图层
let circleLayer; // 圆形-图层
let curveLayer; // 曲线-图层
let infoWindowLayer; // 信息窗口图层
let polylineLayer; // 线-图层
let polylineLayer2 = []; // 线-图层2

const mapInfo = reactive({
    longitude: '', // 经度
    latitude: '' // 纬度
});

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('base-mapContainer', {
        zoom: 12, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        scrollWheel: true // 是否滚轮缩放
    });
    map.setDefaultCursor('default'); // 设置鼠标样式
};
// 设置-地图缩放
const setZoom = () => {
    map.setZoomAndCenter(8, [116.397428, 39.90923]);
    //map.zoomIn(); // 放大
    //map.zoomOut(); // 缩小
};
// 设置-中心点
const setCenterPoint = () => {
    map.setCenter([116.397428, 39.90923]);
};
// 设置-标记+拖拽
const setMark = () => {
    if (markerLayer) {
        return;
    }
    markerLayer = new AMap.Marker({
        position: new AMap.LngLat(120.2126, 30.290851),
        // 自定义标记内容，并可设置偏移量
        // content: "<img src='https://a.amap.com/lbs/static/img/doc/doc_1678970777168_d2b5c.png' />",
        // offset: new AMap.Pixel(-24, -60),
        draggable: true, // 标记可拖拽
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
        title: '提示名称' // 标记悬浮时，展示的提示内容
    });
    markerLayer.on('dragend', (result) => {
        const { lnglat } = result;
        console.log('拖拽后经纬度：', lnglat);
        mapInfo.longitude = lnglat.lng;
        mapInfo.latitude = lnglat.lat;
        map.setCenter([lnglat.lng, lnglat.lat]); // 拖拽结束修改中心点
    });
    map.add(markerLayer); // 如果是多个点的话，可以用数组的形式，详见 markAndContentLayer 示例
};
// 清除-标记+拖拽
const clearMark = () => {
    map.remove(markerLayer);
    markerLayer = null;
};
// 设置-标记+内容
const setMarkAndContent = () => {
    // 清除 marker
    if (markAndContentLayer && markAndContentLayer.length > 0) {
        map.remove(markAndContentLayer);
        markAndContentLayer = [];
    }
    // 创建一个 Icon
    const storeIcon = new AMap.Icon({
        size: new AMap.Size(24, 28), // 图标尺寸
        image: 'https://zc-resource.oss-cn-hangzhou.aliyuncs.com/static/imgs/store-icon.png', // 图标的地址
        imageSize: new AMap.Size(24, 28), // 图标所用图片大小
        imageOffset: new AMap.Pixel(0, 0) // 图标取图偏移量
    });
    let marker1 = new AMap.Marker({
        width: 60,
        height: 28,
        position: new AMap.LngLat(120.2126, 30.290851),
        title: '悬浮时提示内容',
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png'
        //icon: storeIcon,
    });
    marker1.setLabel({
        content: '<div><p>标题</p><p>内容内容内容</p></div>',
        direction: 'top'
    });
    markAndContentLayer.push(marker1);
    map.add(markAndContentLayer);
    map.setFitView();
};
// 清除-标记+内容
const clearMarkAndContent = () => {
    map.remove(markAndContentLayer);
    markAndContentLayer = [];
};
// 设置-圆形
const setCircular = () => {
    circleLayer = new AMap.Circle({
        center: new AMap.LngLat('116.403322', '39.920255'), // 圆心位置
        radius: 3000, //半径
        strokeColor: '#FF33FF', //线颜色
        strokeOpacity: 0.7, //线透明度
        strokeWeight: 3, //线宽
        fillColor: '#1791fc', //填充色
        fillOpacity: 0.5 //填充透明度
    });
    map.add(circleLayer);
    map.setFitView(); // 自动缩放地图到合适的视野级别
};
// 清除-圆形
const closeCircular = () => {
    map.remove(circleLayer);
    circleLayer = null;
};
// 曲线
const curve = () => {
    var lineArr = [
        [116.39, 39.91, 116.37, 39.91], //起点
        //第一段弧线
        [116.380298, 39.907771, 116.38, 39.9] //控制点，途经点
    ];
    curveLayer = new AMap.BezierCurve({
        map: map,
        path: lineArr,
        strokeColor: '#f00', //线颜色
        strokeOpacity: 1, //线透明度
        strokeWeight: 3, //线宽
        strokeStyle: 'solid' //线样式
    });
    map.add(curveLayer);
    map.setFitView(); // 自动缩放地图到合适的视野级别
};
// 清除曲线
const clearCurve = () => {
    map.remove(curveLayer);
};
// 打开-弹框
const openModal = () => {
    const content = [];
    content.push(`<div style='padding:0px 40px 0px 10px; background:#ccc;'>`);
    content.push(`名称：<b>张三</b>`);
    content.push(`年龄：<b>20</b>`);
    content.push(`</div>`);

    infoWindowLayer = new AMap.InfoWindow({
        isCustom: true, // 是否自定义窗体
        content: content.join('<br />'),
        autoMove: true
    });
    infoWindowLayer.open(map, [120.2126, 30.290851]);
};
// 关闭-model
const closeModal = () => {
    infoWindowLayer.close();
};
// 绘制线-一个线为一个图层
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
    map.add(polylineLayer);
    map.setFitView();
};
// 清空线
const clearLine = () => {
    map.remove(polylineLayer);
    polylineLayer = null;
};
// 绘制线-所有的线放一个图层中
const drawLine2 = () => {
    var path = [
        [116.362209, 39.887487],
        [116.422897, 39.878002],
        [116.372105, 39.90651],
        [116.428945, 39.89663]
    ];
    let polyline = new AMap.Polyline({
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
    polylineLayer2.push(polyline);
    map.add(polylineLayer2);
    map.setFitView();
};
// 清空线
const clearLine2 = () => {
    map.remove(polylineLayer2);
    polylineLayer2 = [];
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
