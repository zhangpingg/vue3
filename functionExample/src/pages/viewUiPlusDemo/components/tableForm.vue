<template>
    <div>
        <div></div>
        <Table border :columns="tableObj.columns" :data="data"></Table>
        <Button type="primary" @click="save">保存</Button>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, resolveComponent } from 'vue';

const optionList = [
    { value: 1, label: '选项1' },
    { value: 2, label: '选项2' },
    { value: 3, label: '选项3' }
];
const tableObj = reactive({
    columns: [
        {
            title: '姓名',
            key: 'name',
            ellipsis: true,
            tooltip: true
        },
        {
            key: 'aa',
            renderHeader: (h, p) => {
                const btn = h(
                    'span',
                    {
                        style: { color: '#2d8cf0', cursor: 'pointer' },
                        onClick: () => {
                            data.value = data.value.map((item) => {
                                item.aa = null;
                                return item;
                            });
                        }
                    },
                    '清空'
                );
                return h('div', [h('p', '年龄'), btn]);
            },
            render: (h, p) => {
                // view-ui-plus中的InputNumber，必须要在main.js中全局引入，不能在页面中按需引入
                return h(resolveComponent('InputNumber'), {
                    max: 9999,
                    min: 0,
                    'model-value': p.row.aa ? Number(p.row.aa) : null,
                    formatter: (value) => value && `${parseInt(value)}`,
                    onInput: (e) => {
                        data.value[p.index].aa = e.target._value;
                    }
                });
            }
        },
        {
            key: 'bbOne',
            renderHeader: (h, p) => {
                const btn = h(
                    'span',
                    {
                        style: { color: '#2d8cf0', cursor: 'pointer' },
                        onClick: () => {
                            data.value = data.value.map((item) => {
                                item.bbOne = null;
                                item.bbTwo = null;
                                return item;
                            });
                        }
                    },
                    '清空'
                );
                return h('div', [h('p', '返点(%)'), btn]);
            },
            render: (h, p) => {
                const bbOne = h(resolveComponent('InputNumber'), {
                    max: 99,
                    min: 0,
                    'model-value': p.row.bbOne ? Number(p.row.bbOne) : null,
                    formatter: (value) => value && `${parseInt(value)}`,
                    style: {
                        width: '60px'
                    },
                    onInput: (e) => {
                        data.value[p.index].bbOne = e.target._value;
                    }
                });
                const bbTwo = h(resolveComponent('InputNumber'), {
                    max: 99,
                    min: 0,
                    'model-value': p.row.bbTwo ? Number(p.row.bbTwo) : null,
                    formatter: (value) => value && `${parseInt(value)}`,
                    style: { width: '60px' },
                    onInput: (e) => {
                        data.value[p.index].bbTwo = e.target._value;
                    }
                });
                return h('div', [bbOne, h('span', ' + '), bbTwo]);
            }
        },
        {
            key: 'remark',
            renderHeader: (h, p) => {
                const btn = h(
                    'span',
                    {
                        style: {
                            color: '#2d8cf0',
                            cursor: 'pointer'
                        },
                        onClick: () => {
                            data.value = data.value.map((item) => {
                                item.remark = '';
                                return item;
                            });
                        }
                    },
                    '清空'
                );
                return h('div', [h('p', '备注'), btn]);
            },
            render: (h, p) => {
                return h(resolveComponent('Input'), {
                    maxlength: 100,
                    'model-value': p.row.remark || '',
                    onInput: (e) => {
                        data.value[p.index].remark = e.target._value;
                    }
                });
            }
        },
        {
            title: '下拉框父级',
            align: 'center',
            children: [
                {
                    title: '下拉框子级1',
                    align: 'center',
                    key: 'cc',
                    render: (h, p) => {
                        return h(
                            resolveComponent('Select'),
                            {
                                placeholder: '请选择',
                                modelValue: p.row.cc,
                                style: { 'text-align': 'left' },
                                'onUpdate:modelValue': (val) => {
                                    data.value[p.index].cc = val;
                                }
                            },
                            {
                                default: () =>
                                    optionList.map((item) => {
                                        return h(
                                            resolveComponent('Option'),
                                            {
                                                key: item.value,
                                                value: item.value
                                            },
                                            () => item.label
                                        );
                                    })
                            }
                        );
                    }
                },
                {
                    title: '下拉框子级2',
                    align: 'center',
                    key: 'cname'
                }
            ]
        }
    ]
});
const data = ref([
    { name: '张三', aa: 1, bbOne: '2', bbTwo: '3', remark: '备注信息1', cc: null },
    { name: '李四', aa: 4, bbOne: '5', bbTwo: '6', remark: '备注信息2', cc: 1 },
    { name: '王五', aa: 4, bbOne: '5', bbTwo: '6', remark: '备注信息2', cc: 2 }
]);

const save = () => {
    console.log(data);
};

onMounted(() => {});
</script>

<style lang="less" scoped>
.ivu-table-wrapper {
    overflow: visible;
}
</style>
