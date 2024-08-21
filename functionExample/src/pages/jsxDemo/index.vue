<template>
    <div>
        父组件
        <ComponentA title="标题" @change="change">
            <span>插槽</span>
        </ComponentA>
    </div>
</template>

<script setup>
import ComponentA from './components/ComponentA.jsx';

const change = (val) => {
    console.log(val);
};
</script>

<style scoped lang="less"></style>
