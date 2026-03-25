/*
 * Filename: d:\zhangxiaoshuai\private\vue3\functionExample\src\libs\util.win.js
 * Path: d:\zhangxiaoshuai\private\vue3\functionExample
 * Created Date: Wednesday, March 25th 2026, 9:38:04 am
 * Author: zhangping
 *
 * Copyright (c) 2026 Your Company
 */
// 以下是获取前缀，并在控制台打印相关信息
const currentHref = window.location.href;
const testHref = '10.1.13.23'; // 测试

let titlePrefix = ''; // 网页标题前缀

if (process.env.NODE_ENV === 'development') {
    titlePrefix = '【开发】';
} else if (currentHref.indexOf(testHref) !== -1) {
    titlePrefix = '【测试】';
}
console.log(
    `%c Environment %c ${titlePrefix || '【生产】'}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e'
);

/**
 * @description 修改网页标题
 * @param {Object} title-标题，count-消息数量
 */
const modifyTitle = ({ title, count }) => {
    let fullTitle = title ? `${title}-中策配套CRM` : '中策配套CRM';
    if (count) {
        fullTitle = `(${count}条消息)${fullTitle}`;
    }
    window.document.title = titlePrefix + fullTitle;
};

// 获取-当前环境
const getEnvironment = () => {
    if (process.env.NODE_ENV === 'development') {
        return 'dev';
    }
    if (currentHref.indexOf(testHref) !== -1) {
        return 'test';
    }
    return 'product';
};

export { titlePrefix, modifyTitle, getEnvironment };
