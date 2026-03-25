<!--
* @Author: zhangping
* @Date: 2026-03-13 08:56:33
* @Description: 表格中嵌入表单（表单项）
使用示例：
    <el-form-item label="合同管控指标收集" prop="hasMetric">
        <ContractControlIndicatorCollectFormItem
            ref="contractControlIndicatorCollectFormItemRef"
            :formRef="formRef"
            v-model:hasMetric="formData.hasMetric"
            :customerId="2"
            :clientHomebaseVOList="formData.clientHomebaseVOList"
        />
    </el-form-item>
    // 获取数据
    let list = await contractControlIndicatorCollectFormItemRef.value.getSelectedData();  
    
    未做：
        上传文件
-->

<template>
    <div class="w-100">
        <TablePage :tableConfig="tablePageData.tableConfig" :isHasPage="false">
            <template #aa="{ scope: { row } }">
                <el-input v-model="row.aa" placeholder="请输入" @change="updateParentList" />
            </template>
            <template #bb="{ scope: { row } }">
                <el-input-number
                    v-model="row.bb"
                    :min="0"
                    :precision="2"
                    :controls="false"
                    placeholder="请输入"
                    class="inputNumber"
                    @change="updateParentList"
                />
            </template>
            <template #cc="{ scope: { row } }">
                <el-select v-model="row.cc" placeholder="请选择" clearable @change="updateParentList">
                    <el-option
                        v-for="item in selectTypeDict"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </template>
            <template #dd="{ scope: { row } }">
                <el-select v-model="row.dd" placeholder="请选择" clearable multiple @change="updateParentList">
                    <el-option
                        v-for="item in selectTypeDict"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </template>
            <template #ee="{ scope: { row, $index } }">
                <el-select
                    v-model="row.ee"
                    multiple
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请选择"
                    :remote-method="(val) => eeRemoteMethod($index, val)"
                    :loading="loadings.select"
                    @change="updateParentList"
                >
                    <el-option v-for="item in row.eeList" :key="item.value" :label="item.label" :value="item.value">
                        <span>{{ item.label }}</span>
                    </el-option>
                    <el-option
                        v-if="row.eeList && row.eeList.length === 0 && !loadings.select"
                        :label="'暂无数据'"
                        :value="''"
                        disabled
                    />
                </el-select>
            </template>
            <template #startEndDate="{ scope: { row } }">
                <el-radio-group v-model="row.dateType" @change="updateParentList">
                    <el-radio :value="1">
                        <el-date-picker
                            v-model="row.startEndDate"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :disabled="row.dateType == 2"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                            style="width: 240px"
                        />
                    </el-radio>
                    <el-radio :value="2">长期有效</el-radio>
                </el-radio-group>
            </template>
            <template #ff="{ scope: { row } }">
                <el-input
                    v-model="row.ff"
                    :rows="3"
                    type="textarea"
                    placeholder="请输入"
                    :maxlength="500"
                    @change="updateParentList"
                />
            </template>
            <template #fileList="{ scope: { row } }">
                <UploadFile
                    v-model:bindList="row.fileList"
                    :bindKeys="{ url: 'fileUrl', name: 'fileName' }"
                    @uploadSuccess="updateParentList"
                />
            </template>
            <template #operationColumn>
                <el-table-column width="80" fixed="right">
                    <template #header>操作</template>
                    <template #default="{ row, $index }">
                        <el-button
                            type="danger"
                            link
                            @click="deleteItem($index)"
                            v-if="tablePageData.tableConfig.data.length > 1"
                        >
                            删除
                        </el-button>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
            </template>
        </TablePage>
        <el-button :icon="Plus" class="addBtn w-100 mt-10" style="max-width: 800px" @click="addItem"> 添加 </el-button>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import TablePage from '@/components/tablePage';
import UploadFile from '@/components/uploadFile';
// import { apiProjectListCustomerProject } from '@/api/projectManage';
import { selectTypeDict } from '@/dicts';
import { isValidVal, isValidArr } from '@/libs/util.tool';

