<template>
    <div class="box">
        <h1>图片懒加载示例</h1>
        <div v-for="(item, index) in imageList" :key="index" class="box-item">
            <Skeleton :loading="true" animated v-if="!item.loaded" class="box-item-skeleton">
                <template #template>
                    <SkeletonItem width="100%" height="400px" />
                </template>
            </Skeleton>
            <img
                :src="item.loaded ? item.src : ''"
                :alt="item.alt"
                :data-imgindex="index"
                :data-imgurl="item.src"
                class="lazyLoad box-item-img"
                style="width: 100%; height: 400px"
                @load="imgLoadSuccess(index)"
                @error="imgLoadError(index)"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Skeleton, SkeletonItem } from 'view-ui-plus';

// 模拟图片数据
const imageList = ref([
    { src: 'https://picsum.photos/800/400?random=1', loaded: false },
    { src: 'https://picsum.photos/800/400?random=2', loaded: false },
    { src: 'https://picsum.photos/800/400?random=3', loaded: false },
    { src: 'https://picsum.photos/800/400?random=4', loaded: false },
    { src: 'https://picsum.photos/800/400?random=5', loaded: false },
    { src: 'https://picsum.photos/800/400?random=6', loaded: false },
    { src: 'https://picsum.photos/800/400?random=7', loaded: false },
    { src: 'https://picsum.photos/800/400?random=8', loaded: false },
    { src: 'https://picsum.photos/800/400?random=9', loaded: false },
    { src: 'https://picsum.photos/800/400?random=10', loaded: false }
]);

let observer = null;

// 初始化图片观察者
const initImgObserver = () => {
    const imageDomList = document.querySelectorAll('img.lazyLoad');
    const lazyLoadFn = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                console.log(11, img.dataset);
                imageList.value[Number(img.dataset.imgindex)].loaded = true;
                img.src = img.dataset.imgurl; // 自定义属性
                img.classList.remove('lazyLoad');
                observer.unobserve(img);
            }
        });
    };
    const observer = new IntersectionObserver(lazyLoadFn, {
        root: null, // 指定监听的根元素（即视口）, 默认为浏览器视口
        rootMargin: '0px', // 扩展或收缩根元素的边界框。如提前200px加载
        threshold: 0.2 // 指定目标元素与根元素的交叉比例达到多少时触发
    });
    console.log(22, imageDomList);
    imageDomList.forEach((img) => {
        observer.observe(img);
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
    if (observer) {
        observer.disconnect();
        observer = null;
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
        overflow: hidden;
        background: #f0f0f0;
        margin-top: 20px;
        position: relative;
        .box-item-skeleton {
            height: 50px;
        }
        .box-item-img {
            position: absolute;
            width: 600px;
            height: 400px;
            z-index: 2;
        }
    }
}
</style>
