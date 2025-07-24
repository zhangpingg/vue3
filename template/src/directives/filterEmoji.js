// input-过滤emoji表情包

const addListener = (el, vnode) => {
    el.addEventListener('input', (event) => {
        const newVal = event.target.value.replace(/[\p{Emoji_Presentation}]/gu, '');
        vnode.ctx.emit('update:modelValue', newVal);
    });
};

const filterEmoji = {
    mounted(el, binding, vnode) {
        addListener(el, vnode);
    },
    updated(el, binding, vnode) {
        addListener(el, vnode);
    },
};

export { filterEmoji };
