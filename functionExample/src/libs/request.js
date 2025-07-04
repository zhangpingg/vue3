// @ts-nocheck
import axios from 'axios';
import Cookies from 'js-cookie';
//import router from '@/router';
import { throwLogError, throwNoticeError } from './util.error';

// 创建一个 axios 实例
const service = axios.create({
    baseURL: '/api',
    timeout: 60000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 需要测试裁剪图片上传的接口，这里打开即可
        //config.headers['Authorization'] = Cookies.get('token');
        //config.headers['supplier-domain'] = 'dt';
        return config;
    },
    (error) => {
        // 发送失败
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // axiosData 是 axios 返回数据中的 data
        const axiosData = response.data;
        // 这个状态码是和后端约定的
        const { code } = axiosData;
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口
            return axiosData;
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 200:
                    if (axiosData.success) {
                        return axiosData.data;
                    } else {
                        // [ 示例 ] code === 0 代表没有错误
                        return axiosData;
                    }
                case 100009:
                case 520001:
                case 520005:
                case 520006:
                case 520009:
                case 100006:
                    Cookies.set('token', '');
                    //router.push({ path: '/login' });
                    throwLogError('身份认证失败');
                    break;
                case 520000:
                    throwLogError('无访问权限');
                    break;
                default:
                    throwLogError(axiosData.message);
                    break;
            }
        }
    },
    (error) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误';
                    break;
                case 401:
                    error.message = '未授权，请登录';
                    break;
                case 403:
                    error.message = '拒绝访问';
                    break;
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    error.message = '请求超时';
                    break;
                case 500:
                    error.message = error.response.data.message;
                    break;
                case 501:
                    error.message = '服务未实现';
                    break;
                case 502:
                    error.message = '网关错误';
                    break;
                case 503:
                    error.message = '服务不可用';
                    break;
                case 504:
                    error.message = '网关超时';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持';
                    break;
                default:
                    break;
            }
        }
        throwNoticeError(error);
        return Promise.reject(error);
    }
);

export default service;
