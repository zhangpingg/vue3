<template>
    <template v-if="slotType === 'text'">
        <!--简单文本-->
        <el-text :type="!!Number(value) ? 'success' : 'danger'" v-if="isSimpleTextStatus">
            {{ value ? options[0] : options[1] }}
        </el-text>
        <!--复杂文本-->
        <el-text :type="getItemByValue(value).type" v-else>
            {{ getItemByValue(value).text }}
        </el-text>
    </template>
    <template v-if="slotType === 'badge'">
        <Badge :color="getItemByValue(value).color" :text="getItemByValue(value).text" />
    </template>
</template>

<script setup>
import { computed } from 'vue';
import { Badge } from 'view-ui-plus';

const props = defineProps({
    // 插槽模板类型
    slotType: {
        type: String,
        default: () => 'text', // text-文字 badge-小圆点+文字
    },
    // 值
    value: {
        type: [Boolean, String, Number],
        default: () => null,
    },
    // 选项-数组
    options: {
        type: Array,
        default: () => ['启用', '禁用'],
    },
});

// 是否为简单文本状态（即只有2种状态）
const isSimpleTextStatus = computed(() => {
    return isStringArray(props.options);
});

// 是否是字符串数组
const isStringArray = (arr) => {
    if (!Array.isArray(arr)) {
        return false;
    }
    return arr.every((item) => typeof item === 'string');
};
// 获取某项,通过value
const getItemByValue = (value) => {
    const _list = props.options.filter((item) => item.value === value);
    return _list.length > 0 && _list[0];
};
</script>
