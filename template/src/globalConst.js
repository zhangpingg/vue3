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
    // 请求头
    requestHeader: {
        Authorization: Cookies.get('token'),
    },
    // 可查看的文件类型
    allowPreviewTypeList: ['jpg', 'png', 'jpeg', 'gif', 'txt', 'mp3', 'mp4', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
};
