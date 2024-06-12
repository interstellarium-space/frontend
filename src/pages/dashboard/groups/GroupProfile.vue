<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIGroupsProfile } from "../../../services/api/groups/Profile.js";

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
        group: {
          id: 0,
          name: "",
          users: [],
          works: [],
          contracts: [],
          projects: [],
          equipment: [],
        },
        pageIsLoading: false,
        pageInitIsStarted: false,
        pageIsReady: false,
        errorMessage: ""
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

          let response = await APIGroupsProfile(this.$route.params.groupId);

          if (response.isOk) {
            this.group = response.data
            this.pageIsReady = true
          } else {
            if (response.code === 401) {
              this.$router.push({name: "AuthLogout"})
            }
            this.errorMessage = response.msg
          }

          console.log(response)
        }

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
                {{ this.group.name }}
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Персонал
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.users.length === 0" class="interstellarium-unit-description">
                 В группе никто не состоит
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-user" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Работы
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.works.length === 0" class="interstellarium-unit-description">
                 За группой не закреплено работ
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-work" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Прикрепить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Контракты
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.contracts.length === 0" class="interstellarium-unit-description">
                 Группа не работает ни по одному контракту
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-contract" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Проекты
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.projects.length === 0" class="interstellarium-unit-description">
                 Группа не работает ни по одному проекту
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-project" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Оборудование
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.equipment.length === 0" class="interstellarium-unit-description">
                 Группой не используется оборудование
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-equipment" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
          </div>
          <div v-else class="interstellarium-content-wrapper">
            <div v-show="this.errorMessage" class="text-danger text-center">
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

  <Dialog id="add-user"></Dialog>
  <Dialog id="add-work"></Dialog>
  <Dialog id="add-contract"></Dialog>
  <Dialog id="add-project"></Dialog>
  <Dialog id="add-equipment"></Dialog>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}
</style>
