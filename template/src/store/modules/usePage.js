/**
 * 顶部多标签页
 */

import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

const usePage = defineStore(
    'page',
    () => {
        const router = useRouter();

        const pageInfo = reactive({
            menuTabsPool: [], // 可以在多页 tab 模式下显示的页面（所有菜单路由平铺后的列表，包括详情）
            openedTabList: [], // 已经打开的tab列表
            currentRouteName: '', // 当前页面路由的 name
            currentMenuActiveRouteName: '', // 当前菜单激活路由name
        });
        let _isHomeOfFirst = pageInfo.openedTabList?.[0]?.name === 'home';

        /**
         * @description 设置路由池
         * @param {Array} routes 路由tree
         */
        const setRoutePool = (routes) => {
            const routePool = [];
            const pushRoute = (routes) => {
                routes.forEach((route) => {
                    if (route.children) {
                        pushRoute(route.children);
                    } else {
                        routePool.push(route);
                    }
                });
            };
            pushRoute(routes);
            pageInfo.menuTabsPool = routePool;
        };
        /**
         * @description 打开一个新的页面
         * @param {Object} menu 从路由钩子的 to 对象上获取 { name, params, query } 路由信息
         */
        const openTab = async (menu) => {
            const { name, query } = menu;
            // 判断此页面是否已经打开
            const pageOpened = pageInfo.openedTabList.find((page) => page.name === name);
            if (pageOpened) {
                pageInfo.openedTabList.forEach((item) => {
                    if (item.name === name) {
                        item.query = query;
                    }
                });
            } else {
                // 没有相应的page, 即没有打开过
                let page = pageInfo.menuTabsPool.find((item) => item.name === name);
                // 如果这里没有找到, 代表这个路由虽然在框架内，但是不参与标签页显示
                if (page) {
                    pageInfo.openedTabList.push({ ...page, query });
                }
            }
        };

        /**
         * @description 设置当前激活的页面 name
         * @param {String} routeName 当前页面路由的name
         */
        const setRouteName = (routeName) => {
            pageInfo.currentRouteName = routeName;
        };
        /**
         * @description 设置当前左侧菜单激活的页面 name
         * @param {String} routeName 当前页面路由的name
         */
        const setMenuActiveRouteName = (routeName) => {
            pageInfo.currentMenuActiveRouteName = routeName;
        };
        /**
         * @description 关闭一个 tag (关闭一个页面)
         * @param {Object} param  name: 要关闭的标签名字
         */
        const closeTab = async (name) => {
            // 下个新的页面
            let newPage = pageInfo.openedTabList[0];
            const isCurrent = pageInfo.currentRouteName === name;
            // 如果关闭的页面是否是当前显示的页面
            if (isCurrent) {
                // 去找一个新的页面
                let len = pageInfo.openedTabList.length;
                for (let i = 0; i < len; i++) {
                    if (pageInfo.openedTabList[i].name === name) {
                        // 是否只剩最后一个，是则跳首页
                        if (len > 1) {
                            // 如果是最后一个，则向前一个跳，否则向下一个跳
                            if (i === len - 1) {
                                newPage = pageInfo.openedTabList[i - 1];
                            } else {
                                newPage = pageInfo.openedTabList[i + 1];
                            }
                        } else {
                            newPage = {};
                        }
                        break;
                    }
                }
            }
            // 找到这个页面在已经打开的数据里是第几个
            const index = pageInfo.openedTabList.findIndex((page) => page.name === name);
            if (index >= 0) {
                // 更新数据 删除关闭的页面
                pageInfo.openedTabList.splice(index, 1);
            }
            if (isCurrent) {
                if (newPage.query.isReset === '1') {
                    router.push({ path: newPage.path || '/home', query: { ...newPage.query, isReset: '0' } });
                } else {
                    router.push({ path: newPage.path || '/home', query: newPage.query });
                }
            }
        };
        // 关闭当前标签左边的标签
        const closeLeftTab = () => {
            let currentIndex = 0;
            pageInfo.openedTabList.forEach((page, index) => {
                if (page.name === pageInfo.currentRouteName) {
                    currentIndex = index;
                }
            });
            if (currentIndex > 0) {
                pageInfo.openedTabList.splice(_isHomeOfFirst ? 1 : 0, _isHomeOfFirst ? currentIndex - 1 : currentIndex);
            }
        };
        // 关闭当前标签右边的标签
        const closeRightTab = () => {
            let currentIndex = 0;
            pageInfo.openedTabList.forEach((page, index) => {
                if (page.name === pageInfo.currentRouteName) {
                    currentIndex = index;
                }
            });
            // 删除打开的页面 并在缓存设置中删除
            pageInfo.openedTabList.splice(currentIndex + 1);
        };
        // 关闭当前标签之外的所有标签
        const closeOtherTab = () => {
            let currentIndex = 0;
            pageInfo.openedTabList.forEach((page, index) => {
                if (page.name === pageInfo.currentRouteName) {
                    currentIndex = index;
                }
            });
            // 删除打开的页面数据 并更新缓存设置
            if (currentIndex === 0) {
                pageInfo.openedTabList.splice(1);
            } else {
                let _isHasHome = pageInfo.openedTabList?.[0]?.name === 'home';
                pageInfo.openedTabList.splice(currentIndex + 1);
                pageInfo.openedTabList.splice(_isHasHome ? 1 : 0, _isHasHome ? currentIndex - 1 : currentIndex);
            }
        };
        // 关闭所有标签
        const closeAllTab = () => {
            // 删除打开的页面 并在缓存设置中删除
            pageInfo.openedTabList.splice(_isHomeOfFirst ? 1 : 0);
            if (pageInfo.currentRouteName !== 'home') {
                router.push({ path: '/home' });
            }
        };
        // 清空数据
        const clearPageInfo = () => {
            pageInfo.menuTabsPool = [];
            pageInfo.openedTabList = [];
        };

        return {
            pageInfo,
            setRoutePool,
            openTab,
            setRouteName,
            setMenuActiveRouteName,
            closeTab,
            closeLeftTab,
            closeRightTab,
            closeOtherTab,
            closeAllTab,
            clearPageInfo,
        };
    },
    {
        persist: {
            enabled: true,
            strategies: [
                {
                    storage: localStorage,
                },
            ],
        },
    }
);

export default usePage;
