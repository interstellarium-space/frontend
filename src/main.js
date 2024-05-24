import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from "./App.vue";
import Index from "./pages/Index.vue";
import Login from "./pages/Login.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import Dashboard from "./pages/Dashboard.vue";
import Users from "./pages/Users.vue";
import Departments from "./pages/Departments.vue";
import Projects from "./pages/Projects.vue";
import Contracts from "./pages/Contracts.vue";
import Groups from "./pages/Groups.vue";
import Equipment from "./pages/Equipment.vue";
import Works from "./pages/Works.vue";
import CreateUser from "./pages/CreateUser.vue";

const router = createRouter({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/logout',
            name: 'Logout',
            meta: {
                requiresAuth: true
            },
            redirect: to => {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                return {name: 'Login'}
            }
        },
        {
            path: '/reset-pwd',
            name: 'ResetPassword',
            component: ResetPassword,
            meta: {
                guest: true
            }
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/departments',
            name: 'Departments',
            component: Departments,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/projects',
            name: 'Projects',
            component: Projects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/contracts',
            name: 'Contracts',
            component: Contracts,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/groups',
            name: 'Groups',
            component: Groups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/equipment',
            name: 'Equipment',
            component: Equipment,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/works',
            name: 'Works',
            component: Works,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/create-user',
            name: 'CreateUser',
            component: CreateUser,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        }
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let token = localStorage.getItem('token')
        let userData = localStorage.getItem('user')

        if (token == null || userData == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(userData)
            console.log(user)
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                if (user.is_admin === true){
                    next()
                } else {
                    next({ name: 'Index'})
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('token') == null){
            next()
        } else {
            next({ name: 'Dashboard'})
        }
    } else {
        next()
    }
})

createApp(App).use(createPinia()).use(router).mount('#app')
