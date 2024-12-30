import request from '@/libs/request';

// 登录-系统
export function apiUploadCropImg(data) {
    return request({
        url: '/upload/fileUpload',
        method: 'post',
        data
    });
}
