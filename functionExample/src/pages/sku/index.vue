<template>
    <div class="box pl-20 pt-20" style="background: #fff">
        <!-- 规格选择区域 -->
        <div>
            <div v-for="(bigItem, bigIndex) in bigList" :key="bigIndex" class="mb-10">
                <h3>{{ bigItem.name }}</h3>
                <div>
                    <button
                        v-for="smallItem in bigItem.smallList"
                        :key="smallItem.id"
                        :class="[
                            'box-option',
                            { selectedOption: selectedOptions[bigItem.name] === smallItem.id },
                            { disabledOption: isOptionDisabled(bigItem.name, smallItem.id) }
                        ]"
                        @click="selectOption(bigItem.name, smallItem.id)"
                        :disabled="isOptionDisabled(bigItem.name, smallItem.id)"
                        class="mr-10"
                    >
                        {{ smallItem.value }}- {{ smallItem.id }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 当前选中信息 -->
        <div class="mt-40" v-if="Object.keys(selectedOptions).length > 0">
            <h3>已选规格:</h3>
            <div class="mt-10">
                <span v-for="(optionId, groupName) in selectedOptions" :key="groupName" class="box-spec mr-20">
                    {{ groupName }}: {{ getOptionLabel(groupName, optionId) }}
                    <button class="box-removeSpec" @click="clearSelection(groupName)">×</button>
                </span>
                <button class="box-clearAll" @click="clearAllSelections">清空所有</button>
            </div>
        </div>

        <Button @click="save" class="mt-20">保存</Button>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 商品规格数据
const bigList = ref([
    {
        name: '颜色',
        smallList: [
            { id: 1, value: '红色' },
            { id: 2, value: '黄色' },
            { id: 3, value: '蓝色' }
        ]
    },
    {
        name: '尺寸',
        smallList: [
            { id: 10, value: 'M' },
            { id: 11, value: 'L' },
            { id: 12, value: 'XL' }
        ]
    },
    {
        name: '套餐',
        smallList: [
            { id: 20, value: '标准版' },
            { id: 21, value: '豪华版' },
            { id: 22, value: '旗舰版' }
        ]
    }
]);

// SKU数据
const skuList = ref([
    { id: 1, specs: { 颜色: 1, 尺寸: 10, 套餐: 20 } },
    { id: 2, specs: { 颜色: 1, 尺寸: 11, 套餐: 21 } },
    { id: 3, specs: { 颜色: 2, 尺寸: 11, 套餐: 22 } },
    { id: 4, specs: { 颜色: 3, 尺寸: 11, 套餐: 22 } },
    { id: 5, specs: { 颜色: 3, 尺寸: 12, 套餐: 21 } }
]);

// 选中的规格
const selectedOptions = reactive({});

// 判断选项是否禁用
const isOptionDisabled = (groupName, optionId) => {
    // 如果已经选中，则不禁用
    if (selectedOptions[groupName] === optionId) {
        return false;
    }
    // 创建临时选中状态（包含当前要检查的选项）
    const tempSelected = { ...selectedOptions, [groupName]: optionId };
    // 检查是否存在匹配的SKU
    return !skuList.value.some((sku) => {
        return Object.entries(tempSelected).every(([gName, optId]) => {
            return sku.specs[gName] === optId;
        });
    });
};

// 选择选项
const selectOption = (groupName, optionId) => {
    // 如果点击已选中的选项，则取消选择
    if (selectedOptions[groupName] === optionId) {
        delete selectedOptions[groupName];
    } else {
        // 选择新选项
        selectedOptions[groupName] = optionId;
    }
};

// 获取选项标签
const getOptionLabel = (groupName, optionId) => {
    const group = bigList.value.find((g) => g.name === groupName);
    const option = group?.smallList.find((o) => o.id === optionId);
    return option ? option.value : '';
};

// 清除某个规格的选择
const clearSelection = (groupName) => {
    delete selectedOptions[groupName];
};

// 清除所有选择
const clearAllSelections = () => {
    Object.keys(selectedOptions).forEach((key) => {
        delete selectedOptions[key];
    });
};

// 保存
const save = () => {
    console.log(selectedOptions);
};
</script>

<style lang="less" scoped>
.box {
    .box-option {
        padding: 5px 10px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 1rem;
        border: 1px solid #ddd;
        background-color: #fff;
        min-width: 80px;
        &:hover:not(.disabledOption) {
            border-color: #ff4400;
            color: #ff4400;
            transform: translateY(-1px);
        }
        &.selectedOption {
            background-color: #fff0e8;
            color: #ff4400;
            border-color: #ff4400;
            position: relative;
        }
        &.selectedOption::after {
            content: '✓';
            position: absolute;
            right: 4px;
            bottom: 0;
            font-size: 12px;
            font-weight: bold;
        }
        &.disabledOption {
            background-color: #f5f5f5;
            color: #ccc;
            cursor: not-allowed;
            border-color: #eee;
            opacity: 0.6;
        }
        &.disabledOption:hover {
            transform: none;
        }
    }
    .box-spec {
        background-color: #fff0e8;
        color: #ff4400;
        padding: 0.4rem 0.8rem;
    }
    .box-removeSpec {
        border: none;
        color: #ff4400;
        font-weight: bold;
        margin-left: 0.5rem;
        cursor: pointer;
        width: 1.2rem;
        height: 1.2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    .box-clearAll {
        background: #ff4400;
        color: white;
        border: none;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.2s;
    }
}
</style>
