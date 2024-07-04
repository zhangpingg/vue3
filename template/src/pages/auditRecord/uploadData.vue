<template>
    <div>
        <PageHeader title="上传资料" hidden-breadcrumb back @onBack="goBack" />
        <div class="main-card">
            <div class="mb-10">审核前上传</div>
            <TablePage :tableConfig="tablePageData.tableConfig" :isHasPage="false">
                <template #dataStatus="{ scope: { row } }">
                    <SlotColumns slotType="badge" :value="row.dataStatus" :options="uploadStatusSlotOptions" />
                </template>
                <template #operationColumn>
                    <el-table-column width="160" fixed="right">
                        <template #header>操作</template>
                        <template #default="{ row }">
                            <el-button type="primary" link @click="uploadtemplate(row)" v-if="row.templateUrl">
                                下载模板
                            </el-button>
                            <el-button type="primary" link @click="uploadFile(row)">
                                {{ row.dataStatus === 2 ? '上传' : '重新上传' }}
                            </el-button>
                        </template>
                    </el-table-column>
                </template>
            </TablePage>
        </div>
        <UploadFileDialog ref="uploadFileDialogRef" @onSuccess="getData" />
    </div>
</template>

<script setup>
import { ref, reactive, onActivated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePageStore } from '@/store';
import TablePage from '@/components/tablePage';
import { getLabelByValue, uploadRequirementDict, dataTypeDict } from '@/dicts';
import { uploadMaterialColumns } from './const';
import SlotColumns from '@/components/tablePage/common/SlotColumns';
import { uploadStatusSlotOptions } from '@/components/tablePage/common/slotOptions';
import UploadFileDialog from './components/UploadFileDialog';
import { apiGetAuditRecordUploadDataList } from '@/api/auditRecord';
import { downloadFile } from '@/libs/util.tool';

const router = useRouter();
const route = useRoute();
const pageStore = usePageStore();

const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: uploadMaterialColumns,
        data: [],
    },
});
const uploadFileDialogRef = ref();

// 获取数据
const getData = async () => {
    try {
        tablePageData.tableConfig.loading = true;
        //const res = await apiGetAuditRecordUploadDataList({ monthPlanDetailId: route.query.monthPlanDetailId });
        let res = [
            {
                dataType: 1,
                expirationDate: '2035-06-30',
                mustUploaded: 1,
                dataStatus: 1,
                uploadDate: '2024-01-02 11:22:33',
                templateUrl:
                    'http://10.1.13.23:8080/test/static/quality/test/20240606/09_1ba1466a09614c778d441288fca28c64.xlsx',
                fileUrl:
                    'http://10.1.13.23:8080/test/static/supplier/test/20240704/db986bce426d487ba1d457f6fe32ceec.jpg',
                fileName: '07.jpg',
            },
        ];
        let _res = res.map((item) => {
            item._dataType = getLabelByValue(dataTypeDict, item.dataType);
            item._mustUploaded = getLabelByValue(uploadRequirementDict, item.mustUploaded);
            return item;
        });
        tablePageData.tableConfig.data = _res;
        tablePageData.tableConfig.loading = false;
    } catch (error) {
        tablePageData.tableConfig.loading = false;
    }
};
// 返回列表页
const goBack = () => {
    pageStore.closeTab(route.name);
    router.go(-1);
};
// 下载模板
const uploadtemplate = (row) => {
    downloadFile(row.templateUrl, '中策SQS审核表模板.xlsx');
};
// 上传 1-营业执照 2-工艺流程 3-SQS审核表 456-? 7-CP 8-FMEA
const uploadFile = (row) => {
    const { dataType, id, fileUrl, expirationDate, fileName } = row;
    uploadFileDialogRef.value.openCloseDialog(true, {
        dialogType: String(dataType),
        id,
        fileUrl,
        expirationDate,
        fileName,
    });
};

onActivated(() => {
    getData();
});
</script>

<style lang="less" scoped></style>
