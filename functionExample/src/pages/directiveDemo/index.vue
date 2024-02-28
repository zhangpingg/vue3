<template>
    <div>
        <Input type="text" v-model="val1" :style="{ width: '200px' }" />
        <div>字符串翻转指令：<span v-reserve="val1"></span></div>
        <div>
            复制文本指令：<Button type="primary" v-copy="val1">复制</Button>
        </div>
        <div>
            渲染真实图片指令：
            <img
                v-real-img="'https://www.itying.com/images/flutter/1.png'"
                src="@/assets/placeholder.png"
                :style="{ width: '200px' }"
            />
        </div>
        <div>
            图片懒加载指令：
            <div>
                <img
                    v-lazy-img="'https://www.itying.com/images/flutter/1.png'"
                    :style="{ width: '200px' }"
                />
            </div>
        </div>
        <div>
            按钮权限指令：
            <Button v-permission="'user'">用户模块</Button>
            <Button v-permission="'order'">订单模块</Button>
            <Button v-permission="'goods'">商品模块</Button>
        </div>
        <div>
            loading指令：
            <div
                v-loading="flag"
                loading-text="努力加载中..."
                style="width: 200px; height: 200px; border: 1px solid red"
            >
                内容
            </div>
            <Button @click="flag = !flag">显示/隐藏</Button>
        </div>
        <div>
            点击其他地方弹框消失指令：
            <Button v-clickoutside="clickoutside">点击</Button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Input, Button } from "view-ui-plus";

const val1 = ref("1234");
const flag = ref(false);

const clickoutside = () => {
    console.log("点击了按钮其他地方");
};
</script>

<style scoped></style>
