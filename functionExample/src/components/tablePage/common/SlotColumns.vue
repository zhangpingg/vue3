<template>
    <template v-if="slotType === 'text'">
        <span :style="{ color: getItemByValue(value).color }">
            {{ getItemByValue(value).label || '-' }}
        </span>
    </template>
    <template v-if="slotType === 'badge'">
        <Badge :color="getItemByValue(value).color" :text="getItemByValue(value).label" v-if="value" />
        <span v-else>-</span>
    </template>
</template>

<script setup>
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
    // 字典数组
    options: {
        type: Array,
        default: () => [],
    },
});

// 获取某项,通过value
const getItemByValue = (value) => {
    const _list = props.options.filter((item) => item.value === value);
    return _list.length > 0 && _list[0];
};
</script>
