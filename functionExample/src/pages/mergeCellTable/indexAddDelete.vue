<!--
* @Author: zhangping
* @Date: 2025-09-22 17:19:06
* @Description: 动态合并单元格：未完成，还有缺陷，暂时用不了
-->

<template>
    <div>
        <button @click="addIssus">添加问题</button>
        <el-table :data="tableData" :span-method="spanMethod" border style="width: 100%; margin-top: 20px">
            <el-table-column prop="aa" label="aa列">
                <template #default="{ row, $index }">
                    <div v-if="row.aa == 'TITLE'">
                        问题序号{{ getCountOfTitlesBeforeIndex($index) + 1 }}
                        <button @click="addSubNumber($index)">新增子序</button>
                        <button @click="deleteIssue($index)">删除问题</button>
                    </div>
                    <div v-else>{{ row.aa }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="bb" label="bb列">
                <template #default="{ $index }">
                    {{ getCountOfTitlesBeforeIndex($index) }}.{{ getIndexWithinTitleGroup($index) }}
                </template>
            </el-table-column>
            <el-table-column prop="cc" label="正常列">
                <template #default="{ $index }">
                    <button @click="addDept($index)">新增部门</button>
                    <button @click="deleteSubNumber($index)">删除子序</button>
                </template>
            </el-table-column>
            <el-table-column prop="dd" label="dd列">
                <template #default="{ row, $index }"> {{ row.dd }}{{ $index }} </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { transToMergeCellList } from '@/libs/util.tool';

const tableData = ref([]);

// 合并单元格
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (row.aa === 'TITLE') {
        if (columnIndex === 0) {
            return [1, 4]; // 第一列合并4列
        } else {
            return [0, 0]; // 其他列隐藏
        }
    }
    switch (columnIndex) {
        case 0:
            return [row.aaRowSpan, 1];
        case 1:
            return [row.bbRowSpan, 1];
        case 2:
            return [row.ccRowSpan, 1];
    }
};
// 转换为合并单元格数据
const transToMergeCellData = (data) => {
    // 按 TITLE 分组处理数据
    const processedData = [];
    let currentGroup = [];
    data.forEach((item) => {
        if (item.aa === 'TITLE') {
            // 处理当前组的数据
            if (currentGroup.length > 0) {
                const mergedGroup = transToMergeCellList(currentGroup, ['aa', 'bb', 'cc']);
                processedData.push(...mergedGroup);
                currentGroup = [];
            }
            // 添加 TITLE 行
            processedData.push(item);
        } else {
            // 收集非 TITLE 行
            currentGroup.push(item);
        }
    });
    if (currentGroup.length > 0) {
        const mergedGroup = transToMergeCellList(currentGroup, ['aa', 'bb', 'cc']);
        processedData.push(...mergedGroup);
    }
    return processedData;
};
// 添加问题
const addIssus = () => {
    const newData = [{ aa: 'TITLE' }, { aa: 1, bb: 22, cc: '新数据' }];
    let _list = [...tableData.value, ...newData];
    tableData.value = transToMergeCellData(_list);
};
// 获取指定索引之前 TITLE 的数量
const getCountOfTitlesBeforeIndex = (currentIndex) => {
    let count = 0;
    for (let i = 0; i < currentIndex; i++) {
        if (tableData.value[i] && tableData.value[i].aa === 'TITLE') {
            count++;
        }
    }
    return count;
};
// 新增子序 - 修复序号计算逻辑
const addSubNumber = (titleIndex) => {
    const _list = [...tableData.value];

    // 找到当前 TITLE 模块的范围
    let start = titleIndex + 1;
    let end = _list.length;

    // 查找下一个 TITLE 或数组结尾
    for (let i = titleIndex + 1; i < _list.length; i++) {
        if (_list[i].aa === 'TITLE') {
            end = i;
            break;
        }
    }

    // 统计当前模块中已有的子序数量（即 aa 是数字的行）
    let maxAaValue = 1;
    for (let i = start; i < end; i++) {
        if (_list[i].aa !== undefined && typeof _list[i].aa === 'number' && _list[i].aa > maxAaValue) {
            maxAaValue = _list[i].aa;
        }
    }

    // 创建新数据
    const newData = {
        aa: maxAaValue + 1,
        bb: Math.random(), // 可以保留或删除，由模板自动计算
        cc: Math.random()
    };

    // 插入到模块末尾
    _list.splice(end, 0, newData);

    tableData.value = transToMergeCellData(_list);
};
// 删除问题 - 删除当前 TITLE 及其下面的所有内容
const deleteIssue = (titleIndex) => {
    const _list = [...tableData.value];

    // 找到下一个 TITLE 行的位置，或者数组末尾
    let endIndex = _list.length; // 默认到数组末尾

    // 从当前 TITLE 行之后开始查找下一个 TITLE
    for (let i = titleIndex + 1; i < _list.length; i++) {
        if (_list[i].aa === 'TITLE') {
            endIndex = i; // 找到下一个 TITLE，删除到这个位置为止
            break;
        }
    }

    // 删除从当前 TITLE 行开始到下一个 TITLE 行之前的所有数据
    // 删除的数量是 endIndex - titleIndex
    _list.splice(titleIndex, endIndex - titleIndex);

    // 重新处理数据合并
    tableData.value = transToMergeCellData(_list);
};
// 删除子序 - 删除指定的子序数据
const deleteSubNumber = (subIndex) => {
    // 检查是否点击的是 TITLE 行，如果是则不处理
    if (tableData.value[subIndex] && tableData.value[subIndex].aa === 'TITLE') {
        return;
    }

    // 创建新列表
    const _list = [...tableData.value];

    // 直接删除指定索引的数据
    _list.splice(subIndex, 1);

    // 重新处理数据合并
    tableData.value = transToMergeCellData(_list);
};
// 获取当前数据在所属 TITLE 模块内的索引
const getIndexWithinTitleGroup = (currentIndex) => {
    if (tableData.value[currentIndex] && tableData.value[currentIndex].aa === 'TITLE') {
        return 0;
    }

    // 找到当前行所属的 TITLE 行
    let titleIndex = -1;
    for (let i = currentIndex; i >= 0; i--) {
        if (tableData.value[i].aa === 'TITLE') {
            titleIndex = i;
            break;
        }
    }

    if (titleIndex === -1) return 0;

    // 统计从 titleIndex+1 到 currentIndex 之间有多少个子序（aa 是数字）
    let count = 0;
    for (let i = titleIndex + 1; i <= currentIndex; i++) {
        if (typeof tableData.value[i].aa === 'number') {
            count++;
        }
    }

    return count;
};
// 新增部门 - 在当前行下方追加一条数据
const addDept = (currentIndex) => {
    // 检查是否点击的是 TITLE 行，如果是则不处理
    if (tableData.value[currentIndex] && tableData.value[currentIndex].aa === 'TITLE') {
        return;
    }

    // 获取当前行的数据
    const currentRow = tableData.value[currentIndex];

    // 创建新数据，保持 aa、bb、cc 不变，dd 为新增内容
    const newData = {
        aa: currentRow.aa,
        bb: currentRow.bb,
        cc: currentRow.cc,
        dd: '新增部门内容' // dd 是新增内容
    };

    // 在当前行下方插入新数据
    const _list = [...tableData.value];
    _list.splice(currentIndex + 1, 0, newData);

    // 重新处理数据合并
    tableData.value = transToMergeCellData(_list);
};

onMounted(() => {
    const data = [
        { aa: 'TITLE' },
        { aa: 1, bb: 21, cc: '啦啦啦' }
        // { aa: 1, bb: 2, cc: '啦啦啦' },
        // { aa: 2, bb: 3, cc: '啦啦啦' },
        // { aa: 2, bb: 3, cc: '啦啦啦' },
        // { aa: 'TITLE', index: 2 },
        // { aa: 1, bb: 1, cc: '啦啦啦' },
        // { aa: 1, bb: 2, cc: '啦啦啦' },
        // { aa: 2, bb: 3, cc: '啦啦啦' },
        // { aa: 2, bb: 3, cc: '啦啦啦' }
    ];
    tableData.value = transToMergeCellData(data);
});
</script>
