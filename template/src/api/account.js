import request from '@/libs/request';

// 登录-系统
export function apiLoginAuthSystem(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        params: data,
    });
}

// 发送-验证码
export function apiSendSms(data) {
    return request({
        url: '/sms/sendSms',
        method: 'get',
        params: data,
    });
}

// 获取-当前登录者的用户信息
export function apiGetUserInfo(data) {
    return request({
        url: '/user/find_admin',
        method: 'get',
        params: data,
    });
}
