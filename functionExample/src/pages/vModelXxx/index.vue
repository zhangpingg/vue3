<template>
    <div class="box">
        <!-- 单个 v-model -->
        <ChildOne v-model="count" class="mb-20" />

        <!--多个 v-model-->
        <ChildTwo v-model:count1="count1" v-model:count2="count2" class="mb-20" />

        <button @click="getData">父级：获取值</button>
    </div>
</template>

<script setup>
import ChildOne from './ChildOne';
import ChildTwo from './ChildTwo';

import { ref } from 'vue';
const count = ref(0);
const count1 = ref(0);
const count2 = ref(0);

const getData = () => {
    console.log('count: ', count.value);
    console.log('count1: ', count1.value);
    console.log('count2: ', count2.value);
};
</script>

<style lang="less" scoped></style>
