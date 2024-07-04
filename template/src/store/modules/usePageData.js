/**
 * 页面数据共享
 */

import { reactive } from 'vue';
import { defineStore } from 'pinia';

const useUser = defineStore(
    'pageData',
    () => {
        const pageData = reactive({ previewFile: null });

        // 存储页面数据
        const setPageData = (pageType, data) => {
            pageData[pageType] = data;
        };

        return { pageData, setPageData };
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

export default useUser;
