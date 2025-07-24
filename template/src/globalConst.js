/** 全局常量 */
import Cookies from 'js-cookie';
export default {
    // 主要在新增编辑查看页面使用，根据mode展示title
    modeMap: {
        ADD: '新增',
        EDIT: '编辑',
        CHECK: '查看',
        MODIFY: '修改',
        FIRST: '首次设置',
    },
    // 表格分页配置
    paginationMap: {
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
    },
};
