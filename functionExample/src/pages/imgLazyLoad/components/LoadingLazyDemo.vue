<template>
    <div class="box">
        <h1>图片懒加载</h1>
        <div v-for="(item, index) in imageList" :key="index" class="box-item">
            <img
                :src="item.url"
                style="width: 100%; height: 400px"
                @load="imgLoadSuccess(index)"
                @error="imgLoadError(index)"
                loading="lazy"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const imageList = ref([
    { url: 'https://picsum.photos/800/400?random=1', loaded: false },
    { url: 'https://picsum.photos/800/400?random=2', loaded: false },
    { url: 'https://picsum.photos/800/400?random=3', loaded: false },
    { url: 'https://picsum.photos/800/400?random=4', loaded: false },
    { url: 'https://picsum.photos/800/400?random=5', loaded: false },
    { url: 'https://picsum.photos/800/400?random=6', loaded: false },
    { url: 'https://picsum.photos/800/400?random=7', loaded: false },
    { url: 'https://picsum.photos/800/400?random=8', loaded: false },
    { url: 'https://picsum.photos/800/400?random=9', loaded: false },
    { url: 'https://picsum.photos/800/400?random=10', loaded: false }
]);

// 图片加载成功
const imgLoadSuccess = (index) => {
    console.log(`图片 ${index + 1} 加载成功`);
    imageList.value[index].loaded = true;
};
// 图片加载失败
const imgLoadError = (index) => {
    console.error(`图片 ${index + 1} 加载失败`);
};
</script>

<style lang="less" scoped>
.box {
    width: 600px;
    padding: 20px;
    border: 1px solid #000;
    .box-item {
        border-radius: 8px;
        background: #f0f0f0;
        margin-top: 20px;
    }
}
</style>
