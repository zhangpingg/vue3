<!-- 还没整理完 -->

<template>
    <div style="background: #fff; padding: 20px">
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-suffix=":">
            <el-form-item label="收集信息" prop="infoList">
                <TableFormFormItem ref="tableFormFormItemRef" :formRef="formRef" v-model:list="formData.infoList" />
            </el-form-item>
        </el-form>
        ={{ formData }}=
        <Button type="primary" @click="save">保存</Button>
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
const formRules = ref({
    infoList: [{ required: true, message: '请填写收集信息', trigger: 'blur' }]
});

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
