import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';
import routes from './routes';
import { usePageStore, useMenuStore } from '@/store';
import { modifyTitle } from '@/libs/util.win';

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// 路由拦截（跳转前）
router.beforeEach((to, from, next) => {
    const menuStore = useMenuStore();
    // 判断是否需要登录才可以进入
    if (to.meta.auth) {
        const token = Cookies.get('token');
        if (token && token !== 'undefined') {
            if (menuStore.menuInfo.nameList.includes(to.name)) {
                next();
            } else {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath,
                    },
                });
            }
        } else {
            // 没有登录的时候跳转到登录界面，携带上登陆成功之后需要跳转的页面完整路径
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                },
            });
        }
    } else {
        next();
    }
});
// 路由（跳转后）
router.afterEach((to) => {
    const pageStore = usePageStore();
    pageStore.openTab(to);
    pageStore.setRouteName(to.name);
    pageStore.setMenuActiveRouteName(to.meta?.parentName || to.name);
    modifyTitle({ title: to.meta.title });
    window.scrollTo(0, 0);
});

export default router;
