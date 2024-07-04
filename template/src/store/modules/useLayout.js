/**
 * 布局配置
 */

import { reactive } from 'vue';
import { defineStore } from 'pinia';
import screenfull from 'screenfull';

const useLayout = defineStore(
    'layout',
    () => {
        const layoutInfo = reactive({
            isMenuCollapse: false, // 是否菜单折叠
            isFullscreen: false, // 是否页面全屏
        });

        /**
         * @description 修改 isMenuCollapse
         * @param {Boolean} collapse 折叠状态
         */
        const updateMenuCollapse = (collapse) => {
            layoutInfo.isMenuCollapse = collapse;
        };
        // 初始化监听全屏状态
        const listenFullscreen = () => {
            if (screenfull.enabled) {
                screenfull.on('change', () => {
                    layoutInfo.isFullscreen = screenfull.isFullscreen; // 同步数据
                });
            }
        };
        // 切换全屏
        const toggleFullscreen = () => {
            if (screenfull.isFullscreen) {
                screenfull.exit(); // 退出全屏
            } else {
                screenfull.request(); // 将当前页面全屏显示
            }
            layoutInfo.isFullscreen = !layoutInfo.isFullscreen;
        };

        return { layoutInfo, updateMenuCollapse, listenFullscreen, toggleFullscreen };
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

export default useLayout;
