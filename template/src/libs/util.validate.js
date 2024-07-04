/*
 * @Author: chengleilei
 * @Date: 2024-05-27 10:09:07
 * @Description: 表单自定义校验规则
 */
import { MOBILE_REG, EMAIL_REG } from '@/libs/util.regular';

const validateNormalFunc = (name, regular) => {
    return (rule, value, callback) => {
        if (rule.required && value === '') {
            callback(new Error(`请输入${name}`));
        } else if (value && !regular.test(value)) {
            callback(new Error(`${name}格式不正确`));
        } else {
            callback();
        }
    };
};

// 自定义校验手机号
const validatePhone = (name = '手机号') => {
    return validateNormalFunc(name, MOBILE_REG);
};

// 自定义校验邮箱
const validateEmail = (name = '邮箱') => {
    return validateNormalFunc(name, EMAIL_REG);
};

export { validatePhone, validateEmail };

