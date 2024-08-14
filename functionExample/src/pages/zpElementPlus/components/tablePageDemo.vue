<template>
    <div>
        <ZpSearchForm :formList="formList" @onSubmit="onSubmit" @onReset="onReset" ref="zpSearchFormRef" />
        <ZpTablePage
            :tableConfig="tablePageData.tableConfig"
            :pageConfig="tablePageData.pageConfig"
            @onSelectionChange="changeTableSelection"
            @onChangePageCurrent="changePageCurrent"
            @onChangePageSize="changePageSize"
        >
            <template #operationColumn>
                <el-table-column width="120" fixed="right">
                    <template #header>操作</template>
                    <template #default="{ row }">
                        <el-button type="primary" link @click="goDetail(row)"> 详情 </el-button>
                    </template>
                </el-table-column>
            </template>
        </ZpTablePage>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ZpSearchForm, ZpTablePage, utils } from 'zp-element-plus';
import { resData } from './const';

const { isValidVal, isValidArr } = utils;

const zpSearchFormRef = ref(null);
const formList = reactive([
    { type: 'input', label: '输入框', prop: 'aa' },
    {
        type: 'select',
        label: '下拉框',
        prop: 'bb',
        value: 'hangzhou',
        options: [
            { label: '上海', value: 'shanghai' },
            { label: '杭州', value: 'hangzhou' },
            { label: '北京', value: 'beijing' },
        ],
    },
    {
        type: 'cascader',
        label: '级联',
        prop: 'cc',
        options: [
            {
                label: '安徽',
                value: 'anhui',
                children: [
                    {
                        label: '合肥',
                        value: 'hefei',
                    },
                ],
            },
            {
                label: '福建',
                value: 'fujian',
                children: [
                    {
                        label: '厦门',
                        value: 'xiamen',
                    },
                ],
            },
        ],
    },
]);
const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { label: '全选', type: 'selection', width: 60, align: 'center', fixed: 'left' },
            { label: 'id', prop: 'id', minWidth: 100 },
            { label: '姓名', prop: 'aa', minWidth: 100 },
            { label: '手机号', prop: 'bb', minWidth: 100 },
        ],
        data: [],
    },
    pageConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
    },
});

// 获取数据
const getData = async () => {
    const formData = zpSearchFormRef.value.getFormData();
    const { currentPage, pageSize } = tablePageData.pageConfig;
    const _params = {
        ...formData,
        index: currentPage,
        sise: pageSize,
    };
    console.log('参数', _params);
    try {
        tablePageData.tableConfig.loading = true;
        setTimeout(() => {
            tablePageData.tableConfig.data = resData;
            tablePageData.pageConfig.total = 100;
            tablePageData.tableConfig.loading = false;
        }, 1000);
    } catch (error) {
        tablePageData.tableConfig.loading = false;
    }
};
// 查询
const onSubmit = () => {
    tablePageData.pageConfig.currentPage = 1;
    getData();
};
// 重置
const onReset = () => {
    tablePageData.pageConfig.pageSize = 10;
    tablePageData.pageConfig.currentPage = 1;
    getData();
};
// change-分页页码
const changePageCurrent = (val) => {
    tablePageData.pageConfig.currentPage = val;
    getData();
};
// change-分页条数
const changePageSize = (val) => {
    tablePageData.pageConfig.pageSize = val;
    tablePageData.pageConfig.currentPage = 1;
    getData();
};
// change-表格复选框
const changeTableSelection = (data) => {
    console.log('选中的数据', data);
};

// 跳转详情
const goDetail = (row) => {
    console.log('当前行数据：', row);
};

onMounted(() => {
    let a = 1;
    const b = [];
    getData();
});
</script>

<style lang="less" scoped></style>
