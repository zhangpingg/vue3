<template>
    <div>
        <Button @click="openModal">打开自定义全局插件弹框</Button> <br /><br />
        <div>
            <p @click.right="showContextMenu($event)">展示右键菜单</p>
            <p style="text-align: right" @click.right="showContextMenu($event)">展示右侧边界菜单</p>
            <p style="position: absolute; bottom: 0px" @click.right="showContextMenu($event)">展示底部边界菜单</p>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { Button } from 'view-ui-plus';

const { proxy } = getCurrentInstance();

// 打开弹框
const openModal = () => {
    proxy.$confirm.show({
        title: '提示',
        content: '确定要删除该条数据吗？',
        onConfirm: () => {
            console.log('确定');
        },
        onCancel: () => {
            console.log('取消');
        }
    });
};
// 展开右键菜单
const showContextMenu = (e) => {
    e.preventDefault();
    proxy.$contextMenu.show({
        e,
        data: { id: 1, name: '张三', age: 10 }
    });
};
</script>

<style scoped></style>
