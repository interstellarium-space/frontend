import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Index from './pages/Index.vue'
import Login from './pages/Login.vue'
import ResetPassword from './pages/ResetPassword.vue'
import Dashboard from './pages/Dashboard.vue'

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
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') === null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
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
