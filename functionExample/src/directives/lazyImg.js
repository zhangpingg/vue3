// 图片懒加载

const lazyImgDirective = {
    beforeMount(el, binding) {
        el.data_src = binding.value;
    },
    mounted(el) {
        const io = new IntersectionObserver((entries) => {
            const realSrc = el.data_src;
            // 通过isIntersecting判断是否在可视区域内
            if (entries[0].isIntersecting && realSrc) {
                el.src = realSrc;
            }
        });
        el.$io = io; // 挂载实例, 提供给后续的unmounted钩子操作
        io.observe(el); // 监听目标对象
    },
    updated(el, binding) {
        el.data_src = binding.value; // 实时更新最新的图片路径
    },
    unmounted(el) {
        el.$io.disconnect(); // 停止监听工作
    }
};

export { lazyImgDirective };
