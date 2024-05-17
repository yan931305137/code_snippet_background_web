import {createWebHistory, createRouter} from "vue-router"

const routes = [
    {
        path: '/login',
        name: "Login",
        component: () => import("../page/login/login.vue")
    },
    {
        path: "/",
        name: 'Layout',
        component: () => import("../page/mainLayout.vue"),
        // 嵌套路由
        children: [
            {
                // 这里不设置值，是把main作为默认页面
                path: "",
                redirect: '/home',
                component: () => import("../page/home.vue"),
            },
            {
                // 这里不设置值，是把main作为默认页面
                path: "home",
                name: "Home",
                component: () => import("../page/home.vue"),
            },
            {
                path: "user",
                name: "User",
                component: () => import("../page/user.vue"),
            },
            {
                path: "code",
                name: "Code",
                component: () => import("../page/code.vue"),
            },
            {
                path: "top",
                name: "Top",
                component: () => import("../page/top.vue"),
            },
            {
                path: "info",
                name: "Info",
                component: () => import("../page/info.vue"),
            },
            {
                path: "role",
                name: "Role",
                component: () => import("../page/role.vue"),
            },
            {
                path: "log",
                name: "Log",
                component: () => import("../page/log.vue"),
            },
            {
                path: "setting",
                name: "Setting",
                component: () => import("../page/setting.vue"),
            }
        ],
    },
];

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory("/"),
    routes, // `routes: routes` 的缩写
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === "/login") {
        next();
    } else {
        let token = localStorage.getItem('token');
        if (token) {
            next();
        } else {
            next("/login");
        }
    }
})

export default router;
