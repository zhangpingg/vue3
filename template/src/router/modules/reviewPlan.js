const reviewPlanRoutes = [
    {
        path: '/reviewPlan/yearlyPlan/index',
        name: 'reviewPlan-yearlyPlan-index',
        meta: {
            title: '年度计划',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/reviewPlan/yearlyPlan/index.vue'),
    },
    {
        path: '/reviewPlan/monthlyPlan/index',
        name: 'reviewPlan-monthlyPlan-index',
        meta: {
            title: '月度计划',
            auth: true,
            cache: true,
        },
        component: () => import('@/pages/reviewPlan/monthlyPlan/index.vue'),
    },
];

export { reviewPlanRoutes };
