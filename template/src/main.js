import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
/** UI库 **/
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import { PageHeader, FooterToolbar, Icon, Alert } from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
/** 文件样式 */
import '@vue-office/docx/lib/index.css';
import '@vue-office/excel/lib/index.css';
/** 第三方插件 **/
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
/** 本地 **/
import './styles/index.less';
import globalConst from './globalConst';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

const pinia = createPinia();
pinia.use(piniaPersist);

app.component('PageHeader', PageHeader);
app.component('FooterToolbar', FooterToolbar);
app.component('Icon', Icon);
app.component('Alert', Alert);

app.config.globalProperties.globalConst = globalConst;
app.use(router)
    .use(pinia)
    .use(ElementPlus, { locale: zhCn })
    .use(VueViewer, {
        defaultOptions: {
            // 自定义默认配置
            zIndex: 9999,
            inline: false, // 默认值：false。启用内联模式。
            button: true, // 右上角关闭按钮
            navbar: true, // 指定导航栏(图片组)的可见性。
            title: true, //指定标题的可见性和内容。
            toolbar: true, // 指定工具栏及其按钮的可见性和布局
            tooltip: true, //放大或缩小时显示带有图像比率（百分比）的工具提示。
            movable: false, // 启用以移动图像。
            zoomable: true, // 启用以缩放图像。
            rotatable: true, // 启用以旋转图像
            scalable: true, // 用以缩放图像。
            transition: false, // 为某些特殊元素启用CSS3转换。
            fullscreen: false, // 启用以在播放时请求全屏。
            keyboard: true, //启用键盘支持。
            url: 'src', //默认值：“src”。定义获取原始图像URL以供查看的位置。
        },
    })
    .mount('#app');
