<template>
    <div>
        <Button @click="fn1">Modal.error() 弹框使用</Button>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Modal, Button } from 'view-ui-plus';

const fn1 = () => {
    Modal.info({
        title: '提示',
        content: '暂无PDF链接'
    });
};

onMounted(() => {
    // 不能直接调用 Modal.error 方法，需要做一个延迟处理
    Promise.resolve().then(() => {
        fn1();
    });
});
</script>

<style scoped lang="scss"></style>
