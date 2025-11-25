<!--
* @Author: zhangping
* @Date: 2025-09-22 17:19:06
* @Description: 合并单元格
-->

<template>
    <div>
        <el-table :data="tableData" :span-method="spanMethod" border style="width: 100%; margin-top: 20px">
            <el-table-column prop="aa" label="aa列" />
            <el-table-column prop="bb" label="bb列" />
            <el-table-column prop="cc" label="正常列" />
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { transToMergeCellList } from '@/libs/util.tool';

const tableData = ref([
    { aa: 1, bb: 1, cc: '啦啦啦' },
    { aa: 1, bb: 1, cc: '啦啦啦' },
    { aa: 1, bb: 2, cc: '啦啦啦' },
    { aa: 2, bb: 3, cc: '啦啦啦' },
    { aa: 2, bb: 3, cc: '啦啦啦' },
    { aa: 100 }
]);

// 合并单元格
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0 && row.aa === 100) {
        return [1, 3];
    }
    switch (columnIndex) {
        case 0:
            return [row.aaRowSpan, 1];
        case 1:
            return [row.bbRowSpan, 1];
    }
};

onMounted(() => {
    tableData.value = transToMergeCellList(tableData.value, ['aa', 'bb']);
});
</script>
