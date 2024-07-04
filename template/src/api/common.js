import request from '@/libs/request';

// 转换文档类型
export function apiConvertFileType(data) {
    return request({
        url: '/common/file/convert2003To2007',
        method: 'get',
        params: data,
    });
}
