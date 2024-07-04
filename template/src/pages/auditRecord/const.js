import { dateColumn, dateLongColumn } from '@/components/tablePage/common/columns';

// 列表页的表头
const columns = [
    { label: '供应产品名称', prop: 'productName', minWidth: 300 },
    { label: '审核时间', prop: 'auditDate', minWidth: 140, slotName: 'auditDate' },
    { label: '审核组成员', prop: 'auditOperator', minWidth: 200 },
    { label: '待上传资料', prop: 'reviewNum', minWidth: 140, slotName: 'reviewNum' },
];

// 上传资料的表头
const uploadMaterialColumns = [
    { label: '资料名称', prop: '_dataType', minWidth: 140 },
    dateColumn('有效期', 'expirationDate'),
    { label: '上传要求', prop: '_mustUploaded', minWidth: 120 },
    { label: '状态', prop: 'dataStatus', minWidth: 100, slotName: 'dataStatus' },
    dateLongColumn('更新时间', 'uploadDate'),
];

export { columns, uploadMaterialColumns };
