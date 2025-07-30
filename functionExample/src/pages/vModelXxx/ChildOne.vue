<!--
* @Author: zhangping
* @Date: 2025-07-30 09:04:51
* @Description: 菜单名称-模块名称
-->

<template>
    <div>
        <div>{{ modelValue }}</div>
        <button @click="updateCount">childOne：修改父级的数据源</button>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        default: null
    }
});
const emit = defineEmits(['update:modelValue']);

const updateCount = () => {
    emit('update:modelValue', parseInt(Math.random() * 100)); // 固定事件名
};
</script>
