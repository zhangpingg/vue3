<!-- <template>
    <div class="home">
        <div class="home-main">
            <img src="@/assets/images/home-logo.png" alt="logo" class="home-main-logo" />
            <p style="width: 100%" />
            <img src="@/assets/images/home-tips.png" alt="logo" class="home-main-tips" />
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="less">
.home {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #43536c url('../../assets/images/home-bg.jpg') no-repeat 50% 50%;
    background-size: 100% 100%;
    flex-wrap: wrap;
    .home-main {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        height: 193px;
        margin-bottom: 150px;
        img {
            max-width: 80%;
            display: block;
            margin: 0 auto;
        }
        .home-main-logo {
            width: 590px;
            margin: auto 150px;
        }
        .home-main-tips {
            width: 915px;
        }
    }
}
</style> -->

<template>
    <div>
        <PageHeader title="标题" hidden-breadcrumb>
            <template #action>
                <el-button type="primary" :icon="Plus" @click="goDetail('ADD')">新增</el-button>
            </template>
        </PageHeader>
        <div class="main-card">
            <TableForm :formList="formList" @onSubmit="onSubmit" @onReset="onReset" ref="tableFormRef">
                <template #extra>
                    <el-button type="danger" @click="exportList">导出</el-button>
                </template>
            </TableForm>
            <TablePage
                :tableConfig="tablePageData.tableConfig"
                :pageConfig="tablePageData.pageConfig"
                @onSelectionChange="changeTableSelection"
                @onChangePageCurrent="changePageCurrent"
                @onChangePageSize="changePageSize"
            >
                <template #ee="{ scope: { row } }">
                    <SlotColumns slotType="text" :value="row.ee" :options="statusOneDict" />
                </template>
                <template #auditStatus="{ scope: { row } }">
                    <SlotColumns slotType="badge" :value="row.auditStatus" :options="statusOneDict" />
                </template>
                <template #operationColumn>
                    <el-table-column width="120" fixed="right">
                        <template #header>操作</template>
                        <template #default="{ row }">
                            <el-button type="primary" link @click="goDetail('CHECK', row)">查看</el-button>
                            <el-button type="primary" link @click="goDetail('EDIT', row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </template>
            </TablePage>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { Plus } from '@element-plus/icons-vue';
import TableForm from '@/components/tableForm';
import TablePage from '@/components/tablePage';
import { roleSelectItem } from '@/components/tableForm/common/rolseSelectItem';
import {
    getCurrentYear,
    getPrevYearMoth,
    yearDateItem,
    monthDateItem,
    monthRangeDateItem,
    dateRangeTmplItem,
    dateTimeRangeTmplItem,
} from '@/components/tableForm/common/dateItem';
import { personNameColumn } from '@/components/tablePage/common/columns';
import SlotColumns from '@/components/tablePage/common/SlotColumns';
import { getLabelByValue, statusOneDict, productLevelDict } from '@/dicts';

const router = useRouter();
const {
    proxy: { globalConst },
} = getCurrentInstance();

const tableFormRef = ref(null);
const formList = reactive([
    { type: 'input', label: '自定义名称', prop: '自定义key' }, // 自定义输入框模板，扩展后，可拼接自定义数据
    roleSelectItem, // 角色（也可以扩展后，拼接自定义数据，下面均同理）
    { ...yearDateItem, value: getCurrentYear() }, // 年份，默认当前年
    { ...monthDateItem, value: getPrevYearMoth() }, // 月份，默认上一个月
    monthRangeDateItem, // 月份区间
    { ...dateRangeTmplItem, isJoinTimeSuffix: true }, // 日期区间-模板
    dateTimeRangeTmplItem, // 日期时间区间-模板

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
    {
        type: 'custom',
        label: '自定义',
        prop: 'zz',
        customComponent: 'CustomA',
        placeholder: '占位符',
    },
]);
const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { label: '全选', type: 'selection', width: 60, align: 'center', fixed: 'left' },
            { label: '姓名', prop: 'aa', minWidth: 150 },
            personNameColumn('手机号', 'bb'),
            { label: '状态1', prop: '_productLevel', minWidth: 100 },
            { label: '状态3', prop: 'ee', minWidth: 100, slotName: 'ee' },
            { label: '审核结论', prop: 'auditStatus', minWidth: 140, slotName: 'auditStatus' },
        ],
        data: [],
    },
    pageConfig: {
        currentPage: 1,
        pageSize: globalConst.paginationMap.pageSize,
        total: 0,
    },
});

// 获取数据
const getData = async () => {
    const { currentPage, pageSize } = tablePageData.pageConfig;
    const _params = {
        ...tableFormRef.value.getFormData(),
        current: currentPage,
        sise: pageSize,
    };
    console.log('调接口', _params);
    try {
        tablePageData.tableConfig.loading = true;
        //const res = await apiGetRoleListByPage(_params);
        const res = {
            list: [
                { id: 1, aa: '张三', bb: '18258261040', productLevel: 1, ee: 1, auditStatus: 1 },
                { id: 2, aa: '李四', bb: '18258261041', productLevel: 2, ee: 2, auditStatus: 2 },
                { id: 3, aa: '王五', bb: '18258261042', productLevel: 3, ee: 3, auditStatus: 3 },
                { id: 4, aa: '赵六', bb: '18258261043', productLevel: 4, ee: null, auditStatus: null },
            ],
        };
        tablePageData.tableConfig.data = res.list.map((item) => {
            item._productLevel = getLabelByValue(productLevelDict, item.productLevel);
            return item;
        });
        //tablePageData.pageConfig.total = Number(res.total);
        tablePageData.tableConfig.loading = false;
    } catch (error) {
        tablePageData.tableConfig.loading = false;
    }
};
// 跳转详情-新增/编辑
const goDetail = (mode, row = {}) => {
    router.push({ path: './detail', query: { mode, id: row.id } });
};
// change-表格复选框
const changeTableSelection = (data) => {
    console.log('选中的数据', data);
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
// 查询
const onSubmit = () => {
    tablePageData.pageConfig.currentPage = 1;
    getData();
};
// 重置
const onReset = () => {
    tablePageData.pageConfig.pageSize = globalConst.paginationMap.pageSize;
    tablePageData.pageConfig.currentPage = 1;
    getData();
};
// 导出列表
const exportList = () => {
    console.log('导出');
};

onMounted(() => {
    getData();
});
</script>

<style lang="less" scoped></style>
