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
    },
    {
        path: `/generateQRcode`,
        name: 'generateQRcode',
        meta: {
            title: '(各种数据)生成二维码',
            cache: false
        },
        component: () => import('@/pages/generateQRcode/index.vue')
    },
    {
        path: `/gaodeMap`,
        name: 'gaodeMap',
        meta: {
            title: '高德地图',
            cache: false
        },
        component: () => import('@/pages/gaodeMap/index.vue')
    },
    {
        path: `/highlightText`,
        name: 'highlightText',
        meta: {
            title: '高亮文本',
            cache: false
        },
        component: () => import('@/pages/highlightText/index.vue')
    },
    {
        path: `/imageDoesNotDeformOrStretch`,
        name: 'imageDoesNotDeformOrStretch',
        meta: {
            title: '图片不变形拉伸',
            cache: false
        },
        component: () => import('@/pages/imageDoesNotDeformOrStretch/index.vue')
    },
    {
        path: `/printDom`,
        name: 'printDom',
        meta: {
            title: '打印DOM',
            cache: false
        },
        component: () => import('@/pages/printDom/index.vue')
    },
    {
        path: `/imgLazyLoad`,
        name: 'imgLazyLoad',
        meta: {
            title: '图片懒加载',
            cache: false
        },
        component: () => import('@/pages/imgLazyLoad/index.vue')
    },
    {
        path: `/createDownloadPDF`,
        name: 'createDownloadPDF',
        meta: {
            title: '生成并下载PDF',
            cache: false
        },
        component: () => import('@/pages/createDownloadPDF/index.vue')
    }
];

const router = createRouter({
    history: createWebHistory('/vue3'), // 设置基础路径为 '/vue3'
    routes
});

export default router;

