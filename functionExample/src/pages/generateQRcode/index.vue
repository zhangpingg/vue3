<template>
    <div>
        <img :src="url" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';

const url = ref();

const getCode = async () => {
    url.value = await QRCode.toDataURL('https://www.baidu.com/');
    console.log(url);
};

onMounted(() => {
    getCode();
});
</script>

<style lang="less" scoped></style>
