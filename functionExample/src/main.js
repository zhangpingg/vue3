import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'view-ui-plus/dist/styles/viewuiplus.css';
import VueViewer from 'v-viewer'; // 预览图片插件（自己电脑报错）
import 'viewerjs/dist/viewer.css';
import '@vue-office/docx/lib/index.css'; // '@vue-office/docx' 样式
import '@vue-office/excel/lib/index.css'; // '@vue-office/excel' 样式
import {
    reserveDirective,
    copyDirective,
    realImgDirective,
    lazyImgDirective,
    permissionDirective,
    loadingDirective,
    clickoutsideDirective,
} from '@/directives'; // 自定义指令
import ConfirmPlugin from './plugins/confirm'; // 全局confirm插件
import ContextMenuPlugin from './plugins/contextMenu'; // 全局右键菜单插件

const app = createApp(App);

app.directive('reserve', reserveDirective);
app.directive('copy', copyDirective);
app.directive('real-img', realImgDirective);
app.directive('lazy-img', lazyImgDirective);
app.directive('permission', permissionDirective);
app.directive('loading', loadingDirective);
app.directive('clickoutside', clickoutsideDirective);

app.use(VueViewer)

app.use(router).use(ElementPlus, {locale: zhCn,}).use(ConfirmPlugin).use(ContextMenuPlugin).mount('#app');

