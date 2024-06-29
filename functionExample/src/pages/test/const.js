export const filterEmoji = {
  mounted(el, binding, vnode) {
    filter({ target: { value: binding.value } }, binding, vnode)
    el.addEventListener('input', (e) => filter(e, binding, vnode));
  },
  destroyed(e) {
    e.removeEventListener('input', filter)
  },
  updated(el, binding, vnode) {
    console.log('updated', vnode.ctx.modelValue)
  },
}
function filter(e, binding, vnode) {
  const noEmojiStr = e.target.value.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '');
  e.target.value = noEmojiStr;
  vnode.ctx.emit('update:modelValue', noEmojiStr);
}