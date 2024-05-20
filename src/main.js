import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const router = createRouter({
    routes: [],
    history: createWebHistory()
})
createApp(App).use(createPinia()).use(router).mount('#app')
