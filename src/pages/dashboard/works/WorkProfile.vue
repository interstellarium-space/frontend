<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIWorksProfile } from "../../../services/api/works/Profile.js";

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
        work: {
          id: 0,
          name: "",
          cost: 0,
          contract: {
            id: 0,
            name: "",
          },
          project: {
            id: 0,
            name: "",
          },
          executor: {
            id: 0,
            name: "",
          },
        },
        pageIsLoading: false,
        pageInitIsStarted: false,
        pageIsReady: false,
        errorMessage: ""
      }
    },

    methods: {
      redirectToContract(contract) {
        this.$router.push({ name: "ContractProfile", params: { contractId: contract.id } })
      },

      redirectToProject(project) {
        this.$router.push({ name: "ProjectProfile", params: { projectId: project.id } })
      },

      redirectToExecutor(executor) {
        this.$router.push({ name: "GroupProfile", params: { groupId: executor.id } })
      },

      async autoload() {
        if (!this.pageInitIsStarted)
          return await this.loadData()
        return false
      },

      async loadData() {
        this.pageIsLoading = true

        if (!this.pageInitIsStarted) {
          this.pageInitIsStarted = true

          let response = await APIWorksProfile(this.$route.params.workId);

          if (response.isOk) {
            this.work = response.data
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
                {{ this.work.name }}
              </div>
            </div>
            <div class="interstellarium-unit-card">
              <div v-if="this.work.cost != null" class="interstellarium-unit-description">
                Стоимость: {{ this.work.cost }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Стоимость: не указана
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.work.contract.id" class="interstellarium-unit-description">
                Контракт:
                <a @click="this.redirectToContract(this.work.contract)" class="interstellarium-unit-link">
                  {{ this.work.contract.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Контракт: не присвоен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-contract" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Выбрать
                </button>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.work.project.id" class="interstellarium-unit-description">
                Проект:
                <a @click="this.redirectToProject(this.work.project)" class="interstellarium-unit-link">
                  {{ this.work.project.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Проект: не присвоен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-project" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Выбрать
                </button>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.work.executor.id" class="interstellarium-unit-description">
                Исполнитель:
                <a @click="this.redirectToExecutor(this.work.executor)" class="interstellarium-unit-link">
                  {{ this.work.executor.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Исполнитель: не назначен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-executor" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
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

  <Dialog id="choose-contract"></Dialog>
  <Dialog id="choose-project"></Dialog>
  <Dialog id="choose-executor"></Dialog>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}
</style>
