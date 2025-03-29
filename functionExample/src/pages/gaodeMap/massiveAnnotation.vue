<template>
    <div>
        <div>
            标注和标注图层-海量点
            <el-button class="ml-20" @click="startRender">渲染30000个标注</el-button>
        </div>
        <div class="box mt-10" id="massiveAnnotation-mapContainer"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例

// 开始渲染
const startRender = () => {
    // 创建 AMap.LabelsLayer 图层
    var labelsLayer = new AMap.LabelsLayer({
        zooms: [3, 20], // 标注层展示层级范围
        zIndex: 1000, // 标注层与其它图层的叠加顺序
        collision: false // 标注层内的标注是否避让，true-类似点聚合 false-全部展示
    });
    var markers = []; // 标注类集合，即所有的点

    var positionsList = Positions.slice(0, 3e4); // 数据源
    // 普通点：悬浮海量点的时候，展示提示的内容
    var normalMarker = new AMap.Marker({
        anchor: 'bottom-center'
    });
    for (var i = 0; i < positionsList.length; i++) {
        let options = {
            position: positionsList[i],
            icon: {
                type: 'image',
                image: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                size: [6, 9],
                anchor: 'bottom-center'
            }
        };
        var labelMarker = new AMap.LabelMarker(options); // 标注类
        markers.push(labelMarker);
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
    }
    labelsLayer.add(markers); // 一次性将海量点添加到图层
    map.add(labelsLayer); // 将图层添加到地图
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
