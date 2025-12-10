<!--
* @Author: zhangping
* @Date: 2025-09-22 17:19:06
* @Description: 
-->

<template>
    <div class="tableContant">
        <el-table :data="tableData" :span-method="spanMethod" border>
            <el-table-column prop="a1Label" label="a1-客户序号" :min-width="120" fixed="left">
                <template #default="{ row }">
                    <div class="titleCell">
                        <div v-if="row.a1Id == 'TITLE'">
                            <div>问题序号 {{ row.index }}</div>
                        </div>
                        <div v-else>{{ row.a1Label }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="a2Label" label="a2-工序" :min-width="120" fixed>
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.a2Label }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="b1Label" label="b1-子序" :min-width="100" fixed>
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.b1Label }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="b2Label" label="b2-问题描述" :min-width="120" fixed>
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.b2Label }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="b3Label" label="b3-原因分析" :min-width="200">
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.b3Label }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="actionPlan" label="正常列-行动计划" :min-width="200">
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.actionPlan }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="planCompleteDate" label="正常列-计划完成日期" :min-width="200">
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.planCompleteDate }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="actualCompleteDate" label="正常列-实际完成日期" :min-width="200">
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.actualCompleteDate }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="rectificationEvidence" label="正常列-整改证据" :min-width="200">
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.rectificationEvidence }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="b4Label" label="b4-整改负责人" :min-width="200">
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.b4Label }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="b5Label" label="b5-其他" :min-width="200">
                <template #default="{ row }">
                    <div v-if="row.a1Id == 'TITLE'" class="titleCell"></div>
                    <div v-else>{{ row.b5Label }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" :min-width="200" fixed="right">
                <template #default="{ row }">
                    <button v-if="row.a1Id !== 'TITLE'">审核</button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { transToMergeCellList } from '@/libs/util.tool';

const tableData = ref([]);

// 合并单元格
const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
    // 如果是TITLE行，则不进行任何合并
    if (row.a1Id === 'TITLE') {
        return [1, 1]; // 正常显示，不合并
    }
    // 普通行：根据ID合并
    switch (columnIndex) {
        case 0:
            return [row.a1IdRowSpan, 1];
        case 1:
            return [row.a2IdRowSpan, 1];
        case 2:
            return [row.b1IdRowSpan, 1];
        case 3:
            return [row.b2IdRowSpan, 1];
        case 4:
            return [row.b3IdRowSpan, 1];
        case 9:
            return [row.b4IdRowSpan, 1];
        case 10:
            return [row.b5IdRowSpan, 1];
        case 11:
            return [row.operationIdRowSpan, 1];
        default:
            return [1, 1];
    }
};

