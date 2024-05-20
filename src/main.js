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
            component: Login
        },
        {
            path: '/reset-pwd',
            name: 'ResetPassword',
            component: ResetPassword
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
    ],
    history: createWebHistory()
})
createApp(App).use(createPinia()).use(router).mount('#app')
