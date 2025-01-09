<!--
 * @Author: zhangping
 * @Date: 2024-05-15 14:12:05
 * @Description: 表格上方的查询条件组件
 * 【type类型】：
 * input：普通输入框
 * select：下拉框
        isConvertToBoolean: true/false 是否转换为boolean
 * cascader：级联
 * year：年
 * month: 月
 * daterange: 日期区间
        isJoinTimeSuffix: true/false 是否拼接时间后缀
 * datetimerange：日期时间区间
        isJoinTimeSuffix: true/false 是否拼接时间后缀
 * monthrange：月份区间
 * custom：自定义组件
-->

<template>
    <div class="tf">
        <el-form label-width="110" :model="formData" ref="formRef" v-bind="formConfig">
            <el-row>
                <el-col
                    :span="8"
                    v-for="{ type, label, prop, options, customComponent, ...restItem } in props.formList"
                    :key="prop"
                >
                    <el-form-item :label="label" :prop="prop" v-if="type === 'input'">
                        <el-input v-model="formData[prop]" placeholder="请输入" clearable v-bind="restItem" />
                    </el-form-item>
                    <el-form-item :label="label" :prop="prop" v-if="type === 'select'">
                        <el-select v-model="formData[prop]" placeholder="请选择" clearable v-bind="restItem">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="label" :prop="prop" v-if="type === 'cascader'">
                        <el-cascader
                            v-model="formData[prop]"
                            :options="options"
                            placeholder="请选择"
                            clearable
                            v-bind="restItem"
                        />
                    </el-form-item>
                    <el-form-item
                        :label="label"
                        :prop="isValidArr(prop) ? prop.join(',') : prop"
                        v-if="
                            type === 'year' ||
                            type === 'month' ||
                            type === 'daterange' ||
                            type === 'datetimerange' ||
                            type === 'monthrange'
                        "
                    >
                        <el-date-picker
                            v-model="formData[isValidArr(prop) ? prop.join(',') : prop]"
                            :type="type"
                            clearable
                            v-bind="{ ...getDatePickerAttr(type), ...restItem }"
                        />
                    </el-form-item>
                    <el-form-item :label="label" :prop="prop" v-if="type === 'custom'">
                        <component
                            :is="CustomComponentMap[customComponent]"
                            :value="formData[isValidArr(prop) ? prop.join(',') : prop]"
                            @onChange="(val) => changeCustomComponent(prop, val, restItem.onChange)"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="btnLayoutSpan" class="tf-btnCol">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">查询</el-button>
                        <el-button @click="resetForm(formRef)">重置</el-button>
                        <slot name="extra"></slot>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { isValidArr, clearInvalidKey } from '@/libs/util.tool';
import { CustomComponentMap } from './const';

const props = defineProps({
    // form配置
    formConfig: {
        type: Object,
        default() {
            return {};
        },
    },
    // 查询条件列表
    formList: {
        type: Object,
        default() {
            return [];
        },
    },
});
const emit = defineEmits(['onSubmit', 'onReset']);
const formData = reactive({});
const formRef = ref();

// 查询按钮的布局span
const btnLayoutSpan = computed(() => {
    const _layoutSpanMap = {
        0: 24,
        1: 16,
        2: 8,
    };
    return _layoutSpanMap[props.formList.length % 3];
});
/**
 * @description 根据日期选择器类型，获取日期时间选择器相应的属性
 * @param {String} type 日期选择器类型
 * @returns {Object} 返回日期时间选择器相应的属性
 */
