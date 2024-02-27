import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "",
        redirect: "/directivePage",
    },
    {
        path: `/directivePage`,
        name: "directivePage",
        meta: {
            title: "指令页",
        },
        component: () => import("@/pages/directivePage/index.vue"),
    },
    {
        path: `/home`,
        name: "home",
        meta: {
            title: "路由-首页",
        },
        component: () => import("@/pages/routerPage/home.vue"),
    },
    {
        path: `/about`,
        name: "about",
        meta: {
            title: "路由-关于",
        },
        component: () => import("@/pages/routerPage/about.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
