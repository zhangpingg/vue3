<template>
    <div class="pf" v-loading="loading">
        <PageHeader :title="title" @onBack="goBack" back hidden-breadcrumb></PageHeader>
        <div
            :class="[
                'main-card',
                {
                    'pf-excel': fileType == 'excel',
                    'mb-50': [].includes(pageSource),
                },
            ]"
        >
            <vue-office-pdf :src="url" v-if="fileType === 'pdf'" />
            <vue-office-docx :src="url" v-if="fileType === 'docx'" />
            <vue-office-excel :src="url" v-if="fileType === 'excel'" />
        </div>
        <FooterToolbar v-if="[].includes(pageSource)">
            <el-button type="primary" @click="agreeApproval" v-if="[].includes(pageSource)"> 同意 </el-button>
        </FooterToolbar>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onActivated } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePageStore, usePageDataStore } from '@/store';
import VueOfficePdf from '@vue-office/pdf';
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import { ElMessage, ElMessageBox } from 'element-plus';
import RejectionReasonDialog from './components/RejectionReasonDialog';

const router = useRouter();
const route = useRoute();
const pageStore = usePageStore();
const pageDataStore = usePageDataStore();

const rejectionReasonDialogRef = ref();
const title = ref(route.query.title);
const url = ref(route.query.url);
const pageSource = ref(route.query.pageSource);
const loading = ref(true);
const yearlyPlanData = reactive({});
const monthlyPlanData = reactive({});
const supplementPlanData = reactive({});
const approvalCenterData = reactive({});

// 文件类型
const fileType = computed(() => {
    let _list = url.value.split('.');
    let _fileType = _list[_list.length - 1];
    return _fileType === 'xlsx' ? 'excel' : _fileType;
});
// 返回列表页
const goBack = () => {
    pageStore.closeTab(route.name);
    router.go(-1);
};
// 创建观察者
const createObserve = () => {
    const dom = document.querySelector('.pf');
    const observer = new MutationObserver(() => {
        const rect = dom.getBoundingClientRect();
        loading.value = !(rect.height > 500);
    });
    observer.observe(dom, { childList: true, subtree: true });
};

onActivated(() => {
    title.value = route.query.title || '预览文件';
    url.value = route.query.url;
    pageSource.value = route.query.pageSource;
    createObserve();
});
</script>

<style lang="less" scoped>
.pf {
    .pf-excel {
        height: 650px;
    }
}
</style>
