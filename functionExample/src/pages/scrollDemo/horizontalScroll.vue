<template>
    <div class="box">
        <ul class="box-list">
            <li v-for="item in list" :key="item.id" class="box-list-item">{{ item.name }}</li>
        </ul>
        <Button @click="scrollToRight">滚动到最右侧</Button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Button } from 'view-ui-plus';

const list = [
    { id: 1, name: '选项1' },
    { id: 2, name: '选项2' },
    { id: 3, name: '选项3' },
    { id: 4, name: '选项4' },
    { id: 5, name: '选项5' }
];

// 滚动到最右
const scrollToRight = () => {
    const items = document.querySelectorAll('.box-list-item');
    const scrollOptions = { behavior: 'smooth', block: 'nearest' };
    if (items && items.length) {
        items[items.length - 1].scrollIntoView(scrollOptions);
    }
};
</script>

<style scoped>
.box {
    .box-list {
        border: 1px solid #000;
        display: flex;
        overflow-x: auto;
        width: 200px;
        padding: 5px 10px;
        list-style: none;
        .box-list-item {
            padding: 5px 10px;
            white-space: nowrap;
            border: 1px solid #f00;
        }
    }
}
</style>
