<template>
    <div>
        <div></div>
        <Table border :columns="tableObj.columns" :data="data"></Table>
        <button @click="save">保存</button>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, resolveComponent } from 'vue';
import { Table } from 'view-ui-plus';

const tableObj = reactive({
    columns: [
        {
            title: '姓名',
            align: 'center',
            key: 'name',
            ellipsis: true,
            tooltip: true
        },
        {
            title: 'Company',
            align: 'center',
            children: [
                {
                    title: 'Company Address',
                    key: 'caddress',
                    align: 'center',
                    width: 200
                },
                {
                    title: 'Company Name',
                    key: 'cname',
                    align: 'center',
                    width: 200
                }
            ]
        },
        {
            align: 'center',
            key: 'aa',
            renderHeader: (h, p) => {
                const btn = h(
                    'span',
                    {
                        style: { color: '#2d8cf0', cursor: 'pointer' },
                        onClick: () => {
                            data.value = data.value.map((item, index) => {
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
            align: 'center',
            key: 'bbOne',
            renderHeader: (h, p) => {
                const btn = h(
                    'span',
                    {
                        style: { color: '#2d8cf0', cursor: 'pointer' },
                        onClick: () => {
                            data.value = data.value.map((item, index) => {
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
            align: 'center',
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
                            data.value = data.value.map((item, index) => {
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
        }
    ]
});
const data = ref([
    { name: '张三', aa: 1, bbOne: '2', bbTwo: '3', remark: '备注信息1' },
    { name: '李四', aa: 4, bbOne: '5', bbTwo: '6', remark: '备注信息2' }
]);

const save = () => {
    console.log(data);
};

onMounted(() => {
    //initMap();
});
</script>

<style lang="less" scoped></style>
