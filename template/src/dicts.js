// 字典集合

/**
 * @description 默认获取label值
 * @param {Array} options 字典数组
 * @param {Number} value value值，（如果是多个用','隔开，如:value:'1,2'）
 * @param {String} label 取某个key的值，默认label
 * @returns {String} 返回value对应的文本汉字值
 */
export const getLabelByValue = (options, value, label = 'label') => {
    if ([null, undefined, ''].includes(value)) {
        return '-';
    }
    let _list = options.filter((item) => String(value).split(',').includes(String(item.value)));
    let _label = _list.map((item) => item[label]).join('、');
    return _label;
};

// 【上传要求】
export const uploadRequirementDict = [
    { value: 0, label: '非必传' },
    { value: 1, label: '必传' },
];

// 【资料名称】
export const dataTypeDict = [
    { value: 1, label: '营业执照' },
    { value: 2, label: '工艺流程图' },
    { value: 3, label: '中策SQS审核表' },
    { value: 4, label: 'ISO9001认证' },
    { value: 5, label: 'ISO9000认证' },
    { value: 6, label: 'ISO19011认证' },
    { value: 7, label: 'CP' },
    { value: 8, label: 'FMEA' },
];

// 【原材料ABC分类】
export const productLevelDict = [
    { value: 1, label: 'A类', shortLabel: 'A' },
    { value: 2, label: 'B类', shortLabel: 'B' },
    { value: 3, label: 'C类', shortLabel: 'C' },
    { value: 4, label: '辅助', shortLabel: '辅助' },
    { value: 5, label: '包装', shortLabel: '包装' },
    { value: 6, label: '外购件', shortLabel: '外购件' },
];
