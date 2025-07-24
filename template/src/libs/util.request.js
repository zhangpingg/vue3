import { apiGetUserInfo } from '@/api/account';
import { useUserStore, useMenuStore } from '@/store';
import { userInfoRes } from '@/pages/account/login/mockRes'; // 【接口返回】

const userStore = useUserStore();
const menuStore = useMenuStore();

// 获取用户菜单信息
const requestUser = async () => {
    //const userInfoRes = await apiGetUserInfo();
    userStore.setUserInfo(userInfoRes);
    menuStore.setPathList(userInfoRes.authMenuList);
};

export { requestUser };
