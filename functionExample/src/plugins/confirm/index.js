import { createApp } from 'vue';
import ConfirmComponent from './ComfirmModal.vue';

const ConfirmPlugin = {}; // 插件对象
let $vm; // 实例化后的Promise，可在应用挂载完成后执行一些异步操作
let $container; // 插件容器
let optionsData = {}; // 插件参数

ConfirmPlugin.install = function (app) {
    const confirm = {
        show(options) {
            $vm = null;
            if ($container) {
                document.body.removeChild($container);
            }
            optionsData = { ...options, visible: true };
            const app = createApp(ConfirmComponent, optionsData); // 实例化并绑定组件
            $container = document.createElement('div');
            $vm = app.mount($container); // 将Vue应用挂载到DOM上
            document.body.appendChild($container); // 将DOM追加到body中
            return $vm;
        },
        hide() {
            optionsData.visible = false;
        },
    };
    app.config.globalProperties.$confirm = confirm; // 定义全局实例方法
};

export default ConfirmPlugin;
