<template>
    <div>
        <div class="box mb-10" id="base-mapContainer"></div>
        <button class="mr-10 mb-10" @click="setMark">设置 标记+拖拽</button>
        <button class="mr-10 mb-10" @click="clearMark">清除 标记+拖拽</button> <br />
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例
let markerLayer; // 标记+拖拽-图层

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('base-mapContainer', {
        zoom: 12, // 缩放级别
        center: [120.2126, 30.290851], // 中心点坐标
        scrollWheel: true // 是否滚轮缩放
    });
    map.setDefaultCursor('default'); // 设置鼠标样式
};
// 弹框中的事件
const fn1 = (type) => {
    console.log(`${type} 按钮被点击了`);
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
    // marker-鼠标左击
    markerLayer.on('click', function (e) {
        console.log(11, e);
        const content = []; // 构建信息窗体中显示的内容
        content.push(`<div style='padding:0px 40px 0px 10px;'>`);
        content.push(`<div>标题</div>`);
        content.push(`操作：<button id='btn1'>按钮1</button><button id='btn2'>按钮2</button>`);
        content.push(`</div>`);
        let infoWindowLayer = new AMap.InfoWindow({
            content: content.join(''), // 使用默认信息窗体框样式，显示信息内容
            offset: new AMap.Pixel(0, -20) // 信息窗体显示位置偏移量
        });
        infoWindowLayer.open(map, [e.lnglat.lng, e.lnglat.lat]);

        document.getElementById('btn1').addEventListener('click', function () {
            fn1('btn1');
        });
        document.getElementById('btn2').addEventListener('click', function () {
            fn1('btn2');
        });
    });
    map.add(markerLayer); // 如果是多个点的话，可以用数组的形式，详见 markAndContentLayer 示例
};
// 清除-标记+拖拽
const clearMark = () => {
    map.remove(markerLayer);
    markerLayer = null;
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
