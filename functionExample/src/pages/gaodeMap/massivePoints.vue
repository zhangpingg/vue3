<template>
    <div>
        <div>海量点</div>
        <div class="box mt-10" id="massivePoints-mapContainer"></div>
        <div class="input-card">
            <h4>海量点效果切换</h4>
            <div class="input-item">
                <input type="button" class="btn" value="单一图标" @click="setStyle(0)" />
                <input type="button" class="btn" value="多个图标" @click="setStyle(1)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例
let massLayer = null; // 海量点图层

// JSAPI 2.0 支持显示设置 zIndex, zIndex 越大约靠前，默认按顺序排列
var style = [
    {
        url: 'https://webapi.amap.com/images/mass/mass0.png',
        anchor: new AMap.Pixel(6, 6),
        size: new AMap.Size(11, 11),
        zIndex: 3
    },
    {
        url: 'https://webapi.amap.com/images/mass/mass1.png',
        anchor: new AMap.Pixel(4, 4),
        size: new AMap.Size(7, 7),
        zIndex: 2
    },
    {
        url: 'https://webapi.amap.com/images/mass/mass2.png',
        anchor: new AMap.Pixel(3, 3),
        size: new AMap.Size(5, 5),
        zIndex: 1
    }
];

// 初始化-地图
const initMap = () => {
    var map = new AMap.Map('massivePoints-mapContainer', {
        zoom: 4,
        center: [102.342785, 35.312316],
        viewMode: '3D'
    });
    // 海量点图层，实例化海量点类
    massLayer = new AMap.MassMarks(citys, {
        opacity: 0.8,
        zIndex: 111,
        cursor: 'pointer',
        style: style
    });
    var marker = new AMap.Marker({ content: ' ', map: map });
    // 鼠标在点上悬浮时，展示内容
    massLayer.on('mouseover', function (e) {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({ content: e.data.name });
    });
    map.add(massLayer);
};
const setStyle = (type) => {
    if (type === 0) {
        massLayer.setStyle(style[2]);
    } else {
        massLayer.setStyle(style);
    }
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
.input-card .btn {
    margin-right: 1.2rem;
    width: 9rem;
}

.input-card .btn:last-child {
    margin-right: 0;
}
</style>
