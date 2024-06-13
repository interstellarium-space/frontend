<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIUsersProfile } from "../../../services/api/users/Profile.js";
  import { APIUsersUpdateDepartment } from "../../../services/api/users/update/Department.js";
  import { APIUsersUpdateGroups } from "../../../services/api/users/update/Groups.js";
  import { APIUsersDeleteGroup } from "../../../services/api/users/delete/Group.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import Dialog from "../../../components/dashboard/Dialog.vue";
  import SelectDepartment from "../../../components/dashboard/dialogs/SelectDepartment.vue";
  import SelectGroup from "../../../components/dashboard/dialogs/SelectGroup.vue";

  export default {
    components: {
      SelectGroup,
      SelectDepartment,
      Dialog,
      Main,
      Sidebar,
      Header,
      Footer
    },

    setup() {
      document.title = "Interstellarium"
      let userIsAdmin = isAdmin(getUser())
      return {userIsAdmin}
    },

    data() {
      return {
        user: {
          id: 0,
          name: "",
          birthdate: null,
          is_admin: null,
          department: {
            id: 0,
            name: "",
          },
          groups: [],
          projects_assignments: [],
          contracts_assignments: [],
        },
        pageIsLoading: false,
        pageInited: false,
        pageIsReady: false,
        errorMessage: ""
      }
    },

    methods: {
      redirectToDepartment(department) {
        this.$router.push({ name: "DepartmentProfile", params: { departmentId: department.id } })
      },

      redirectToGroup(group) {
        this.$router.push({ name: "GroupProfile", params: { groupId: group.id } })
      },

      async autoload() {
        if (!this.pageInited) {
          this.pageInited = true
          return await this.loadData()
        }
        return false
      },

      async loadData() {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIUsersProfile(this.$route.params.userId);

        if (response.isOk) {
          this.user = response.data
          this.pageIsReady = true
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
          this.errorMessage = response.msg
        }

        console.log(response)

        this.pageIsLoading = false
      },

      async setDepartment(departmentId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIUsersUpdateDepartment(
            this.$route.params.userId, departmentId
        );

        if (response.isOk) {
          await this.loadData()
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
          this.errorMessage = response.msg
        }

        console.log(response)

        this.pageIsLoading = false
      },

      async addGroup(groupId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIUsersUpdateGroups(
            this.$route.params.userId, groupId
        );

        if (response.isOk) {
          await this.loadData()
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
          this.errorMessage = response.msg
        }

        console.log(response)

        this.pageIsLoading = false
      },

      async removeGroup(groupId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIUsersDeleteGroup(
            this.$route.params.userId, groupId
        );

        if (response.isOk) {
          await this.loadData()
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
          this.errorMessage = response.msg
        }

        console.log(response)

        this.pageIsLoading = false
      }
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <Header></Header>
      <Sidebar></Sidebar>

      <Main>
        <template v-slot:tools></template>

        <template v-slot:content>
          <div v-show="this.pageIsLoading" class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div v-if="this.autoload()"></div>

          <div v-if="this.pageIsReady" class="interstellarium-content-wrapper">
            <div class="interstellarium-unit-card">
              <div class="interstellarium-unit-title">
                {{ this.user.name }}
              </div>
            </div>
            <div class="interstellarium-unit-card">
              <div v-if="this.user.birthdate" class="interstellarium-unit-description">
                Дата рождения: {{ this.user.birthdate }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Дата рождения: не указана
              </div>
            </div>
            <div class="interstellarium-unit-card">
              <div v-if="this.user.is_admin" class="interstellarium-unit-description">
                Права доступа: <span class="badge text-bg-success">администратор</span>
              </div>
              <div v-else class="interstellarium-unit-description">
                Права доступа: <span class="badge text-bg-secondary">пользователь</span>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.user.department.id" class="interstellarium-unit-description">
                Отдел:
                <a @click="this.redirectToDepartment(this.user.department)" class="interstellarium-unit-link">
                  {{ this.user.department.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Отдел: не назначен
              </div>
              <div v-if="this.user.department.id" class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" @click="this.setDepartment(null)" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Открепить
                </button>
              </div>
              <div v-else class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-department" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
                </button>
              </div>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Рабочие группы
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.user.groups.length === 0" class="interstellarium-unit-description">
                Пользователь не состоит в рабочих группах
              </div>
              <div v-else class="interstellarium-unit-description">
                Всего групп: {{ this.user.groups.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-group" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="group in this.user.groups" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToGroup(group)" class="interstellarium-unit-link">
                {{ group.name }}
              </a>
              <button v-show="this.userIsAdmin" @click="this.removeGroup(group.id)" class="btn btn-interstellarium-danger rounded-pill fw-bold px-3">
                Исключить
              </button>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                История участия в контрактах
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.user.contracts_assignments.length === 0" class="interstellarium-unit-description">
                Пользователь не участвовал в контрактах
              </div>
              <div v-else class="interstellarium-unit-description">
                Записей всего: {{ this.user.contracts_assignments.length }}
              </div>
            </div>
            <div v-for="(assignment, index) in this.user.contracts_assignments " class="interstellarium-unit-card">
              <div class="row">
                <div class="col-1 px-1 text-center interstellarium-assignment-note">
                  #{{ this.user.contracts_assignments.length - index }}
                </div>
                <div class="col-4 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.contract.name }}
                </div>
                <div class="col-4 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.assignment_date }}
                </div>
                <div v-if="assignment.is_assigned" class="col-3 px-1 text-center text-success interstellarium-assignment-note">
                  Joined
                </div>
                <div v-else class="col-3 px-1 text-center text-danger interstellarium-assignment-note">
                  Left
                </div>
              </div>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                История участия в проектах
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.user.projects_assignments.length === 0" class="interstellarium-unit-description">
                Пользователь не участвовал в проектах
              </div>
              <div v-else class="interstellarium-unit-description">
                Записей всего: {{ this.user.projects_assignments.length }}
              </div>
            </div>
            <div v-for="(assignment, index) in this.user.projects_assignments " class="interstellarium-unit-card">
              <div class="row">
                <div class="col-1 px-1 text-center interstellarium-assignment-note">
                  #{{ this.user.projects_assignments.length - index }}
                </div>
                <div class="col-4 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.project.name }}
                </div>
                <div class="col-4 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.assignment_date }}
                </div>
                <div v-if="assignment.is_assigned" class="col-3 px-1 text-center text-success interstellarium-assignment-note">
                  Joined
                </div>
                <div v-else class="col-3 px-1 text-center text-danger interstellarium-assignment-note">
                  Left
                </div>
              </div>
            </div>
          </div>
          <div v-else class="interstellarium-content-wrapper">
            <div v-show="this.errorMessage" class="interstellarium-error text-danger text-center">
              {{ this.errorMessage }}
            </div>
          </div>
        </template>
      </Main>

      <Footer>
        <template v-slot:tools></template>
      </Footer>
    </div>
  </div>

  <SelectDepartment id="select-department" :on-select="this.setDepartment"></SelectDepartment>
  <SelectGroup id="select-group" :on-select="this.addGroup"></SelectGroup>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}
</style>
