<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIProjectsProfile } from "../../../services/api/projects/Profile.js";

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
        project: {
          id: 0,
          name: "",
          start_date: null,
          finish_date: null,
          chief: {
            id: 0,
            name: "",
          },
          group: {
            id: 0,
            name: "",
          },
          contracts: [],
          works: [],
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

          let response = await APIProjectsProfile(this.$route.params.projectId);

          if (response.isOk) {
            this.project = response.data
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
                {{ this.project.name }}
              </div>
            </div>
            <div class="interstellarium-unit-card">
              <div v-if="this.project.start_date" class="interstellarium-unit-description">
                Дата начала: {{ this.project.start_date }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Дата начала: не установлена
              </div>
              <div v-if="this.project.finish_date" class="interstellarium-unit-description">
                Дата завершения: {{ this.project.finish_date }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Дата завершения: не установлена
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.project.chief.id" class="interstellarium-unit-description">
                Начальник: {{ this.project.chief.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Начальник: не назначен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-chief" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
                </button>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.project.group.id" class="interstellarium-unit-description">
                Рабочая группа: {{ this.project.group.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Рабочая группа: не назначена
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-group" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Котракты
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.project.contracts.length === 0" class="interstellarium-unit-description">
                К проекту не привязано ни одного контракта
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-contract" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Проектные работы
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.project.works.length === 0" class="interstellarium-unit-description">
                По проекту не зарегистрировано ни одной работы
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

  <Dialog id="choose-chief"></Dialog>
  <Dialog id="choose-group"></Dialog>
  <Dialog id="add-contract"></Dialog>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}
</style>
