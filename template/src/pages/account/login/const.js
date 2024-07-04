import { MOBILE_REG } from '@/libs/util.regular';

// 验证手机号
const checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入手机号'));
    }
    if (!MOBILE_REG.test(value)) {
        return callback(new Error('请输入正确的手机号'));
    }
    callback();
};

export { checkPhone };
