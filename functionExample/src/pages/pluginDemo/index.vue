<template>
    <div>
        <Button type="primary" @click="openModal">打开自定义全局插件弹框</Button>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { Button } from 'view-ui-plus';

const { proxy } = getCurrentInstance();

const openModal = () => {
    proxy.$confirm.show({
        title: '提示',
        content: '确定要删除该条数据吗？',
        onConfirm: () => {
            console.log('确定');
        },
        onCancel: () => {
            console.log('取消');
        },
    });
};
</script>

<style scoped></style>
