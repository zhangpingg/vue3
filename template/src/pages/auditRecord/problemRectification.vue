<template>
    <div class="pr" v-loading="loadings.page">
        <PageHeader title="问题整改" hidden-breadcrumb back @onBack="goBack">
            <template #action>
                <el-button> 导出问题 </el-button>
            </template>
        </PageHeader>
        <div class="pr-main">
            <TablePage :tableConfig="tablePageData.tableConfig" :isHasPage="false" :key="updateKey" />
        </div>

        <el-dialog v-model="isShowSaveModal" width="360">
            <p class="mt-10 mb-30">
                <el-icon style="color: #f90; top: 7px" class="fs-26 por mr-5"><WarningFilled /></el-icon>
                是否保存内容？
            </p>
            <template #footer>
                <el-button type="primary" @click="backOperation('save')"> 保存 </el-button>
                <el-button @click="backOperation('noSave')"> 不保存 </el-button>
                <el-button @click="backOperation('cancel')"> 取消 </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onActivated, onDeactivated } from 'vue';
import _ from 'lodash';
import TablePage from '@/components/tablePage';
import { setPageScrollZero, setPageScrollPosition, removePageScrollListener } from '@/libs/util.tool';
import { bus } from '@/libs/util.bus.js';
import { useRouter, useRoute } from 'vue-router';
import { usePageStore } from '@/store';

const router = useRouter();
const route = useRoute();
const pageStore = usePageStore();

const mode = ref(route.query.mode);
const isShowSaveModal = ref(false);
const loadings = reactive({ page: false });
const updateKey = ref(0);
const tablePageData = reactive({
    tableConfig: {
        loading: false,
        columns: [
            { label: '姓名', prop: 'name', minWidth: 600 },
            { label: '年龄', prop: 'age', minWidth: 600 },
        ],
        data: [{ id: 1, name: '张三', age: 10 }],
    },
});
const initList = ref([]);
const resultList = ref([]);

// 是否修改过页面内容
const isModified = computed(() => {
    if (JSON.stringify(initList.value) !== JSON.stringify(resultList.value)) {
        return true;
    }
    return false;
});

// 获取数据
const getData = async () => {
    try {
        tablePageData.tableConfig.loading = true;
        const res = [1];
        initList.value = res;
        resultList.value = [...res, 2];
        tablePageData.tableConfig.loading = false;
    } catch (error) {
        tablePageData.tableConfig.loading = false;
    }
};
// 返回列表页
const goBack = () => {
    if (mode.value === 'EDIT' && isModified.value) {
        isShowSaveModal.value = true;
    } else {
        pageStore.closeTab(route.name);
        router.go(-1);
    }
};
// 返回操作
const backOperation = (saveType) => {
    switch (saveType) {
        case 'save':
            console.log('调接口保存');
            break;
        case 'noSave':
            isShowSaveModal.value = false;
            pageStore.closeTab(route.name);
            router.go(-1);
            break;
        case 'cancel':
            isShowSaveModal.value = false;
            break;
    }
};

onMounted(() => {
    bus.on(`close_${route.name}`, () => {
        goBack();
    });
    if (!Number(route.query.isReset)) {
        getData();
    }
});
onActivated(() => {
    setPageScrollPosition();
    mode.value = route.query.mode;
    if (Number(route.query.isReset)) {
        getData();
        setPageScrollZero();
    }
});
onDeactivated(() => {
    removePageScrollListener();
    updateKey.value++;
});
</script>

<style lang="less" scoped>
.pr {
    .pr-main {
        margin-top: 16px;
        background-color: #fff;
        padding: 16px;
        border-radius: 4px;
        height: 600px;
    }
}
</style>
