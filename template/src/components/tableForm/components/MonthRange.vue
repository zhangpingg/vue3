<!--
 * @Author: zhangping
 * @Date: 2024-06-06 17:41:05
 * @Description: 月份区间（不带年份）
-->

<template>
    <div>
        <el-date-picker
            v-model="monthList"
            type="monthrange"
            clearable
            :teleported="false"
            format="MM"
            valueFormat="MM"
            startPlaceholder="开始月份"
            endPlaceholder="结束月份"
            popper-class="mrPicker"
            @change="changeMonth"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    value: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['onChange']);

const monthList = ref([]);

// change-月份
const changeMonth = (val) => {
    emit('onChange', val);
};

watch(
    () => props.value,
    (newVal) => {
        monthList.value = newVal;
    },
    {
        immediate: true,
        deep: true,
    }
);
</script>

<style lang="less" scoped>
:deep(.mrPicker) {
    width: 321px;
    .el-picker-panel,
    .el-picker-panel__body {
        width: 321px;
        min-width: 321px;
    }
    .is-right {
        display: none;
    }
    .el-date-range-picker__content.is-left {
        border-right: 0px;
    }
    .el-date-range-picker__header {
        display: none;
    }
}
</style>
