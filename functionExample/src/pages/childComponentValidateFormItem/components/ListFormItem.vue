<!--
* @Author: zhangping
* @Date: 2026-04-01 14:12:15
* @Description: 菜单名称-模块名称
-->

<template>
    <div>
        <div>子组件：{{ list }}</div>
        <el-button @click="addList">添加内容</el-button>
    </div>
</template>

<script setup>
import { inject } from 'vue';
import { formItemContextKey } from 'element-plus';

const formItem = inject(formItemContextKey, null);

const props = defineProps({
    // 列表
    list: {
        type: Array,
        default: () => []
    }
});
const emit = defineEmits(['update:list']);

const addList = () => {
    let _list = [{ id: 1, name: '张三' }];
    emit('update:list', _list);
    formItem?.validate?.('change'); // 触发表单change
};
</script>

<style lang="less" scoped></style>