// 转换为合并单元格数据
const transToMergeCellData = (data) => {
    // 按 TITLE 分组处理数据
    const processedData = [];
    let currentGroup = [];
    data.forEach((item) => {
        if (item.a1Id === 'TITLE') {
            // 处理当前组的数据
            if (currentGroup.length > 0) {
                const mergedGroup = transToMergeCellList(currentGroup, [
                    'a1Id',
                    'a2Id',
                    'b1Id',
                    'b2Id',
                    'b3Id',
                    'b4Id',
                    'b5Id',
                    'operationId'
                ]);
                processedData.push(...mergedGroup);
                currentGroup = [];
            }
            // 添加 TITLE 行
            processedData.push(item);
        } else {
            // 收集非 TITLE 行
            currentGroup.push(item);
        }
    });
    if (currentGroup.length > 0) {
        const mergedGroup = transToMergeCellList(currentGroup, [
            'a1Id',
            'a2Id',
            'b1Id',
            'b2Id',
            'b3Id',
            'b4Id',
            'b5Id',
            'operationId'
        ]);
        processedData.push(...mergedGroup);
    }
    return processedData;
};
// 转换嵌套列表为平铺列表
const transNestingListToFlattenList = (list) => {
    let result = [];
    list.forEach((item, index) => {
        result.push({ a1Id: 'TITLE', index: item.num });
        item.issueRectifies.forEach((itemRectifies, indexItemRectifies) => {
            itemRectifies.issuePlans.forEach((itemPlan) => {
                result.push({
                    a1Id: index + 1,
                    a1Label: item.orderNum,
                    a2Id: index + 1,
                    a2Label: item.process,
                    b1Id: indexItemRectifies + 1,
                    b1Label: itemRectifies.subProcess,
                    b2Id: indexItemRectifies + 1,
                    b2Label: itemRectifies.problem,
                    b3Id: indexItemRectifies + 1,
                    b3Label: itemRectifies.analysis,
                    actionPlan: itemPlan.planDetail,
                    planCompleteDate: itemPlan.planFinishDate,
                    actualCompleteDate: itemPlan.actualFinishDate,
                    rectificationEvidence: itemPlan.rectifyEvidenceFileName,
                    rectifyEvidenceUrl: itemPlan.rectifyEvidenceUrl,
                    b4Id: indexItemRectifies + 1,
                    b4Label: itemRectifies.issueUsers
                        .map((itemUser) => {
                            return `${itemUser.userName}（${itemUser.deptName}）`;
                        })
                        .join('、'),
                    b5Id: indexItemRectifies + 1,
                    b5Label: itemRectifies.remark,
                    operationId: indexItemRectifies + 1
                });
            });
        });
    });
    return result;
};
// 获取ccar详情
const getCcarDetail = async () => {
    // 模拟接口返回的数据
    const res = [
        {
            id: 1,
            orderNum: '5.6.1', // 客户序号
            num: 1, // 问题序号
            process: '炼胶',
            issueRectifies: [
                {
                    subProcess: '1.1',
                    problem: '问题描述1',
                    analysis: '原因分析1',
                    // 行动计划
                    issuePlans: [
                        {
                            planDetail: '行动计划1',
                            planFinishDate: '2021-01-01',
                            actualFinishDate: '2021-01-01',
                            rectifyEvidenceFileName: '01.png',
                            rectifyEvidenceUrl:
                                'http://10.1.13.23:8081/test/static/pt/test/pt/20251208/26d4046399cb46d8b3ba5cd1d99ea1a6.webp'
                        }
                    ],
                    // 整改负责人
                    issueUsers: [{ userName: '张三', deptName: '销售部1' }],
                    remark: '备注1'
                },
                {
                    subProcess: '1.2',
                    problem: '问题描述2',
                    analysis: '原因分析2',
                    issuePlans: [
                        {
                            planDetail: '行动计划1',
                            planFinishDate: '2021-01-01',
                            actualFinishDate: '2021-01-01',
                            rectifyEvidenceFileName: '01.png',
                            rectifyEvidenceUrl:
                                'http://10.1.13.23:8081/test/static/pt/test/pt/20251208/26d4046399cb46d8b3ba5cd1d99ea1a6.webp'
                        },

                        {
                            planDetail: '行动计划2',
                            planFinishDate: '2021-01-02',
                            actualFinishDate: '2021-01-02',
                            rectifyEvidenceFileName: '02.png',
                            rectifyEvidenceUrl:
                                'http://10.1.13.23:8081/test/static/pt/test/pt/20251208/26d4046399cb46d8b3ba5cd1d99ea1a6.webp'
                        }
                    ],
                    // 整改负责人
                    issueUsers: [{ userName: '李四', deptName: '销售部2' }],
                    remark: '备注2'
                }
            ]
        }
    ];
    transNestingListToFlattenList(res);
    // 平铺时需要的列表格式
    const data = [
        { a1Id: 'TITLE', index: 1 },
        {
            a1Id: 1,
            a1Label: '5.6.1',
            a2Id: 1,
            a2Label: '炼胶',
            b1Id: 1,
            b1Label: '1.1',
            b2Id: 1,
            b2Label: '问题描述1',
            b3Id: 1,
            b3Label: '原因分析1',
            actionPlan: '行动计划1', // 正常列
            planCompleteDate: '2021-01-01', // 正常列
            actualCompleteDate: '2021-01-01', // 正常列
            rectificationEvidence: '整改证据', // 正常列
            b4Id: 1,
            b4Label: '整改负责人1',
            b5Id: 1,
            b5Label: '其他1'
        },
        {
            a1Id: 1,
            a1Label: '5.6.1',
            a2Id: 1,
            a2Label: '炼胶',
            b1Id: 2,
            b1Label: '1.2',
            b2Id: 2,
            b2Label: '问题描述2',
            b3Id: 2,
            b3Label: '原因分析2',
            actionPlan: '行动计划2',
            planCompleteDate: '2021-01-01',
            actualCompleteDate: '2021-01-01',
            rectificationEvidence: '整改证据',
            b4Id: 2,
            b4Label: '整改负责人2',
            b5Id: 2,
            b5Label: '其他2'
        },
        {
            a1Id: 1,
            a1Label: '5.6.1',
            a2Id: 1,
            a2Label: '炼胶',
            b1Id: 2,
            b1Label: '1.2',
            b2Id: 2,
            b2Label: '问题描述2',
            b3Id: 2,
            b3Label: '原因分析2',
            actionPlan: '行动计划3',
            planCompleteDate: '2021-01-02',
            actualCompleteDate: '2021-01-03',
            rectificationEvidence: '整改证据',
            b4Id: 2,
            b4Label: '整改负责人2',
            b5Id: 2,
            b5Label: '其他2'
        },
        {
            a1Id: 1,
            a1Label: '5.6.1',
            a2Id: 1,
            a2Label: '炼胶',
            b1Id: 2,
            b1Label: '1.2',
            b2Id: 2,
            b2Label: '问题描述2',
            b3Id: 2,
            b3Label: '原因分析2',
            actionPlan: '行动计划4',
            planCompleteDate: '2021-01-01',
            actualCompleteDate: '2021-01-03',
            rectificationEvidence: '整改证据',
            b4Id: 2,
            b4Label: '整改负责人2',
            b5Id: 2,
            b5Label: '其他2'
        },
        { a1Id: 'TITLE', index: 2 },
        {
            a1Id: 1,
            a1Label: '5.6.2',
            a2Id: 1,
            a2Label: '仓库',
            b1Id: 1,
            b1Label: '2.1',
            b2Id: 1,
            b2Label: '问题描述1',
            b3Id: 1,
            b3Label: '原因分析1',
            actionPlan: '行动计划1',
            planCompleteDate: '2021-01-01',
            actualCompleteDate: '2021-01-01',
            rectificationEvidence: '整改证据',
            b4Id: 1,
            b4Label: '整改负责人',
            b5Id: 1,
            b5Label: '其他1'
        },
        {
            a1Id: 1,
            a1Label: '5.6.2',
            a2Id: 1,
            a2Label: '仓库',
            b1Id: 2,
            b1Label: '2.2',
            b2Id: 2,
            b2Label: '问题描述2',
            b3Id: 2,
            b3Label: '原因分析2',
            actionPlan: '行动计划2',
            planCompleteDate: '2021-01-01',
            actualCompleteDate: '2021-01-01',
            rectificationEvidence: '整改证据',
            b4Id: 2,
            b4Label: '整改负责人2',
            b5Id: 2,
            b5Label: '其他2'
        },
        {
            a1Id: 1,
            a1Label: '5.6.2',
            a2Id: 1,
            a2Label: '仓库',
            b1Id: 2,
            b1Label: '2.2',
            b2Id: 2,
            b2Label: '问题描述2',
            b3Id: 2,
            b3Label: '原因分析2',
            actionPlan: '行动计划3',
            planCompleteDate: '2021-01-02',
            actualCompleteDate: '2021-01-03',
            rectificationEvidence: '整改证据',
            b4Id: 2,
            b4Label: '整改负责人2',
            b5Id: 2,
            b5Label: '其他2'
        },
        {
            a1Id: 1,
            a1Label: '5.6.2',
            a2Id: 1,
            a2Label: '仓库',
            b1Id: 2,
            b1Label: '2.2',
            b2Id: 2,
            b2Label: '问题描述2',
            b3Id: 2,
            b3Label: '原因分析2',
            actionPlan: '行动计划4',
            planCompleteDate: '2021-01-02',
            actualCompleteDate: '2021-01-03',
            rectificationEvidence: '整改证据',
            b4Id: 2,
            b4Label: '整改负责人2',
            b5Id: 2,
            b5Label: '其他2'
        }
    ];
    tableData.value = transToMergeCellData(transNestingListToFlattenList(res));
};

onMounted(() => {
    getCcarDetail();
});
</script>

<style lang="less" scoped>
.title {
    border: 2px solid #f00;
}
/* 通过检查单元格内容是否包含 titleCell 来去除右边框 */
:deep(.el-table__body tr td:has(> .cell > .titleCell)) {
    border-right: none !important;
}
</style>
