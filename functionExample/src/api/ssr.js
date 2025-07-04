import request from '@/libs/request';

// 获取ssr的html页面
export function apiGetSSRhtml(data) {
    return request({
        // 本地服务器：node server/ssr.js
        url: 'http://localhost:9001/getData',
        method: 'get',
        data
    });
}
