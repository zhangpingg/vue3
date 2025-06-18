<!--
* @Author: zhangping
* @Date: 2025-05-29 17:47:38
* @Description: 菜单名称-模块名称
-->

<template>
    <div>
        <div>不需要打印的内容</div>
        <main id="main">
            <div class="box1">打印的内容</div>
            <div id="myChart1" style="width: 300px; height: 200px"></div>
            <div id="myChart2" style="width: 300px; height: 200px"></div>
        </main>
        <Button type="primary" @click="printDom">打印</Button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const myChart1 = ref();
const myChart2 = ref();
const echartsList = ref(['myChart1', 'myChart2']);
const imgList = ref([]);
const colorList = ref(['#ff570f', '#ffcf0f', '#0de093', '#0fb0f7', '#2080f7', '#9acd32']);
const colorChangeList = ref([
    ['#ff570f', '#ff8661'],
    ['#ffcf0f', '#f5cc5d'],
    ['#0de093', '#59ebac'],
    ['#0fb0f7', '#5fd4f7'],
    ['#2080f7', '#6fb6f7'],
    ['#9acd32', '#90ee90']
]);

onMounted(() => {
    init();
});

// 初始化——echarts数据
const init = () => {
    // 饼图
    myChart1.value = echarts.init(document.getElementById('myChart1'));
    let option1 = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}(元) ({d}%)'
        },
        //设置饼图的颜色
        color: ['#0169d4', '#2d89e7', '#65abf3', '#a7d2ff', '#d8eafd'],
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['可用余额', '持有项目', '提现冻结', '投资冻结', '待收收益']
        },
        series: [
            {
                name: '资产配比',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 3, name: '可用余额' },
                    { value: 3, name: '持有项目' },
                    { value: 2, name: '提现冻结' },
                    { value: 1, name: '投资冻结' },
                    { value: 1, name: '待收收益' }
                ]
            }
        ]
    };
    myChart1.value.setOption(option1);
    // 柱状图
    myChart2.value = echarts.init(document.getElementById('myChart2'));
    let option2 = {
        color: ['#f00'], //柱子的颜色
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                data: [10, 20, 30, 40, 50],
                type: 'bar',
                barWidth: '20', // 宽度
                itemStyle: {
                    normal: {
                        //每根柱子颜色设置
                        color: function (params) {
                            var colorList = colorChangeList.value;

                            var index = params.dataIndex % colorList.length;
                            // 如果是纵向的图标，则为0, 0 , 0, 1
                            // 如果是横向的图标，则为1, 0 , 0, 0
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: colorChangeList.value[index][0] },
                                { offset: 1, color: colorList[index][1] }
                            ]);
                        }
                    }
                },
                //柱状图上显示数据
                label: {
                    show: 'true',
                    position: 'top',
                    color: 'auto',
                    fontSize: '12'
                }
            }
        ]
    };
    myChart2.value.setOption(option2);
};
// 打印Dom
const printDom = () => {
    let main = document.getElementById('main');
    document.body.innerHTML = main.innerHTML; // 将页面 body 的内容替换为要打印的内容
    // window.print(); // 调用浏览器的打印功能，打印当前页面内容
    // window.location.reload(); // 打印弹框关闭时，重新加载页面
    // let main = document.getElementById('main');
    // let newContent = main.innerHTML;
    // document.body.innerHTML = newContent;
    //把echarts转换成图片,再打印
    eChartsToImg(echartsList.value).then(() => {
        window.print();
        window.location.reload();
    });
};
// 转换——echarts转换成图片
const eChartsToImg = (arr) => {
    return new Promise((resolve) => {
        for (let i = 0; i < arr.length; i++) {
            var img = new Image();
            console.log(11, myChart1.value.getDataURL());
            // 是 ECharts 提供的一个方法，用于将图表（ECharts 实例）导出为图片的 Base64 数据 URL
            img.src = [echartsList.value[i]].getDataURL(); // 有问题
            // img.src = myChart1.value.getDataURL(); // 正常
            imgList.value[arr[i]] = img.src;
            document.getElementById(echartsList.value[i]).innerHTML =
                "<img style='width:100%' src=" + imgList.value[echartsList.value[i]] + '>';
        }
        resolve();
    });
};
</script>

<style lang="less" scoped>
.box1 {
    color: #0f0;
}
</style>
