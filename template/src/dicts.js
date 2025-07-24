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

// 【原材料ABC分类】
export const productLevelDict = [
    { value: 1, label: 'A类', shortLabel: 'A' },
    { value: 2, label: 'B类', shortLabel: 'B' },
    { value: 3, label: 'C类', shortLabel: 'C' },
    { value: 4, label: '辅助', shortLabel: '辅助' },
    { value: 5, label: '包装', shortLabel: '包装' },
    { value: 6, label: '外购件', shortLabel: '外购件' },
];

// 【状态1】
export const statusOneDict = [
    { value: 1, label: '选项1', type: 'primary', color: 'red' },
    { value: 2, label: '选项2', type: 'success', color: 'blue' },
    { value: 3, label: '选项3', type: 'warning', color: 'yellow' },
    { value: 4, label: '选项4', type: 'danger', color: 'green' },
];
