import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/directive',
    },
    {
        path: `/directive`,
        name: 'directive',
        meta: {
            title: '指令页',
        },
        component: () => import('@/pages/directiveDemo/index.vue'),
    },
    {
        path: `/routerHome`,
        name: 'routerHome',
        meta: {
            title: '路由-首页',
        },
        component: () => import('@/pages/routerDemo/home.vue'),
    },
    {
        path: `/routerAbout`,
        name: 'routerAbout',
        meta: {
            title: '路由-关于',
        },
        component: () => import('@/pages/routerDemo/about.vue'),
    },
    {
        path: `/plugin`,
        name: 'plugin',
        meta: {
            title: '自定义全局插件',
        },
        component: () => import('@/pages/pluginDemo/index.vue'),
    },
    {
        path: `/scroll`,
        name: 'scroll',
        meta: {
            title: '滚动',
        },
        component: () => import('@/pages/scrollDemo/horizontalScroll.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
