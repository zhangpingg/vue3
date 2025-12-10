<!--
 * @Author: zhangping
 * @Date: 2024-05-14 11:34:05
 * @Description: 表格组件（表格+分页）
-->

<template>
    <div class="tp">
        <el-table
            ref="tableRef"
            empty-text="亲，没有找到相关记录哦！~"
            v-loading="props.tableConfig.loading"
            @selection-change="onSelectionChange"
            @row-click="onRowClick"
            v-bind="props.tableConfig"
        >
            <el-table-column v-for="item in props.tableConfig.columns" :key="item.prop" v-bind="item">
                <template #header>
                    <div><span style="color: #f56c6c" v-if="item.required">*</span> {{ item.label }}</div>
                </template>
                <template #default="scope" v-if="item.type != 'selection'">
                    <slot :name="item.prop" v-if="item.prop === item.slotName" :scope="scope" />
                    <div v-else-if="item.isFile">
                        <template v-if="scope.row[item.prop]">
                            <el-button
                                type="primary"
                                link
                                v-if="isAllowPreview(scope.row[item.prop], allowCheckFileTypes)"
                                @click="onPreviewOrDownload(scope.row[item.prop], 'preview')"
                            >
                                查看
                            </el-button>
                            <el-button
                                type="primary"
                                link
                                @click="onPreviewOrDownload(scope.row[item.prop]), 'download'"
                            >
                                下载
                            </el-button>
                        </template>
                        <span v-else> - </span>
                    </div>
                    <div v-else>
                        <EllipsisText
                            v-if="!!item.rowNumber"
                            :content="isValidVal(scope.row[item.prop]) ? scope.row[item.prop] : props.emptyCellContent"
                            :row-number="item.rowNumber"
                        />
                        <span v-else>
                            {{ isValidVal(scope.row[item.prop]) ? scope.row[item.prop] : props.emptyCellContent }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <slot name="operationColumn"></slot>
        </el-table>
        <slot name="extra"></slot>
        <div class="tp-pagination mt-15" v-if="isHasPage">
            <el-pagination
                :page-sizes="globalConst.paginationMap.pageSizes"
                layout="total, prev, pager, next, sizes, jumper"
                background
                :current="1"
                :page-size="globalConst.paginationMap.pageSize"
                :total="0"
                @current-change="onChangePageCurrent"
                @size-change="onChangePageSize"
                v-bind="props.pageConfig"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { isValidVal, downloadFile, previewFile, isAllowPreview } from '@/libs/util.tool';
import Setting from '@/globalSetting';
import EllipsisText from './common/EllipsisText';

const { allowCheckFileTypes } = Setting; // 允许查看的文件类型

const props = defineProps({
    // 表格配置
    tableConfig: {
        type: Object,
        default() {
            return { columns: [], data: [] };
        }
    },
    // 分页配置
    pageConfig: {
        type: Object,
        default() {
            return {};
        }
    },
    // 是否有页码
    isHasPage: {
        type: Boolean,
        default: true
    },
    // 空单元格内容
    emptyCellContent: {
        type: String,
        default: '-'
    }
});
const emit = defineEmits(['onSelectionChange', 'onRowClick', 'onChangePageCurrent', 'onChangePageSize']);

const {
    proxy: { globalConst }
} = getCurrentInstance();

const tableRef = ref();

// 选择表格复选框
const onSelectionChange = (list) => {
    emit('onSelectionChange', list);
};
// 当某一行被点击时会触发
const onRowClick = (row, column, event) => {
    emit('onRowClick', row, column, event);
};
// change-分页页码
const onChangePageCurrent = (val) => {
    emit('onChangePageCurrent', val);
};
// change-分页条数
const onChangePageSize = (val) => {
    emit('onChangePageSize', val);
};
// 清空选中的项
const clearSelection = () => {
    tableRef.value.clearSelection();
};
// 查看/下载
const onPreviewOrDownload = (fileUrl, type) => {
    type === 'preview' ? previewFile(fileUrl) : downloadFile(fileUrl);
};

defineExpose({ clearSelection });
</script>

<style lang="less" scoped>
.tp {
    .tp-pagination {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
