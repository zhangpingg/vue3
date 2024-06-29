// input-过滤emoji表情包

function filterEmoji(e, binding, vnode) {
    const noEmojiStr = e.target.value.replace(/[\p{Emoji_Presentation}]/gu, '');
    e.target.value = noEmojiStr;
    vnode.ctx.emit('update:modelValue', noEmojiStr);
}

const filterEmojiDirective = {
    mounted(el, binding, vnode) {
        filterEmoji({ target: { value: binding.value } }, binding, vnode)
        el.addEventListener('input', (e) => filterEmoji(e, binding, vnode));
    },
};

export { filterEmojiDirective };
