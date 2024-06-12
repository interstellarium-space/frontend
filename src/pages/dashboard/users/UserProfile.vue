<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIUsersProfile } from "../../../services/api/users/Profile.js";
  import { APIUsersUpdateDepartment } from "../../../services/api/users/update/Department.js";

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
        let response = await APIUsersUpdateDepartment(
            this.$route.params.userId, departmentId
        );

        if (response.isOk) {
          await this.loadData()
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
        }

        console.log(response)
      },

      async addGroup(groupId) {
        console.log('Id:' + groupId)
      },
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
                <a @click="this.redirectToDepartment(this.user.department)" class="interstellarium-intext-link badge text-bg-dark">
                  {{ this.user.department.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Отдел: не назначен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-department" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Рабочие группы
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.user.groups.length === 0" class="interstellarium-unit-description">
                Пользователь не состоит в рабочих группах
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-group" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Участие в контрактах
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.user.contracts_assignments.length === 0" class="interstellarium-unit-description">
                Пользователь не участвовал в контрактах
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Участие в проектах
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.user.projects_assignments.length === 0" class="interstellarium-unit-description">
                Пользователь не участвовал в проектах
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
