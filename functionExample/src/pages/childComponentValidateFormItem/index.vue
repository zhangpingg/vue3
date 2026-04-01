<!--
* @Author: zhangping
* @Date: 2026-03-25 09:55:27
* @Description: 子组件自动校验表单项必填
-->

<template>
    <div>
        <el-form ref="formRef" :model="formData" :rules="formRules" label-width="auto" label-suffix=":">
            <el-form-item label="收集信息" prop="infoList">
                <ListFormItem v-model:list="formData.infoList" />
            </el-form-item>
        </el-form>
        <Button type="primary" class="ml-20" @click="save">保存</Button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ListFormItem from './components/ListFormItem';

const formRef = ref();
const formData = ref({
    infoList: []
});
const formRules = ref({
    infoList: [{ required: true, message: '请选择文件', trigger: 'change' }]
});

// 保存
const save = async () => {
    await formRef.value.validate(async (valid, fields) => {
        if (valid) {
            console.log('formData', formData.value);
        }
    });
};
</script>

<style lang="less" scoped></style>
