// 手机号 1开头，第二位3-9，后面9位数字
const MOBILE_REG = /^1([3-9])\d{9}$/;
// 邮箱
const EMAIL_REG =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export { MOBILE_REG, EMAIL_REG };
