import { reactive } from 'vue';
import { supplierStatusDict, productLevelDict, evaluationLevelDict, supplyStatusDict } from '@/dicts';

// 业务==================================================================================================
// 【供应商类型】
const supplierStatusSelectItem = reactive({
    type: 'select',
    label: '供应商类型',
    prop: 'supplierStatus',
    options: supplierStatusDict,
});

// 【原材料ABC分类】
const productLevelSelectItem = reactive({
    type: 'select',
    label: '原材料ABC分类',
    prop: 'productLevel',
    options: productLevelDict,
});

// 【年度评价等级】
const evaluationLevelSelectItem = reactive({
    type: 'select',
    label: '年度评价等级',
    prop: 'evaluationLevel',
    options: evaluationLevelDict,
});

// 【供应状态】
const supplyStatusSelectItem = reactive({
    type: 'select',
    label: '供应状态',
    prop: 'supplyStatus',
    options: supplyStatusDict,
});

export { supplierStatusSelectItem, productLevelSelectItem, evaluationLevelSelectItem, supplyStatusSelectItem };
