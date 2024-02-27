// 点击其他地方,本弹框消失

const clickoutsideDirective = {
    beforeMount(el, binding) {
        const clickoutFn = (e) => {
            if (!el.contains(e.target)) {
                binding.value();
            }
        };
        el.__clickEvent__ = clickoutFn;
        document.addEventListener("click", clickoutFn, false);
    },
    unmounted(el) {
        document.removeEventListener("click", el.__clickEvent__);
    },
};

export { clickoutsideDirective };
