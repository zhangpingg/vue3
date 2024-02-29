// copy文本

import { Message } from 'view-ui-plus';
import { copyText } from 'vue3-clipboard';

// 绑定点击事件
const addClick = (el) => {
    function copyFn() {
        if (!el.data_copy) {
            Message.info('没有内容');
            return;
        }
        copyText(el.data_copy, undefined, (error, event) => {
            if (error) {
                Message.error('复制失败');
            } else {
                Message.success('复制成功');
            }
        });
    }
    el.__copyEvent__ = copyFn;
    el.addEventListener('click', el.__copyEvent__, false);
};

const copyDirective = {
    mounted(el, binding) {
        el.data_copy = binding.value;
        addClick(el);
    },
    updated(el, binding) {
        el.data_copy = binding.value;
    },
    unmounted(el) {
        el.removeEventListener('click', el.__copyEvent__);
    },
};

export { copyDirective };
