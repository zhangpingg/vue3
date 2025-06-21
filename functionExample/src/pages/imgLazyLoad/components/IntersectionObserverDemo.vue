<template>
    <div class="box">
        <h1>图片懒加载</h1>
        <div v-for="(item, index) in imageList" :key="index" class="box-item">
            <img
                :src="item.loaded ? item.url : ''"
                :data-index="index"
                :data-src="item.url"
                class="imglazyLoad"
                style="width: 100%; height: 400px"
                @load="imgLoadSuccess(index)"
                @error="imgLoadError(index)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const observerRef = ref();
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
    observerRef.value = new IntersectionObserver(
        (entries, observer) => {
            // entries是一个数组，包含所有被观察的元素的状态信息
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // 自定义属性
                    imageList.value[Number(img.dataset.index)].loaded = true;
                    img.classList.remove('imglazyLoad');
                    observer.unobserve(img); // 断开观察
                }
            });
        },
        {
            root: null, // 指定监听的根元素（即视口）, 默认为浏览器视口
            rootMargin: '200px', // 基于视口扩散或收缩的距离，默认为'0px'
            threshold: 0.1 // 指定目标元素与根元素的交叉比例达到多少时触发
        }
    );
    const imageDomList = document.querySelectorAll('.imglazyLoad');
    imageDomList.forEach((img) => {
        observerRef.value.observe(img); // 触发观察
    });
};
// 图片加载成功
const imgLoadSuccess = (index) => {
    console.log(`图片 ${index + 1} 加载成功`);
};
// 图片加载失败
const imgLoadError = (index) => {
    console.error(`图片 ${index + 1} 加载失败`);
};

onMounted(() => {
    initImgObserver();
});
onUnmounted(() => {
    if (observerRef.value) {
        observerRef.value.disconnect(); // 停止对所有目标元素的观察，防止内存泄漏和不必要的性能消耗
        observerRef.value = null;
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
