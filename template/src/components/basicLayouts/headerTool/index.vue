<!--
 * @Author: zhangping
 * @Date: 2024-05-13 13:43:00
 * @Description: 顶部导航栏组件
-->

<template>
    <div class="ht">
        <div class="dib">
            <div class="ht-comItem pl-10 pr-10 pt-18 cup dib fs-20" @click="expandOrCollapseSideMenu">
                <el-icon v-if="isMenuCollapse"><Expand /></el-icon>
                <el-icon v-else><Fold /></el-icon>
            </div>
            <div class="ht-comItem cup pl-10 pt-18 pr-10 dib fs-20" @click="refreshPage">
                <el-icon><Refresh /></el-icon>
            </div>
            <div class="pt-8 dib por" style="top: -4px" v-if="titlePrefix">
                <el-tag type="primary">当前{{ titlePrefix }}环境</el-tag>
            </div>
            <div class="ml-5 dib por" style="top: -4px">欢迎您，{{ userName }}</div>
        </div>
        <div class="fr">
            <span class="ht-comItem ht-itemScreen pl-10 pr-10 dib cup poa pt-18" @click="toggleFullscreen">
                <Icon custom="i-icon i-icon-full-screen fs-20" v-if="!isFullscreen" />
                <Icon custom="i-icon i-icon-exit-full-screen fs-20" v-else />
            </span>
            <span class="ht-comItem ht-itemLogout pl-10 pr-10 dib cup">
                <Dropdown trigger="hover" class="ht-item-dropdown pt-18" @on-click="openAccountDropdown">
                    <Avatar size="small" icon="ios-person" />
                    <span class="ml-10">{{ mobile }}</span>
                    <template #list>
                        <DropdownMenu>
                            <DropdownItem divided name="logout">
                                <Icon type="ios-log-out mr-10" />
                                <span>退出登录</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </span>
        </div>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { Icon, Dropdown, DropdownMenu, DropdownItem, Avatar, Modal } from 'view-ui-plus';
import { useLayoutStore, useUserStore, usePageStore } from '@/store';
import { ElMessage } from 'element-plus';
import { titlePrefix } from '@/libs/util.win';

const router = useRouter();
const layoutStore = useLayoutStore();
const userStore = useUserStore();
const pageStore = usePageStore();

const { isMenuCollapse, isFullscreen } = toRefs(layoutStore.layoutInfo);
const { userName, mobile } = toRefs(userStore.userInfo);

// 展开/收起-侧边栏
const expandOrCollapseSideMenu = () => {
    layoutStore.updateMenuCollapse(!layoutStore.layoutInfo.isMenuCollapse);
};
// 刷新网页
const refreshPage = () => {
    location.reload();
};
// 切换全屏
const toggleFullscreen = () => {
    layoutStore.toggleFullscreen();
};
// 退出登录
const lotgout = async () => {
    ElMessage({
        plain: true,
        type: 'success',
        message: '退出成功！',
    });
    localStorage.clear();
    pageStore.clearPageInfo();
    sessionStorage.clear();
    document.cookie.split(';').forEach(function (c) {
        document.cookie = c.trim().split('=')[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    });
    router.push({ path: '/login' });
};
// 打开-账号的下拉列表
const openAccountDropdown = (name) => {
    if (name === 'logout') {
        Modal.confirm({
            title: '退出登录确认',
            content: '您确定退出登录当前账户吗？',
            onOk() {
                lotgout();
            },
        });
    }
};
</script>

<style lang="less" scoped>
.ht {
    background: #fff;
    .ht-comItem {
        height: 60px;
        box-sizing: border-box;
        &:hover {
            background: #f8f8f9;
        }
    }
    .ht-itemScreen {
        top: 0;
        right: 148px;
    }
    .ht-itemLogout {
        width: 148px;
        :deep(.el-avatar) {
            width: 24px;
            height: 24px;
        }
    }
    .ht-item-dropdown {
        height: 60px;
        :deep(.ivu-select-dropdown) {
            margin: 21px 0 !important;
        }
    }
}
</style>
