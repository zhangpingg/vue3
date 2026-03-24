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
    let _label = _list.map((item) => item[label]).join('、') || '-';
    return _label;
};

/**
 * @description 截取部分字典
 * @param {Array} options 字典数组
 * @param {Array} values [1, 2] 要截取的value值数组
 * @param {Boolean} isSortByValues 是否根据传入数组的顺序进行返回 true传入什么顺序返回什么 false根据字典数组顺序返回
 */
export const sliceDictByValues = (options, values, isSortByValues = false) => {
    if (isSortByValues) {
        const arr = [];
        values.map((item) => {
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === item) {
                    arr.push(options[i]);
                }
            }
        });
        return arr;
    }
    return options.filter((item) => values.includes(item.value));
};

/**
 * @description 将,拼接的values转化为特定符号拼接的labels
 * @param {Array} options 字典数组
 * @param {String} values ,拼接的字符串
 * @param {String} symbols 拼接的标点，默认为，
 * @param {String} label 取某个key的值，默认label
 */
export const getLabelsByValues = (options, values, symbols = '，', label = 'label') => {
    if (!values) return '';
    return values
        .split(',') // '1,2' -> ['1','2']
        .map((v) => getLabelByValue(options, Number(v), label)) // 转成label
        .join(symbols); // 用标点拼接
};

// 项目字典 ===============================================================================================
// 【交付点】
export const selectTypeDict = [
    { value: 1, label: '类型1' },
    { value: 2, label: '类型2' },
    { value: 3, label: '类型3' }
];
