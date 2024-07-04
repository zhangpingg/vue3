import dayjs from 'dayjs';

// 获取-当前年
const getCurrentYear = () => {
    let yearNow = new Date().getFullYear();
    return `${yearNow}`;
};
// 获取-上一个年月（如：2000-01）
const getPrevYearMoth = (date) => {
    return dayjs(date).subtract(1, 'month').format('YYYY-MM');
};
// 获取次月
const getNextYearMonth = (date) => {
    return dayjs(date).add(1, 'month').format('YYYY-MM');
};
// 年禁止选择（开始年份，结束年份）
const yearDisabled = (startYear, endYear) => {
    return (date) => {
        let _date = dayjs(date).format('YYYY');
        return _date < startYear || _date > endYear;
    };
};
// 月份禁止选择 prev上月/current当前月/next次月 之前可选
const monthDisabled = (type = 'current') => {
    let endTime = '';
    switch (type) {
        case 'prev':
            endTime = dayjs().subtract(1, 'month').format('YYYYMM');
            break;
        case 'current':
            endTime = dayjs().format('YYYYMM');
            break;
        case 'next':
            endTime = dayjs().add(1, 'month').format('YYYYMM');
            break;
    }
    return (date) => {
        const selectTime = dayjs(date).format('YYYYMM');
        return selectTime > endTime;
    };
};

// 模板==============================================================================================
// 【日期区间】
const dateRangeTmplItem = { type: 'daterange', label: '日期选择区间', prop: ['startDate', 'endDate'] };

// 【日期时间区间】
const dateTimeRangeTmplItem = {
    type: 'datetimerange',
    label: '日期时间选择区间',
    prop: ['startDateTime', 'endDateTime'],
};

// 业务==================================================================================================
// 【年份】
const yearDateItem = { type: 'year', label: '年份', prop: 'year' };

// 【月份】
const monthDateItem = { type: 'month', label: '月份', prop: 'month', valueFormat: 'YYYY-MM' };

// 【月份区间】
const monthRangeDateItem = { type: 'monthrange', label: '月份', prop: ['startMonth', 'endMonth'] };

export {
    getCurrentYear,
    getPrevYearMoth,
    getNextYearMonth,
    yearDisabled,
    monthDisabled,
    dateRangeTmplItem,
    dateTimeRangeTmplItem,
    yearDateItem,
    monthDateItem,
    monthRangeDateItem,
};
