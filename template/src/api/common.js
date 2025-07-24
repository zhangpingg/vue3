import request from '@/libs/request';

// 转换文档类型
export function apiConvertFileType(data) {
    return request({
        url: '/file/convert2003To2007/url',
        method: 'get',
        params: data,
    });
}
