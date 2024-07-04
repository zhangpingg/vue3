const auditRecordRoutes = [
    {
        path: '/auditRecord/index',
        name: 'auditRecord-index',
        meta: {
            title: '审核记录',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/auditRecord/index.vue'),
    },
    {
        path: '/auditRecord/uploadData',
        name: 'auditRecord-uploadData',
        meta: {
            parentName: 'auditRecord-index',
            title: '上传资料',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/auditRecord/uploadData'),
    },
];

export { auditRecordRoutes };
