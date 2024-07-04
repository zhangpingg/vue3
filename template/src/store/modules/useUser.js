/**
 * 登录用户信息
 */

import { ref } from 'vue';
import { defineStore } from 'pinia';

const useUser = defineStore(
    'user',
    () => {
        const userInfo = ref({});

        // 存储用户信息
        const setUserInfo = (data) => {
            userInfo.value = data;
        };

        return { userInfo, setUserInfo };
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
