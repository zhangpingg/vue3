import request from '@/libs/request';

// 裁剪图片-上传
export function apiUploadCropImg(data) {
    return request({
        url: '/upload/fileUpload',
        method: 'post',
        data
    });
}
