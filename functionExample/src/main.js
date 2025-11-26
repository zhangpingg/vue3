import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
// UI 框架
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'; // element-plus图标
import 'element-plus/dist/index.css';
import viewUiPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
// 预览图片插件
import VueViewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
// docs、excel插件样式
import '@vue-office/docx/lib/index.css'; // '@vue-office/docx' 样式
import '@vue-office/excel/lib/index.css'; // '@vue-office/excel' 样式
/** 自定义指令 */
import {
    reserveDirective,
    filterEmojiDirective,
    copyDirective,
    realImgDirective,
    lazyImgDirective,
    permissionDirective,
    loadingDirective,
    clickoutsideDirective
} from '@/directives';
import ConfirmPlugin from './plugins/confirm'; // 全局confirm插件
import ContextMenuPlugin from './plugins/contextMenu'; // 全局右键菜单插件
// zp-element-plus 组件库
import 'zp-element-plus/lib/style.css';
// 国际化
import { createI18n } from 'vue-i18n';
import { messages } from '@/libs/i18n';
// 裁剪图片（组件内引入的方式会失败）
import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css';
// 本地样式
import './styles/index.less';
// 上传文件夹
import uploader from 'vue-simple-uploader';
import 'vue-simple-uploader/dist/style.css';

const app = createApp(App);

app.directive('reserve', reserveDirective);
app.directive('filter-emoji', filterEmojiDirective);
app.directive('copy', copyDirective);
app.directive('real-img', realImgDirective);
app.directive('lazy-img', lazyImgDirective);
app.directive('permission', permissionDirective);
app.directive('loading', loadingDirective);
app.directive('clickoutside', clickoutsideDirective);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

// 创建 i18n 实例
const i18n = createI18n({
    locale: 'zh', // 设置地区
    messages // 设置地区信息
});

app.use(router)
    .use(ElementPlus, { locale: zhCn })
    .use(viewUiPlus)
    .use(ConfirmPlugin)
    .use(ContextMenuPlugin)
    .use(i18n)
    .use(uploader)
    .use(VueViewer, {
        // 自定义默认配置
        defaultOptions: {
            //movable: false // 图片是否可以移动, 默认值:true
        }
    })
    .use(VueCropper)
    .mount('#app');