const getDatePickerAttr = (type) => {
    let _attrs = {};
    switch (type) {
        case 'year':
            _attrs = {
                format: 'YYYY',
                valueFormat: 'YYYY',
                placeholder: '请选择',
            };
            break;
        case 'month':
            _attrs = {
                format: 'YYYY-MM',
                valueFormat: 'YYYY-MM',
                placeholder: '请选择',
            };
            break;
        case 'daterange':
            _attrs = {
                format: 'YYYY-MM-DD',
                valueFormat: 'YYYY-MM-DD',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
            };
            break;
        case 'datetimerange':
            _attrs = {
                format: 'YYYY-MM-DD HH:mm',
                valueFormat: 'YYYY-MM-DD HH:mm',
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
            };
            break;
        case 'monthrange':
            _attrs = {
                format: 'YYYY-MM',
                valueFormat: 'YYYY-MM',
                startPlaceholder: '开始月份',
                endPlaceholder: '结束月份',
            };
            break;
    }
    return _attrs;
};
// 初始化查询的参数，赋默认值
const initSearchParams = () => {
    props.formList.forEach((item) => {
        const { prop } = item;
        if (item.hasOwnProperty('value')) {
            formData[isValidArr(prop) ? prop.join(',') : prop] = item.value;
        }
    });
};
/**
 * @description 根据key获取其相应的选项
 * @param {Array} list 对象数组
 * @param {String} key 对象中的某个key
 * @returns {String} 返回选项
 */
const getItemByKey = (list, key) => {
    const _item = list.find((item) => {
        const _flag = (isValidArr(item.prop) ? item.prop.join(',') : item.prop) === key;
        return _flag;
    });
    return _item;
};
/**
 * @description 格式化对象，清除value是null，undefined的key，并格式化拼接时间
 * @param {Object} data 需要格式化的对象
 * @returns {Object} 返回格式化后的对象
 */
const formatFormData = (data) => {
    const _data = clearInvalidKey(data);
    for (let key in _data) {
        let _item = getItemByKey(props.formList, key);
        if (_item) {
            switch (_item.type) {
                case 'select':
                    if (_item.isConvertToBoolean) {
                        _data[key] = !!_data[key];
                    }
                    break;
                case 'daterange':
                    if (_item.isJoinTimeSuffix) {
                        _data[key.split(',')[0]] = dayjs(_data[key][0]).format('YYYY-MM-DD HH:mm:ss');
                        _data[key.split(',')[1]] = dayjs(`${_data[key][1]} 23:59:59`).format('YYYY-MM-DD HH:mm:ss');
                    } else {
                        _data[key.split(',')[0]] = _data[key][0];
                        _data[key.split(',')[1]] = _data[key][1];
                    }
                    break;
                case 'datetimerange':
                    if (_item.isJoinTimeSuffix) {
                        _data[key.split(',')[0]] = dayjs(`${_data[key][0]}00`).format('YYYY-MM-DD HH:mm:ss');
                        _data[key.split(',')[1]] = dayjs(`${_data[key][1]}59`).format('YYYY-MM-DD HH:mm:ss');
                    } else {
                        _data[key.split(',')[0]] = _data[key][0];
                        _data[key.split(',')[1]] = _data[key][1];
                    }
                    break;
                case 'monthrange':
                    _data[key.split(',')[0]] = _data[key][0];
                    _data[key.split(',')[1]] = _data[key][1];
                    break;
                case 'custom':
                    if (_item.customComponent === 'MonthRange') {
                        _data[key.split(',')[0]] = _data[key][0];
                        _data[key.split(',')[1]] = _data[key][1];
                    }
                    break;
            }
        }
        if (key.indexOf(',') > -1) {
            delete _data[key];
        }
    }
    return clearInvalidKey(_data);
};
// change-自定义组件
const changeCustomComponent = (prop, val, callback) => {
    formData[prop] = val;
    callback && callback();
};
// 提交表单
const submitForm = () => {
    const _formData = formatFormData(formData);
    emit('onSubmit', _formData);
};
// 重置表单
const resetForm = (formEl) => {
    if (!formEl) return;
    formEl.resetFields();
    initSearchParams();
    const _formData = formatFormData(formData);
    emit('onReset', _formData);
};
// 获取-form数据
const getFormData = () => {
    return formatFormData(formData);
};

defineExpose({ getFormData });
onMounted(() => {
    initSearchParams();
});
</script>

<style lang="less" scoped>
.tf {
    .tf-btnCol {
        display: flex;
        justify-content: flex-end;
    }
    :deep(.el-cascader),
    :deep(.el-input) {
        width: 100%;
    }
}
</style>
