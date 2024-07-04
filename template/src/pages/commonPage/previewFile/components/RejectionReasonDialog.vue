<template>
    <div class="rrd">
        <el-dialog v-model="visible" :title="title" width="500" :close-on-click-modal="false">
            <el-form ref="formRef" :model="formData" label-width="110" :rules="required ? formRules : []">
                <el-form-item :label="`${label}：`" :prop="formKey">
                    <el-input
                        v-model="formData[formKey]"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 6 }"
                        placeholder="请输入"
                        show-word-limit
                        :maxlength="maxlength"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="openCloseDialog(false)">取消</el-button>
                    <el-button type="primary" @click="submit(formRef)">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: () => '退回',
    },
    label: {
        type: String,
        default: () => '退回原因',
    },
    formKey: {
        type: String,
        default: () => 'reason',
    },
    required: {
        type: Boolean,
        default: () => false,
    },
    maxlength: {
        type: Number,
        default: () => 200,
    },
});
const emit = defineEmits(['onSubmit']);

const visible = ref(false);
const formRef = ref();
const formData = reactive({ reason: null });
const formRules = reactive({
    [props.formKey]: [{ required: true, message: `请输入${props.label}`, trigger: 'blur' }],
});

// 打开/关闭弹框
const openCloseDialog = (flag) => {
    if (!flag) {
        formRef.value.resetFields();
    }
    visible.value = flag;
};
// 保存表单
const submit = async (formEl) => {
    if (!formEl) return;
    await formEl.validate((valid) => {
        if (valid) {
            emit('onSubmit', formData);
        }
    });
};

defineExpose({ openCloseDialog });
</script>

<style lang="less" scoped>
.rrd {
    :deep(.el-form-item__label) {
        padding-right: 0;
    }
    :deep(.el-form-item__content) {
        padding-right: 30px;
    }
}
</style>
