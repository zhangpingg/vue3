import MenuContext from './menu.vue';
import { h, render } from 'vue';

let curInstance = null; // 菜单实例
let seed = 1;
let container = null;

const contextMenu = (e, data) => {
    if (curInstance) {
        curInstance.destroy();
    }
    curInstance = null;
    let id = seed++;
    const container = document.createElement('div'); // 创建一个临时的div，用于挂载我们的菜单
    const body = document.body; // 获取body标签，用于挂载整个菜单
    // 传给menu组件的props
    const props = {
        data,
        onClose: () => {
            console.log(21);
            if (curInstance) {
                curInstance.destroy();
            }
        }
    };
    const vnode = h(MenuContext, props); // 创建虚拟节点
    render(vnode, container); // 编程式地创建组件虚拟 DOM 树（vnode:虚拟节点，container:渲染的容器）
    body?.appendChild?.(container); // 把菜单真正渲染到页面，才能拿到它的宽度和高度
    const curMenu = vnode.el; // el就是菜单节点
    const { offsetWidth, offsetHeight } = curMenu; // 获取curMenu的高度和宽度，用于临界的计算
    const { clientWidth } = body; // 获取body的可视区域的宽度
    const { clientX, clientY } = e; // 取出右键点击时的坐标，clientX是距离左侧的位置，clientY是距离顶部的位置

    // 当前可视区域的宽度 - 当前鼠标距离浏览器左边的距离
    // 如果 大于菜单的宽度，说明正常设置菜单距离左边界的距离,即设置style.left
    // 否则菜单需要在鼠标左侧展示，即需要设置style.right组件距离可视区域右侧的距离
    const leftOrRight = clientWidth - clientX > offsetWidth ? 'left' : 'right';

    // 当前浏览器的高度(不包含滚动条) - 当前鼠标距离浏览器上边的距离
    // 如果 大于菜单的高度，说明可以正常设置菜单距离上边界的距离,即设置style.top
    // 否则需要设置菜单距离底部边界的位置，即style.bottom
    const topOrBottom = window.innerHeight - clientY > offsetHeight ? 'top' : 'bottom';
    const offsetLeft = Math.abs(clientWidth - clientX);

    // 设置left或者right的style
    curMenu.style[leftOrRight] = leftOrRight === 'left' ? `${clientX + 20}px` : `${offsetLeft}px`;
    // 设置top或者bottom的style
    curMenu.style[topOrBottom] = topOrBottom === 'bottom' ? '2px' : `${clientY}px`;

    const instance = {
        id,
        destroy: () => {
            curInstance = null;
            render(null, container);
        }
    };
    curInstance = instance;
    return instance;
};
//export default contextMenu;

const ContextMenuPlugin = {};

ContextMenuPlugin.install = function (app) {
    const contextMenu = {
        show({ e, data }) {
            if (curInstance) {
                curInstance.destroy();
            }
            curInstance = null;
            if (container) {
                document.body.removeChild(container);
            }
            let id = seed++;
            container = document.createElement('div'); // 创建一个临时的div，用于挂载我们的菜单
            const body = document.body; // 获取body标签，用于挂载整个菜单
            // 传给menu组件的props
            const props = {
                data: { ...data, visible: true },
                onClose: () => {
                    if (curInstance) {
                        curInstance.destroy();
                    }
                }
            };
            const vnode = h(MenuContext, props); // 创建虚拟节点
            render(vnode, container); // 编程式地创建组件虚拟 DOM 树（vnode:虚拟节点，container:渲染的容器）
            body?.appendChild?.(container); // 把菜单真正渲染到页面，才能拿到它的宽度和高度
            const curMenu = vnode.el; // el就是菜单节点
            const { offsetWidth, offsetHeight } = curMenu; // 获取curMenu的高度和宽度，用于临界的计算
            const { clientWidth } = body; // 获取body的可视区域的宽度
            const { clientX, clientY } = e; // 取出右键点击时的坐标，clientX是距离左侧的位置，clientY是距离顶部的位置

            // 当前可视区域的宽度 - 当前鼠标距离浏览器左边的距离
            // 如果 大于菜单的宽度，说明正常设置菜单距离左边界的距离,即设置style.left
            // 否则菜单需要在鼠标左侧展示，即需要设置style.right组件距离可视区域右侧的距离
            const leftOrRight = clientWidth - clientX > offsetWidth ? 'left' : 'right';

            // 当前浏览器的高度(不包含滚动条) - 当前鼠标距离浏览器上边的距离
            // 如果 大于菜单的高度，说明可以正常设置菜单距离上边界的距离,即设置style.top
            // 否则需要设置菜单距离底部边界的位置，即style.bottom
            const topOrBottom = window.innerHeight - clientY > offsetHeight ? 'top' : 'bottom';
            const offsetLeft = Math.abs(clientWidth - clientX);

            // 设置left或者right的style
            curMenu.style[leftOrRight] = leftOrRight === 'left' ? `${clientX + 20}px` : `${offsetLeft}px`;
            // 设置top或者bottom的style
            curMenu.style[topOrBottom] = topOrBottom === 'bottom' ? '2px' : `${clientY}px`;

            const instance = {
                id,
                destroy: () => {
                    curInstance = null;
                    render(null, container);
                }
            };
            curInstance = instance;
            return instance;
        },
        hide() {
            //optionsData.visible = false;
        }
    };
    app.config.globalProperties.$contextMenu = contextMenu;
};

export default ContextMenuPlugin;
