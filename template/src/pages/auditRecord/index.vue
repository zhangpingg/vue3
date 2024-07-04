<template>
    <div>
        <PageHeader title="审核记录" hidden-breadcrumb />
        <div class="main-card">
            <TablePage :tableConfig="tablePageData.tableConfig" :isHasPage="false">
                <template #auditDate="{ scope: { row } }">
                    <span>{{ row._startDate }}</span>
                    <br />
                    <div class="tac" style="width: 110px">至</div>
                    <span>{{ row._endDate }}</span>
                </template>
                <template #reviewNum="{ scope: { row } }">
                    <span>审核前：{{ row.beforeReviewNum || '-' }}</span> <br />
                    <span>审核后：{{ row.afterReviewNum || '-' }}</span>
                </template>
                <template #operationColumn>
                    <el-table-column width="180" fixed="right">
                        <template #header>操作</template>
                        <template #default="{ row }">
                            <el-button type="primary" link @click="uploadMaterial(row)">上传资料</el-button>
                            <el-button type="primary" link @click="reviewNotice(row)">评审通知</el-button>
                        </template>
                    </el-table-column>
                </template>
            </TablePage>
        </div>
    </div>
</template>

<script setup>
import { reactive, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import TablePage from '@/components/tablePage';
import { columns } from './const';
import { apiGetAuditRecord } from '@/api/auditRecord';

const router = useRouter();

const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: columns,
        data: [],
    },
});

// 获取数据
const getData = async () => {
    try {
        tablePageData.tableConfig.loading = true;
        //const res = await apiGetAuditRecord();
        let res = [
            {
                productName: '树脂、聚辛烯橡胶VESTENAMER 8012(赢创)、白炭黑VN3GR(德固萨 彤程)',
                startDate: '2024-05-16 18:00',
                endDate: '2024-05-16 18:02',
                auditOperator: '张三（质管）、刘二（质管）',
                beforeReviewNum: 1,
                afterReviewNum: 2,
            },
        ];
        let _res = res.map((item) => {
            item._startDate = item.startDate.substring(0, 16);
            item._endDate = item.endDate.substring(0, 16);
            return item;
        });
        tablePageData.tableConfig.data = _res;
        tablePageData.tableConfig.loading = false;
    } catch (error) {
        tablePageData.tableConfig.loading = false;
    }
};
// 上传资料
const uploadMaterial = (row) => {
    router.push({ path: './uploadData', query: { monthPlanDetailId: row.monthPlanDetailId } });
};
// 评审通知
const reviewNotice = (row) => {
    const fileUrl = 'http://10.1.13.23/test/static/quality/test/20240624/ebdf274402064a42bd1200543da67d3a.xlsx';
    router.push({ path: '/previewFile', query: { url: fileUrl, title: '评审通知', pageSource: 'auditRecord' } });
};

onActivated(() => {
    getData();
});
</script>

<style lang="less" scoped></style>