const props = defineProps({
    // 列表
    list: {
        type: Array,
        default: () => []
    },
    // 表单的实例
    formRef: {
        typeof: Object,
        default: null
    }
});
const emit = defineEmits(['update:list']);

const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { label: '文本-输入框', prop: 'aa', slotName: 'aa', minWidth: 150 },
            { label: '数字-输入框', prop: 'bb', slotName: 'bb', minWidth: 150 },
            { label: '单选-下拉框', prop: 'cc', slotName: 'cc', minWidth: 150, required: true },
            { label: '多选-下拉框', prop: 'dd', slotName: 'dd', minWidth: 150, required: true },
            { label: '下拉框-远程搜索', prop: 'ee', slotName: 'ee', minWidth: 150 },
            { label: '开始/结束-日期', prop: 'startEndDate', slotName: 'startEndDate', minWidth: 260 },
            { label: '文本域', prop: 'ff', slotName: 'ff', minWidth: 250 },
            { label: '上传文件', prop: 'fileList', slotName: 'fileList', minWidth: 250 }
        ],
        data: []
    }
});
const loadings = reactive({ select: false });

// 更新父级列表
const updateParentList = () => {
    console.log('updateParentList');
    emit('update:list', tablePageData.tableConfig.data);
};
// ee-远程搜索
const eeRemoteMethod = async (index, val) => {
    try {
        loadings.select = true;
        // const res = await apiProjectListCustomerProject({ customerId: 1, keyword: val });
        const res = [
            { label: '项目1', value: 1 },
            { label: '项目2', value: 2 },
            { label: '项目3', value: 3 }
        ];
        setTimeout(() => {
            tablePageData.tableConfig.data[index].eeList = res;
            loadings.select = false;
        }, 1000);
    } catch (error) {
        loadings.select = false;
    }
};
// 添加-item
const addItem = () => {
    tablePageData.tableConfig.data.push({});
};
// 删除item
const deleteItem = (index) => {
    tablePageData.tableConfig.data.splice(index, 1);
};
// 校验必填项
const validateRequired = () => {
    return new Promise((resolve, reject) => {
        const noCcList = tablePageData.tableConfig.data.filter((item) => !item.cc);
        const noDdList = tablePageData.tableConfig.data.filter((item) => !isValidVal(item.dd) || !isValidArr(item.dd));
        if (noCcList.length > 0) {
            ElMessage({ message: '请选择(单选)下拉框', type: 'warning', plain: true });
            reject();
            return;
        }
        if (noDdList.length > 0) {
            ElMessage({ message: '请选择(多选)下拉框', type: 'warning', plain: true });
            reject();
            return;
        }
        let _list = tablePageData.tableConfig.data.map((item) => ({
            ...item
            // startDate: item.dateType == 1 ? item.startEndDate[0] : null,
            // endDate: item.dateType == 1 ? item.startEndDate[1] : null
        }));
        resolve(_list);
    });
};
// 清空选中的数据
const clearSelectedData = () => {
    tablePageData.tableConfig.data = [{}];
};

defineExpose({ validateRequired, clearSelectedData });
watch(
    () => props.list,
    (newList) => {
        if (newList && newList.length > 0) {
            tablePageData.tableConfig.data = [...newList];
            newList.forEach((item, index) => {
                eeRemoteMethod(index, '');
            });
        } else {
            tablePageData.tableConfig.data = [{}]; // 空数组时，保留一行空数据
        }
    },
    { immediate: true } // 初始化时也执行
);
</script>

<style lang="less" scoped>
.addBtn {
    border: 1px dashed #dcdfe6;
}
:deep(.el-input__wrapper),
:deep(.el-select__wrapper),
:deep(.el-textarea__inner) {
    box-shadow: 0 0 0 1px #dcdfe6 inset !important;
}
.inputNumber {
    :deep(.el-input__inner) {
        text-align: left;
    }
}
</style>
