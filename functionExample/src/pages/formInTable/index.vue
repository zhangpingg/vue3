<template>
    <div class="fit">
        <ZpTablePage :tableConfig="tablePageData.tableConfig" :isHasPage="false">
            <template #bb="{ scope: { row, $index } }">
                <el-form :model="row" :ref="formRefs[$index]" inline>
                    是否必填：{{ !!row.bbb }}
                    <el-form-item prop="bb" :rules="[{ required: !!row.bbb, message: '请选择时间' }]">
                        <el-date-picker
                            v-model="row.bb"
                            type="date"
                            placeholder="请选择"
                            class="fit-datePicker"
                            @change="(val) => changeDatePicker($index, val)"
                        />
                    </el-form-item>
                </el-form>
            </template>
            <template #operation="{ scope: { row, $index } }">
                <el-button type="primary" link @click="uploadFile(row, $index)"> 点击上传后，日期是必填的 </el-button>
            </template>
        </ZpTablePage>
        <el-button type="primary" @click="submit">确定</el-button>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ZpTablePage } from 'zp-element-plus';
import dayjs from 'dayjs';

const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { label: '姓名', prop: 'aa', minWidth: 155 },
            { label: '证书有效期', prop: 'bb', minWidth: 200, slotName: 'bb' },
            { label: '操作', prop: 'operation', minWidth: 180, slotName: 'operation' }
        ],
        data: [
            { aa: '张三', bb: null, cc: null },
            { aa: '李四', bb: null, cc: null }
        ]
    }
});
const formRefs = reactive([]);

// 上传文件
const uploadFile = (row, index) => {
    tablePageData.tableConfig.data[index].bbb = true;
};
// change-时间
const changeDatePicker = (index, value) => {
    tablePageData.tableConfig.data[index].bb = value && dayjs(value).format('YYYY-MM-DD');
};
// 提交
const submit = async () => {
    formRefs.forEach((item) => {
        item.value.validate((valid) => {
            if (valid) {
                console.log('成功', tablePageData.tableConfig.data);
            } else {
                console.log('失败');
            }
        });
    });
};

onMounted(() => {
    // 初始化表单引用
    tablePageData.tableConfig.data.forEach(() => {
        formRefs.push(ref(null));
    });
});
</script>

<style lang="less" scoped>
.fit {
    :deep(.fit-datePicker) {
        width: 140px;
    }
}
</style>
