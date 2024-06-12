<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIContractsProfile } from "../../../services/api/contracts/Profile.js";

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
        contract: {
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
          projects: [],
          works: [],
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

          let response = await APIContractsProfile(this.$route.params.contractId);

          if (response.isOk) {
            this.contract = response.data
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
                {{ this.contract.name }}
              </div>
            </div>
            <div class="interstellarium-unit-card">
              <div v-if="this.contract.start_date" class="interstellarium-unit-description">
                Дата начала: {{ this.contract.start_date }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Дата начала: не установлена
              </div>
              <div v-if="this.contract.finish_date" class="interstellarium-unit-description">
                Дата завершения: {{ this.contract.finish_date }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Дата завершения: не установлена
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.contract.chief.id" class="interstellarium-unit-description">
                Начальник: {{ this.contract.chief.name }}
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
              <div v-if="this.contract.group.id" class="interstellarium-unit-description">
                Рабочая группа: {{ this.contract.group.name }}
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
                Проекты по контракту
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.contract.projects.length === 0" class="interstellarium-unit-description">
                По контракту не выполняется ни одного проекта
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#add-project" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Проектные работы по контракту
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.contract.works.length === 0" class="interstellarium-unit-description">
                По контракту не зарегистрировано ни одной работы
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

  <Dialog id="choose-chief"></Dialog>
  <Dialog id="choose-group"></Dialog>
  <Dialog id="add-project"></Dialog>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}
</style>
