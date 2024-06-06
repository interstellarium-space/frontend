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
import UserProfile from "./pages/dashboard/users/UserProfile.vue";
import Groups from "./pages/dashboard/groups/Groups.vue";
import CreateGroup from "./pages/dashboard/groups/CreateGroup.vue";
import GroupProfile from "./pages/dashboard/groups/GroupProfile.vue";
import Works from "./pages/dashboard/works/Works.vue";
import CreateWork from "./pages/dashboard/works/CreateWork.vue";
import WorkProfile from "./pages/dashboard/works/WorkProfile.vue";
import Equipment from "./pages/dashboard/equipment/Equipment.vue";
import CreateEquipment from "./pages/dashboard/equipment/CreateEquipment.vue";
import EquipmentProfile from "./pages/dashboard/equipment/EquipmentProfile.vue";
import Departments from "./pages/dashboard/departments/Departments.vue";
import CreateDepartment from "./pages/dashboard/departments/CreateDepartment.vue";
import DepartmentProfile from "./pages/dashboard/departments/DepartmentProfile.vue";
import Projects from "./pages/dashboard/projects/Projects.vue";
import CreateProject from "./pages/dashboard/projects/CreateProject.vue";
import ProjectProfile from "./pages/dashboard/projects/ProjectProfile.vue";

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
        {
            path: "/dashboard/users/:userId",
            name: "UserProfile",
            component: UserProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/groups",
            name: "Groups",
            component: Groups,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/groups/create",
            name: "CreateGroup",
            component: CreateGroup,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/dashboard/groups/:groupId",
            name: "GroupProfile",
            component: GroupProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/works",
            name: "Works",
            component: Works,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/works/create",
            name: "CreateWork",
            component: CreateWork,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/dashboard/works/:workId",
            name: "WorkProfile",
            component: WorkProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/equipment",
            name: "Equipment",
            component: Equipment,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/equipment/create",
            name: "CreateEquipment",
            component: CreateEquipment,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/dashboard/equipment/:equipmentId",
            name: "EquipmentProfile",
            component: EquipmentProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/departments",
            name: "Departments",
            component: Departments,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/departments/create",
            name: "CreateDepartment",
            component: CreateDepartment,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/dashboard/departments/:departmentId",
            name: "DepartmentProfile",
            component: DepartmentProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/projects",
            name: "Projects",
            component: Projects,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dashboard/projects/create",
            name: "CreateProject",
            component: CreateProject,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },
        {
            path: "/dashboard/projects/:projectId",
            name: "ProjectProfile",
            component: ProjectProfile,
            meta: {
                requiresAuth: true
            }
        },
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
