import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: '',
        redirect: '/home'
    },
    {
        path: `/home`,
        name: 'home',
        meta: {
            title: '首页',
            cache: true // 是否 keep-alive 缓存
        },
        component: () => import('@/pages/home/index.vue')
    },
    {
        path: `/test`,
        name: 'test',
        meta: {
            title: '测试',
            cache: true
        },
        component: () => import('@/pages/test/index.vue')
    },
    {
        path: `/directive`,
        name: 'directive',
        meta: {
            title: '指令页',
            cache: true
        },
        component: () => import('@/pages/directiveDemo/index.vue')
    },
    {
        path: `/routerHome`,
        name: 'routerHome',
        meta: {
            title: '路由-首页',
            cache: true
        },
        component: () => import('@/pages/routerDemo/home.vue')
    },
    {
        path: `/routerAbout`,
        name: 'routerAbout',
        meta: {
            title: '路由-关于',
            cache: true
        },
        component: () => import('@/pages/routerDemo/about.vue')
    },
    {
        path: `/plugin`,
        name: 'plugin',
        meta: {
            title: '自定义全局插件',
            cache: true
        },
        component: () => import('@/pages/pluginDemo/index.vue')
    },
    {
        path: `/scroll`,
        name: 'scroll',
        meta: {
            title: '滚动',
            cache: true
        },
        component: () => import('@/pages/scrollDemo/horizontalScroll.vue')
    },
    {
        path: `/previewPDF`,
        name: 'previewPDF',
        meta: {
            title: '预览PDF',
            cache: true
        },
        component: () => import('@/pages/previewPDF/index.vue')
    },
    {
        path: `/previewImg`,
        name: 'previewImg',
        meta: {
            title: '预览图片',
            cache: true
        },
        component: () => import('@/pages/previewImg/index.vue')
    },
    {
        path: `/previewPdfDocxExcel`,
        name: 'previewPdfDocxExcel',
        meta: {
            title: '预览pdf/docx/excel',
            cache: true
        },
        component: () => import('@/pages/previewPdfDocxExcel/index.vue')
    },
    {
        path: `/viewUiPlus`,
        name: 'viewUiPlus',
        meta: {
            title: 'UI框架',
            cache: false
        },
        component: () => import('@/pages/viewUiPlusDemo/index.vue')
    },
    {
        path: `/jsx`,
        name: 'jsx',
        meta: {
            title: 'jsx语法',
            cache: false
        },
        component: () => import('@/pages/jsxDemo/index.vue')
    },
    {
        path: `/vueuseCore`,
        name: 'vueuseCore',
        meta: {
            title: '@vueuse/core依赖插件',
            cache: false
        },
        component: () => import('@/pages/vueuseCore/index.vue')
    },
    {
        path: `/markDown`,
        name: 'markDown',
        meta: {
            title: 'markDown文件渲染',
            cache: false
        },
        component: () => import('@/pages/markDown/index.vue')
    },
    {
        path: `/cssVbind`,
        name: 'cssVbind',
        meta: {
            title: 'css v-bind',
            cache: false
        },
        component: () => import('@/pages/cssVbind/index.vue')
    },
    {
        path: `/zpElementPlus`,
        name: 'zpElementPlus',
        meta: {
            title: 'zp-element-plus',
            cache: false
        },
        component: () => import('@/pages/zpElementPlus/index.vue')
    },
    {
        path: `/i18n`,
        name: 'i18n',
        meta: {
            title: 'i18n',
            cache: false
        },
        component: () => import('@/pages/i18nDemo/index.vue')
    },
    {
        path: `/formInTable`,
        name: 'formInTable',
        meta: {
            title: 'table 中嵌入 form',
            cache: false
        },
        component: () => import('@/pages/formInTable/index.vue')
    },
    {
        path: `/vitePlugin`,
        name: 'vitePlugin',
        meta: {
            title: 'vite插件',
            cache: false
        },
        component: () => import('@/pages/vitePluginDemo/index.vue')
    },
    {
        path: `/cropImg`,
        name: 'cropImg',
        meta: {
            title: '裁剪图片',
            cache: false
        },
        component: () => import('@/pages/cropImg/index.vue')
    },
    {
        path: `/richText`,
        name: 'richText',
        meta: {
            title: '富文本编辑器',
            cache: false
        },
        component: () => import('@/pages/richText/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory('/vue3'), // 设置基础路径为 '/vue3'
    routes
});

export default router;
