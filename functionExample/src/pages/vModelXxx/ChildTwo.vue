<!--
* @Author: zhangping
* @Date: 2025-07-30 09:04:51
* @Description: 菜单名称-模块名称
-->

<template>
    <div>
        <div>{{ count1 }}</div>
        <div>{{ count2 }}</div>
        <button @click="updateCount1">childTwo：修改父级的数据源count1</button>
        <button @click="updateCount2">childTwo：修改父级的数据源count2</button>
    </div>
</template>

<script setup>
const props = defineProps({
    count1: {
        type: Number,
        default: null
    },
    count2: {
        type: Number,
        default: null
    }
});
const emit = defineEmits(['update:count1', 'update:count2']);

const updateCount1 = () => {
    emit('update:count1', parseInt(Math.random() * 100)); // 固定事件名
};
const updateCount2 = () => {
    emit('update:count2', parseInt(Math.random() * 100)); // 固定事件名
};
</script>
