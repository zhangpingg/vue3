import request from '@/libs/request';

// 审核记录列表
export function apiGetAuditRecord(data) {
    return request({
        url: '/audit/record/listRecord',
        method: 'get',
        params: data,
    });
}

// 上传资料列表
export function apiGetAuditRecordUploadDataList(data) {
    return request({
        url: '/audit/record/listUploadData',
        method: 'post',
        data,
    });
}

// 解析营业执照图片-返回营业期限
export function apiParseBusinessLicense(data) {
    return request({
        url: '/audit/record/parseBusinessLicense',
        method: 'post',
        data,
    });
}

// 上传资料
export function apiUploadData(data) {
    return request({
        url: '/audit/record/uploadData',
        method: 'post',
        data,
    });
}
