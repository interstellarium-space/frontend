<script>
  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";

  import { getUser, isAdmin } from "../../../services/Auth.js";

  import {APIWorksProfile} from "../../../services/api/works/Profile.js";

  export default {
    components: {
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

          let response = await APIWorksProfile(this.$route.params.workId);

          if (response.isOk) {
            this.work = response.data
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
                Контракт: {{ this.work.contract.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Контракт: не присвоен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Выбрать
                </button>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.work.project.id" class="interstellarium-unit-description">
                Проект: {{ this.work.project.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Проект: не присвоен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Выбрать
                </button>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.work.executor.id" class="interstellarium-unit-description">
                Исполнитель: {{ this.work.executor.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Исполнитель: не назначен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
                </button>
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
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}

.interstellarium-unit-title {
  font-family: var(--interstellarium-work-font-family), sans-serif;
  color: var(--interstellarium-dark);
  font-size: 1.5rem;
}

.interstellarium-unit-subtitle {
  font-family: var(--interstellarium-work-font-family), sans-serif;
  color: var(--interstellarium-dark);
  font-size: 1.1rem;
}

</style>
