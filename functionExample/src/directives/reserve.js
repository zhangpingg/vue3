// input-倒序字符串

const reserveDirective = {
    created() {
        //console.log("在绑定元素的属性前，或者事件监听器应用前调用");
    },
    beforeMount() {
        //console.log("在元素被插入到DOM前调用");
    },
    mounted(el, binding) {
        //console.log("在绑定元素的父组件以及自己的所有子节点都挂载完毕后调用");
        el.innerText = binding.value ? binding.value.split('').reverse().join('') : '';
    },
    beforeUpdate(el, binding) {
        //console.log("绑定元素的父组件更新前调用");
        el.innerText = binding.value ? binding.value.split('').reverse().join('') : '';
    },
    updated() {
        //console.log("在绑定元素的父组件以及自己的所有子节点都更新完毕后调用");
    },
    beforeUnmount() {
        //console.log("绑定元素的父组件卸载前调用");
    },
    unmounted() {
        //console.log("绑定元素的父组件卸载后调用");
    }
};

export { reserveDirective };
