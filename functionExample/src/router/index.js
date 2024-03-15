import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/home',
    },
    {
        path: `/home`,
        name: 'home',
        meta: {
            title: '首页',
            cache: true, // 是否 keep-alive 缓存
        },
        component: () => import('@/pages/home/index.vue'),
    },
    {
        path: `/directive`,
        name: 'directive',
        meta: {
            title: '指令页',
            cache: true,
        },
        component: () => import('@/pages/directiveDemo/index.vue'),
    },
    {
        path: `/routerHome`,
        name: 'routerHome',
        meta: {
            title: '路由-首页',
            cache: true,
        },
        component: () => import('@/pages/routerDemo/home.vue'),
    },
    {
        path: `/routerAbout`,
        name: 'routerAbout',
        meta: {
            title: '路由-关于',
            cache: true,
        },
        component: () => import('@/pages/routerDemo/about.vue'),
    },
    {
        path: `/plugin`,
        name: 'plugin',
        meta: {
            title: '自定义全局插件',
            cache: true,
        },
        component: () => import('@/pages/pluginDemo/index.vue'),
    },
    {
        path: `/scroll`,
        name: 'scroll',
        meta: {
            title: '滚动',
            cache: true,
        },
        component: () => import('@/pages/scrollDemo/horizontalScroll.vue'),
    },
    {
        path: `/previewPDF`,
        name: 'previewPDF',
        meta: {
            title: '预览PDF',
            cache: true,
        },
        component: () => import('@/pages/previewPDF/index.vue'),
    },
    {
        path: `/viewUiPlus`,
        name: 'viewUiPlus',
        meta: {
            title: 'UI框架',
            cache: false,
        },
        component: () => import('@/pages/viewUiPlusDemo/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
