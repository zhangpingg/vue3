import { reactive } from 'vue';
import { productLevelDict } from '@/dicts';

// 业务==================================================================================================

// 【原材料ABC分类】
const productLevelSelectItem = reactive({
    type: 'select',
    label: '原材料ABC分类',
    prop: 'productLevel',
    options: productLevelDict,
});

export { productLevelSelectItem };
