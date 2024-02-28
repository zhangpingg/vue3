import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import 'view-ui-plus/dist/styles/viewuiplus.css';
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

const app = createApp(App);
app.directive('reserve', reserveDirective);
app.directive('copy', copyDirective);
app.directive('real-img', realImgDirective);
app.directive('lazy-img', lazyImgDirective);
app.directive('permission', permissionDirective);
app.directive('loading', loadingDirective);
app.directive('clickoutside', clickoutsideDirective);

app.use(router).use(ConfirmPlugin).mount('#app');

