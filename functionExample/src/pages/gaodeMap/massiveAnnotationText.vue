<template>
    <div>
        <div>标注和标注图层-文字标注（全国累计确诊病例分布）</div>
        <div class="box mt-10" id="massiveAnnotationText-mapContainer"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let map = null; // 地图实例

// 初始化-地图
const initMap = () => {
    map = new AMap.Map('massiveAnnotationText-mapContainer', {
        zoom: 4.5,
        center: [109.610747, 35.15261],
        viewMode: '3D',
        showLabel: false, // 是否展示地图文字和 POI 信息
        mapStyle: 'amap://styles/fresh' // 地图的显示样式, fresh-草青色
    });

    // 创建 AMap.LabelsLayer 图层
    var layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 1000,
        collision: false, // 标注层内的标注是否避让，true-类似点聚合 false-全部展示
        allowCollision: false // 标注层内的标注是否允许其它标注层对它避让
    });
    var markers = []; // 标注类集合，即所有的点

    var provinces = yiqingChinaData.provinces || []; // 数据源
    var cityNames = [];
    var specialCity = ['北京', '上海', '天津', '重庆'];
    var colorLegend = {
        // 10: '#f9c02f',
        10: '#f00',
        100: '#f5a54f',
        500: '#f18334',
        1000: '#cc5f42',
        5000: '#a94d36',
        100000: '#792a17'
    };

    // 初始化 labelMarker
    for (var provice of provinces) {
        var cities = provice.cities || [];
        // 正常的省份
        if (specialCity.indexOf(provice.name) !== -1) {
            var totalNumber = 0;
            for (const city of cities) {
                totalNumber += city.confirmedNum;
            }
            cities = [
                {
                    name: provice.name,
                    confirmedNum: totalNumber
                }
            ];
        }
        for (var city of cities) {
            cityNames.push(city.name);
            var curCityData = findInCities(city.name);
            var number = city.confirmedNum;
            if (curCityData && number) {
                var color = getColorByNumber(number);
                var marker = new AMap.LabelMarker({
                    name: city.name,
                    position: [curCityData.x, curCityData.y],
                    zIndex: number,
                    text: {
                        content: city.name + ': ' + city.confirmedNum,
                        direction: 'center',
                        style: { fontSize: 12, fillColor: '#fff', padding: [2, 5], backgroundColor: color }
                    }
                });
                markers.push(marker);
            }
        }
    }
    layer.add(markers); // 将 marker 添加到图层上
    map.add(layer); // 图层添加到地图

    function findInCities(name) {
        for (const city of citiesData) {
            if (name === city.name) {
                return city;
            }
        }
    }
    function getColorByNumber(number) {
        var color;
        for (var key in colorLegend) {
            if (colorLegend.hasOwnProperty(key)) {
                if (number < parseInt(key)) {
                    color = colorLegend[key];
                    break;
                }
            }
        }
        return color;
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
// .collision-btn.disable {
//     background-image: none;
//     color: lightgrey;
//     border-color: lightgrey;
//     cursor: not-allowed;
// }
// .collision-btn.disable:hover {
//     background-color: #fff;
//     border-color: lightgrey;
// }
// .input-card .btn {
//     margin-right: 0.8rem;
// }

// .title {
//     position: absolute;
//     top: 0;
//     left: 50%;
//     padding: 0.5em 1em;
//     height: auto;
//     border-radius: 2px;
//     font-weight: 500;
//     font-size: 20px;
//     width: 307px;
//     margin-left: -153px;
//     text-align: center;
// }
</style>
