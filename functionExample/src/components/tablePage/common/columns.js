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
/**
 * xx单号 【 xx单号 number 】
 */
const numberColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '单号',
        prop: params.options?.prop || prop || 'number',
        minWidth: 160,
        ...params.options,
    };
};

// 业务 =====================================================================
/**
 * 配套客户 【 配套客户 customerName 】
 */
const customerNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '配套客户',
        prop: params.options?.prop || prop || 'customerName',
        minWidth: 200,
        ...params.options,
    };
};

/**
 * 项目客户 【 项目客户 clientName 】
 */
const clientNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '项目客户',
        prop: params.options?.prop || prop || 'clientName',
        minWidth: 120,
        ...params.options,
    };
};

// 基地名称 【 基地名称 homeBaseName 】
const homeBaseNameColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '基地名称',
        prop: params.options?.prop || prop || 'homeBaseName',
        minWidth: 200,
        ...params.options,
    };
};

// ERP ID 【 ERP ID  erpId 】
const erpIdColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || 'ERP ID',
        prop: params.options?.prop || prop || 'erpId',
        minWidth: 200,
        ...params.options,
    };
};

// 主题 【 主题 title 】
const titleColumn = (labelOrOptions, prop) => {
    const params = judgeParams(labelOrOptions);
    return {
        label: params.label || '主题',
        prop: params.options?.prop || prop || 'title',
        minWidth: 200,
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
    numberColumn,
    customerNameColumn,
    clientNameColumn,
    homeBaseNameColumn,
    erpIdColumn,
    titleColumn,
};

