<!-- 还没整理完 -->

<template>
    <div style="background: #fff; padding: 20px">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-suffix=":">
            <el-form-item label="收集信息" prop="infoList">
                <span class="poa" style="color: #f00; top: 0px; left: -83px">*</span>
                <TableFormFormItem ref="tableFormFormItemRef" :formRef="formRef" v-model:list="formData.infoList" />
            </el-form-item>
        </el-form>
        <Button type="primary" @click="echo">回显</Button>
        <Button type="primary" class="ml-20" @click="save">保存</Button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TableFormFormItem from './components/TableFormFormItem';

const formRef = ref();
const tableFormFormItemRef = ref();
const formData = ref({
    infoList: []
});
const formRules = ref({});

// 回显
const echo = () => {
    formData.value.infoList = [
        {
            aa: '你好',
            bb: 10,
            cc: 1,
            dd: [1, 2],
            ee: [1, 2],
            dateType: 1,
            startEndDate: ['2022-01-01', '2022-01-02'],
            ff: '文本域内容',
            fileList: [
                {
                    fileName: '01.pdf',
                    fileUrl:
                        'http://10.1.13.23:8081/test/static/pt/test/pt/20260325/170011db585d432293827c7c719f62a5.pdf'
                }
            ]
        },
        {
            aa: '你好2',
            bb: 22,
            cc: 2,
            dd: [2],
            ee: [2],
            dateType: 2,
            startEndDate: [],
            ff: '文本域内容2'
        }
    ];
};
// 保存
const save = async () => {
    await formRef.value.validate(async (valid, fields) => {
        if (valid) {
            await tableFormFormItemRef.value.validateRequired();
            console.log('formData', formData.value);
        }
    });
};
</script>

<style lang="less" scoped></style>
