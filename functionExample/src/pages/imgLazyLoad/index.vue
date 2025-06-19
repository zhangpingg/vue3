<template>
    <div class="box">
        <h1>图片懒加载</h1>
        <div v-for="(item, index) in imageList" :key="index" class="box-item">
            <img
                :src="item.loaded ? item.url : ''"
                :data-imgindex="index"
                :data-imgurl="item.url"
                class="lazyLoad"
                style="width: 100%; height: 400px"
                @load="imgLoadSuccess(index)"
                @error="imgLoadError(index)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const observerObj = ref();
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

// 初始化图片观察者
const initImgObserver = () => {
    const imageDomList = document.querySelectorAll('img.lazyLoad');
    const lazyLoadFn = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.imgurl; // 自定义属性
                imageList.value[Number(img.dataset.imgindex)].loaded = true;
                img.classList.remove('lazyLoad');
                observer.unobserve(img);
            }
        });
    };
    observerObj.value = new IntersectionObserver(lazyLoadFn, {
        root: null, // 指定监听的根元素（即视口）, 默认为浏览器视口
        rootMargin: '200px', // 扩展或收缩根元素的边界框。如提前200px加载
        threshold: 0.1 // 指定目标元素与根元素的交叉比例达到多少时触发
    });
    imageDomList.forEach((img) => {
        observerObj.value.observe(img);
    });
};
// 图片加载成功
const imgLoadSuccess = (index) => {
    console.log(`图片 ${index + 1} 加载成功`);
    imageList.value[index].loaded = true;
};
// 图片加载失败
const imgLoadError = (index) => {
    console.error(`图片 ${index + 1} 加载失败`);
};

onMounted(() => {
    initImgObserver();
});
onUnmounted(() => {
    if (observerObj.value) {
        observerObj.value.disconnect();
        observerObj.value = null;
    }
});
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
