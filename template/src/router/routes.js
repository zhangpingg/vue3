import { auditRecordRoutes } from './modules/auditRecord';

// 在主框架之外显示
const frameOut = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            auth: false,
        },
        component: () => import('@/pages/account/login'),
    },
];

// 在主框架内显示
const frameIn = [
    {
        path: '/',
        redirect: {
            name: 'home',
        },
    },
    {
        path: '/',
        component: () => import('@/components/basicLayouts'),
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    auth: true,
                    title: '首页',
                    cache: true,
                },
                component: () => import('@/pages/home'),
            },
            {
                path: '/previewFile',
                name: 'previewFile',
                meta: {
                    auth: true,
                    title: '预览文件',
                    cache: true,
                },
                component: () => import('@/pages/commonPage/previewFile'),
            },
            ...auditRecordRoutes,
        ],
    },
];

// 错误页面
const errorPage = [
    {
        path: '/403',
        name: '403',
        meta: {
            title: '403',
        },
        component: () => import('@/pages/error/403'),
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        meta: {
            title: '404',
        },
        component: () => import('@/pages/error/404'),
    },
    {
        path: '/500',
        name: '500',
        meta: {
            title: '500',
        },
        component: () => import('@/pages/error/500'),
    },
];

export { frameIn };
export default [...frameOut, ...frameIn, ...errorPage];
