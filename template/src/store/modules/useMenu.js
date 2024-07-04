/**
 * 侧边栏菜单、顶部菜单
 */

import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { frameIn } from '@/router/routes';

const useMenu = defineStore(
    'menu',
    () => {
        const menuInfo = reactive({
            nameList: [], // 侧边栏菜单权限列表
        });

        /**
         * 获取当前权限菜单对应所有的path路径列表（接口返回的，不包含详情）
         * @param menu 菜单列表
         * @return {*[]} 菜单路径列表
         */
        const getMainMenuNameList = (menuTree) => {
            let names = [];
            for (let item of menuTree) {
                if (item.children && item.children.length > 0) {
                    names = [...names, ...getMainMenuNameList(item.children)];
                } else {
                    names.push(item.name);
                    delete item.children;
                }
            }
            return names;
        };
        /**
         * 获取当前权限菜单对应所有的name列表（接口返回菜单权限匹配本地所有的路由，包含详情）
         * @param menu 菜单列表
         * @param list 接口返回的菜单权限
         * @return {*[]} 菜单路径列表
         */
        const getMainAndDetailPathList = (menuTree, list) => {
            let names = [];
            for (let item of menuTree) {
                if (item.children && item.children.length > 0) {
                    names = [...names, ...getMainAndDetailPathList(item.children, list)];
                } else {
                    if (list.includes(item.name) || list.includes(item.meta.parentName)) {
                        names.push(item.name);
                        delete item.children;
                    }
                }
            }
            return names;
        };

        /**
         * @description 设置侧边栏菜单
         * @param {Array} menuTree 侧边栏菜单tree
         */
        const setPathList = (menuTree) => {
            const mainMenuNamelist = getMainMenuNameList(menuTree); // 接口返回的，不包含详情
            menuInfo.nameList = getMainAndDetailPathList(frameIn[1].children, [...mainMenuNamelist, 'previewFile']);
        };

        return { menuInfo, setPathList };
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

export default useMenu;
