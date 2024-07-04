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
            id: '100010',
            path: '/home',
            name: 'home',
            title: '首页',
            icon: 'House',
        },
        {
            id: '1x',
            path: '/auditRecord/index',
            name: 'auditRecord-index',
            title: '审核记录',
            icon: 'Finished',
            auth: true,
        },
    ],
};

export { userInfoRes };
