<template>
    <div>
        <div>省份级行政区图层</div>
        <div class="box mt-10" id="provinceLayerTwo-mapContainer"></div>
        <div class="mt-10">
            <span>选择省份</span>
            <el-select v-model="formData.province" class="mr-20" style="width: 200px" @change="changeProvince">
                <el-option v-for="item in adcodeList" :key="item.adcode" :label="item.name" :value="item.adcode" />
            </el-select>
            <span>选择层级</span>
            <el-select v-model="formData.depth" style="width: 200px" @change="changeLevel">
                <el-option key="0" label="0-显示省级" :value="0" />
                <el-option key="1" label="1-显示市级" :value="1" />
                <el-option key="2" label="2-示区/县级" :value="2" />
            </el-select>
        </div>
        <div class="mt-10">
            <el-button type="primary" @click="clearProvinceLayer">清空省份级行政区图层</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
import { adcodeList } from './const';

let map = null; // 地图实例
let provinceLayer; // 省份级行政区-图层

const formData = reactive({ province: 130000, depth: 1 });

function initPro(adcode, depth) {
    // 颜色辅助方法
    let colors = {};
    const getColorByAdcode = (adcode) => {
        if (!colors[adcode]) {
            var gb = Math.random() * 155 + 50;
            colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
        }
        return colors[adcode];
    };

    formData.province = adcode;
    formData.depth = depth;
    provinceLayer && provinceLayer.setMap(null); // 清空图层
    provinceLayer = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: String(adcode),
        depth: depth, // 数据的层级深度
        styles: {
            fill: function (properties) {
                //console.log('区块内容', properties);
                // properties 可用于给每个区块定义不同的颜色
                // NAME_CHN:中文名称
                // adcode_pro // 省code
                // adcode_cit // 市code
                // adcode  // 区线code
                return getColorByAdcode(properties.adcode);
            },
            'province-stroke': '#f00', // 省界颜色
            'city-stroke': '#0f0', // 地级市边界颜色
            'county-stroke': '#0ff' // 区/县界颜色
        }
    });
    map.add(provinceLayer);
}
// change-省份
const changeProvince = (val) => {
    initPro(val, formData.depth);
};
// change-层级
const changeLevel = (val) => {
    initPro(formData.province, val);
};

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('provinceLayerTwo-mapContainer', {
        zoom: 4.5,
        center: [116.412427, 39.303573],
        viewMode: '3D',
        pitch: 0
    });

    initPro(formData.province, formData.depth);
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
