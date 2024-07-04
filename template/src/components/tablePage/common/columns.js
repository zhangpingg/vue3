const judgeParams = (labelOrOptions) => {
    const params = {
        label: '',
        options: {},
    };
    let toString = Object.prototype.toString;
    if (['[object String]', '[object Undefined]', '[object Null]'].includes(toString.call(labelOrOptions))) {
        params.label = labelOrOptions;
    } else if (['[object Object]'].includes(toString.call(labelOrOptions))) {
        params.options = { ...labelOrOptions };
    } else {
        console.error('参数类型错误', toString.call(labelOrOptions));
    }
    return params;
};

// 模板 =====================================================================
/**
 * 日期 YYYY-MM-DD 【 日期 date 】
 */
const dateColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '日期',
        prop: params.options?.prop || prop || 'date',
        minWidth: 120,
        ...params.options,
    };
};
/**
 * 日期：时分秒 YYYY-MM-DD HH:mm:ss 【 创建时间 createDate 】
 */
const dateLongColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '创建时间',
        prop: params.options?.prop || prop || 'createDate',
        minWidth: 160,
        ...params.options,
    };
};
/**
 * 姓名 【 姓名 name 】
 */
const personNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '姓名',
        prop: params.options?.prop || prop || 'name',
        minWidth: 100,
        ...params.options,
    };
};
/**
 * 手机号 【 手机号 phone 】
 */
const personPhoneColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '手机号',
        prop: params.options?.prop || prop || 'phone',
        minWidth: 120,
        ...params.options,
    };
};
/**
 * 备注/长描述 【 备注 remarks 】
 */
const remarksColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '备注',
        prop: params.options?.prop || prop || 'remarks',
        minWidth: 220,
        ...params.options,
    };
};
/**
 * 编号/序号 【 编号 num 】
 */
const numColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '编号',
        prop: params.options?.prop || prop || 'num',
        minWidth: 80,
        ...params.options,
    };
};

// 业务 =====================================================================
/**
 * 供应商名称 【 供应商名称 supplierName 】
 */
const supplierNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '供应商名称',
        prop: params.options?.prop || prop || 'supplierName',
        minWidth: 200,
        ...params.options,
    };
};
/**
 * 供应商类型 【 供应商类型 _supplierStatus 】
 */
const supplierStatusColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '供应商类型',
        prop: params.options?.prop || prop || '_supplierStatus',
        minWidth: 100,
        ...params.options,
    };
};
/**
 * 所在部门 【 所在部门 deptName 】
 */
const deptNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '所在部门',
        prop: params.options?.prop || prop || 'deptName',
        minWidth: 140,
        ...params.options,
    };
};
/**
 * 主要产品 【 主要产品 productName 】
 */
const productNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '主要产品',
        prop: params.options?.prop || prop || 'productName',
        minWidth: 180,
        ...params.options,
    };
};
/**
 * 类型 【 类型 _productLevel 】
 */
const productLevelColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '类型',
        prop: params.options?.prop || prop || '_productLevel',
        minWidth: 100,
        ...params.options,
    };
};
/**
 * 所在省份 【 所在省份 provinceName 】
 */
const provinceNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '所在省份',
        prop: params.options?.prop || prop || 'provinceName',
        minWidth: 100,
        ...params.options,
    };
};
/**
 * 地址 【 地址 address 】
 */
const addressColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '地址',
        prop: params.options?.prop || prop || 'address',
        minWidth: 180,
        ...params.options,
    };
};
/**
 * 批次 【 批次 order 】
 */
const orderColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '批次',
        prop: params.options?.prop || prop || 'order',
        minWidth: 80,
        ...params.options,
    };
};

export {
    dateColumn,
    dateLongColumn,
    personNameColumn,
    personPhoneColumn,
    remarksColumn,
    numColumn,
    supplierNameColumn,
    supplierStatusColumn,
    deptNameColumn,
    productNameColumn,
    productLevelColumn,
    provinceNameColumn,
    addressColumn,
    orderColumn,
};

