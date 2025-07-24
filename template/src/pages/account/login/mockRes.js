const userInfoRes = {
    id: '1',
    createDate: '2024-07-03 15:58:37',
    modifyDate: '2024-07-04 16:58:44',
    name: '浙江久久办公用品有限公司',
    mobile: '15215956094',
    roleIds: ['1'],
    isEnabled: true,
    isDeleted: false,
    userName: '浙江久久办公用品有限公司',
    menuIds: ['1'],
    loginFailureCount: 0,
    // 左侧菜单tree
    authMenuList: [
        {
            id: '1',
            path: '/home',
            name: 'home',
            title: '首页',
            icon: 'House',
        },
        {
            id: '2',
            path: '/auditRecord/index',
            name: 'auditRecord-index',
            title: '审核记录',
            icon: 'Finished',
            auth: true,
        },
        {
            id: '3',
            name: 'reviewPlan',
            title: '评审计划',
            icon: 'Notebook',
            children: [
                {
                    id: '3-1',
                    path: '/reviewPlan/yearlyPlan/index',
                    name: 'reviewPlan-yearlyPlan-index',
                    title: '年度计划',
                },
                {
                    id: '3-2',
                    path: '/reviewPlan/monthlyPlan/index',
                    name: 'reviewPlan-monthlyPlan-index',
                    title: '月度计划',
                },
            ],
        },
    ],
};

export { userInfoRes };
