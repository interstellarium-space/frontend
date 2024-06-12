<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIUsersProfile } from "../../../services/api/users/Profile.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import Dialog from "../../../components/dashboard/Dialog.vue";

  export default {
    components: {
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
        pageInitIsStarted: false,
        pageIsReady: false
      }
    },

    methods: {
      async autoload() {
        if (!this.pageInitIsStarted)
          return await this.loadData()
        return false
      },

      async loadData() {
        this.pageIsLoading = true

        if (!this.pageInitIsStarted) {
          this.pageInitIsStarted = true

          let response = await APIUsersProfile(this.$route.params.userId);

          if (response.isOk) {
            this.user = response.data
          } else {
            if (response.code === 401) {
              this.$router.push({name: "AuthLogout"})
            }
          }

          console.log(response)
        }

        this.pageIsLoading = false
        this.pageIsReady = true
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
                Отдел: {{ this.user.department.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Отдел: не назначен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-department" class="btn btn-interstellarium rounded-pill fw-bold px-3">
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
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-group" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить в группу
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
        </template>
      </Main>

      <Footer>
        <template v-slot:tools></template>
      </Footer>
    </div>
  </div>

  <Dialog id="choose-department"></Dialog>
  <Dialog id="add-group"></Dialog>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}
</style>
