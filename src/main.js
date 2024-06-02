import { createApp } from "vue"
import { createPinia } from "pinia"
import { createRouter, createWebHistory } from "vue-router"

import { logout, getUser, getToken, isAdmin } from "./services/Auth.js";

import App from "./App.vue";
import Index from "./pages/Index.vue";
import AuthLogin from "./pages/auth/Login.vue";
import AuthResetPassword from "./pages/auth/ResetPassword.vue";
import Dashboard from "./pages/dashboard/Dashboard.vue";
import Users from "./pages/dashboard/users/Users.vue";
import CreateUser from "./pages/dashboard/users/CreateUser.vue";
/*
import Departments from "./pages/departments/Departments.vue";
import Projects from "./pages/projects/Projects.vue";
import Contracts from "./pages/contracts/Contracts.vue";
import Groups from "./pages/groups/Groups.vue";
import Equipment from "./pages/equipment/Equipment.vue";
import Works from "./pages/works/Works.vue";
import CreateUser from "./pages/users/CreateUser.vue";
import CreateDepartment from "./pages/departments/CreateDepartment.vue";
import CreateContract from "./pages/contracts/CreateContract.vue";
import CreateProject from "./pages/projects/CreateProject.vue";
import CreateEquipment from "./pages/equipment/CreateEquipment.vue";
import CreateGroup from "./pages/groups/CreateGroup.vue";
import CreateWork from "./pages/works/CreateWork.vue";
*/

const router = createRouter({
    routes: [
        {
            path: "/",
            name: "Index",
            component: Index
        },
        {
            path: "/auth/login",
            name: "AuthLogin",
            component: AuthLogin,
            meta: {
                guest: true
            }
        },
        {
            path: "/auth/logout",
            name: "AuthLogout",
            meta: {
                requiresAuth: true
            },
            redirect: to => {
                logout()
                return {
                    name: "AuthLogin"
                }
            }
        },
        {
            path: "/auth/reset-password",
            name: "AuthResetPassword",
            component: AuthResetPassword,
            meta: {
                guest: true
            }
        },

        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/users",
            name: "Users",
            component: Users,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/users/create",
            name: "CreateUser",
            component: CreateUser,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        /*
        {
            path: "/departments",
            name: "Departments",
            component: Departments,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/projects",
            name: "Projects",
            component: Projects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/contracts",
            name: "Contracts",
            component: Contracts,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/groups",
            name: "Groups",
            component: Groups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/equipment",
            name: "Equipment",
            component: Equipment,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/works",
            name: "Works",
            component: Works,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/departments/create",
            name: "CreateDepartment",
            component: CreateDepartment,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/contracts/create",
            name: "CreateContract",
            component: CreateContract,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/projects/create",
            name: "CreateProject",
            component: CreateProject,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/equipment/create",
            name: "CreateEquipment",
            component: CreateEquipment,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/group/create",
            name: "CreateGroup",
            component: CreateGroup,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/work/create",
            name: "CreateWork",
            component: CreateWork,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },*/
    ],
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        let token = getToken()
        let user = getUser()

        if (token == null || user == null) {
            next({
                name: "AuthLogin",
                params: {
                    nextUrl: to.fullPath
                }
            })
        } else {
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                if (isAdmin(user) === true){
                    next()
                } else {
                    next({ name: "Dashboard"})
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (getToken() == null){
            next()
        } else {
            next({ name: "Dashboard"})
        }
    } else {
        next()
    }
})

createApp(App).use(createPinia()).use(router).mount("#app")
