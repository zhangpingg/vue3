<template>
    <div>
        <div>
            标注和标注图层-海量点 + 弹框中的点击事件
            <el-button class="ml-20" @click="startRender">渲染30000个标注</el-button>
        </div>
        <div class="box mt-10 mb-10" id="massiveAnnotation-mapContainer"></div>
        <el-button type="primary" @click="startRender">绘制海量点</el-button>
        <el-button type="primary" class="ml-20" @click="clearMassiveAnnotation">清空海量点</el-button>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例
let massivePointsLayer; // 海量点-图层
let massivePointsMarker = []; // 海量点-点
let infoWindowLayer = []; // 信息窗口图层

// 弹框中的事件
const fn1 = (type) => {
    console.log(`${type} 按钮被点击了`);
};
// 开始渲染
const startRender = () => {
    // 创建 AMap.LabelsLayer 图层
    massivePointsLayer = new AMap.LabelsLayer({
        zooms: [3, 20], // 标注层展示层级范围
        zIndex: 100, // 标注层与其它图层的叠加顺序
        collision: false // 标注层内的标注是否避让，true-类似点聚合 false-全部展示
    });
    var positionsList = Positions.slice(0, 30000); // 数据源
    // 普通点：悬浮海量点的时候，展示提示的内容
    var normalMarker = new AMap.Marker({
        anchor: 'bottom-center',
        offset: [0, -30]
    });
    for (var i = 0; i < positionsList.length; i++) {
        let options = {
            position: positionsList[i],
            icon: {
                type: 'image',
                image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                size: [12, 18],
                anchor: 'bottom-center'
            }
        };
        var labelMarker = new AMap.LabelMarker(options); // 标注类
        massivePointsMarker.push(labelMarker);
        // 给marker绑定事件
        labelMarker.on('mouseover', function (e) {
            var position = e.data.data && e.data.data.position;
            if (position) {
                normalMarker.setContent(`<div style="background:#fff; border: 1px solid #f00;">${position}</div>`);
                normalMarker.setPosition(position);
                map.add(normalMarker);
            }
        });
        labelMarker.on('mouseout', function () {
            map.remove(normalMarker);
        });
        labelMarker.on('click', function (e) {
            const content = []; // 构建信息窗体中显示的内容
            content.push(`<div style='padding:0px 40px 0px 10px;'>`);
            content.push(`<div>标题</div>`);
            content.push(`操作：<button id='btn1'>按钮1</button><button id='btn2'>按钮2</button>`);
            content.push(`</div>`);
            let _infoWindow = new AMap.InfoWindow({
                content: content.join(''), // 使用默认信息窗体框样式，显示信息内容
                offset: new AMap.Pixel(0, -20) // 信息窗体显示位置偏移量
            });
            _infoWindow.open(map, [e.lnglat.lng, e.lnglat.lat]);
            infoWindowLayer.push(_infoWindow);

            document.getElementById('btn1').addEventListener('click', function () {
                fn1('btn1');
            });
            document.getElementById('btn2').addEventListener('click', function () {
                fn1('btn2');
            });
        });
    }
    massivePointsLayer.add(massivePointsMarker); // 一次性将海量点添加到图层
    map.add(massivePointsLayer); // 将图层添加到地图
};
// 清空海量点
const clearMassiveAnnotation = () => {
    if (massivePointsLayer) {
        massivePointsLayer.remove(massivePointsMarker);
        massivePointsMarker = [];
        massivePointsLayer = null;
    }
};
// 初始化-地图
const initMap = () => {
    map = new AMap.Map('massiveAnnotation-mapContainer', {
        zoom: 9,
        viewMode: '3D', // 地图视图模式
        center: [116.12, 40.11],
        mapStyle: 'amap://styles/whitesmoke',
        showLabel: false // 是否展示地图文字和 POI 信息
    });
    map.on('complete', function () {
        startRender();
    });
    map.on('click', () => {
        infoWindowLayer.map((item) => {
            item.close();
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
