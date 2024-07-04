<!--
 * @Author: zhangping
 * @Date: 2024-05-13 13:43:00
 * @Description: 左侧侧边栏菜单组件
-->

<template>
    <div class="sm">
        <div class="sm-header tac" @click="goHome">
            <img
                class="sm-header-smallLogo"
                src="@/assets/images/logo-small.png"
                v-if="layoutStore.layoutInfo.isMenuCollapse"
            />
            <img src="@/assets/images/logo-big-dark.png" class="sm-header-bigLogo" v-else />
        </div>
        <el-menu
            background-color="#191a23"
            text-color="#ffffffb3"
            active-text-color="#fff"
            :default-active="currentMenuActiveRouteName"
            :collapse="layoutStore.layoutInfo.isMenuCollapse"
            class="sm-main"
        >
            <template v-for="item in userStore?.userInfo?.authMenuList" :key="item.name">
                <!--无子级-->
                <template v-if="!isValidArr(item?.children)">
                    <el-menu-item :index="item.name" @click="jumpMenu(item)">
                        <el-icon><component :is="item.icon" /></el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
                <!--有子级-->
                <template v-else>
                    <el-sub-menu :index="item.name">
                        <template #title>
                            <el-icon><component :is="item.icon" /></el-icon>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="itemChi in item.children" :key="itemChi.name">
                            <!--三期：没有【供应商审核】菜单，暂时先注释掉-->
                            <el-menu-item
                                :index="itemChi.name"
                                @click="jumpMenu(itemChi)"
                                v-if="itemChi.name !== 'supplierReview-supplierReview-index'"
                            >
                                <el-badge :value="itemChi.todoNum || 0" :show-zero="false" class="sm-main-badge">
                                    {{ itemChi.title }}
                                </el-badge>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { isValidArr } from '@/libs/util.tool';
import { useLayoutStore, usePageStore, useUserStore } from '@/store';

const router = useRouter();
const layoutStore = useLayoutStore();
const pageStore = usePageStore();
const userStore = useUserStore();

const { currentMenuActiveRouteName } = toRefs(pageStore.pageInfo);

// 跳转首页
const goHome = () => {
    router.push({ path: '/home' });
};
// 跳转菜单
const jumpMenu = (menu) => {
    router.push({ path: menu.path });
};
</script>

<style lang="less" scoped>
.sm {
    height: 100%;
    background: #191a23;
    display: flex;
    flex-direction: column;
    .sm-header {
        height: 63px;
        line-height: 63px;
        text-align: center;
        border-bottom: 1px solid #101117;
        overflow: hidden;
        cursor: pointer;
        .sm-header-smallLogo {
            width: 38px;
            vertical-align: middle;
        }
        .sm-header-bigLogo {
            width: 90%;
            vertical-align: middle;
        }
    }
    .sm-main {
        flex: 1;
        box-sizing: border-box;
        overflow-y: scroll;
        width: 100%;
    }
    .sm-main::-webkit-scrollbar {
        width: 0px;
        height: 10px;
    }
    .sm-main-badge {
        :deep(.el-badge__content) {
            border-width: 0px;
            right: calc(-8px + var(--el-badge-size) / 2);
            top: 16px;
        }
    }
    :deep(.el-menu) {
        border-right: 0;
    }
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title),
    :deep(.el-menu-tooltip__trigger) {
        padding-left: 22px !important;
    }
    :deep(.el-sub-menu .el-menu-item) {
        padding-left: 52px !important;
    }
    :deep(.el-menu-item.is-active) {
        background: #101117;
    }
    :deep(.el-sub-menu .el-menu-item.is-active) {
        background: var(--el-color-primary);
    }
    :deep(:hover.el-menu-item) {
        color: #fff;
    }
}
</style>
