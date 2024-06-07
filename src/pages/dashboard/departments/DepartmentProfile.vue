<script>
  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";

  import { getUser, isAdmin } from "../../../services/Auth.js";

  import { APIDepartmentsProfile } from "../../../services/api/departments/Profile.js";

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
      return { userIsAdmin }
    },

    data() {
      return {
        department: {
          id: 0,
          name: "",
          chief: {
            id: 0,
            name: "",
          },
          users: [],
          equipment: []
        },
        pageIsLoading: false,
        pageInitIsStarted: false,
        pageIsReady: false
      }
    },

    methods : {
      async autoload() {
        if (!this.pageInitIsStarted)
          return await this.loadData()
        return false
      },

      async loadData() {
        this.pageIsLoading = true

        if (!this.pageInitIsStarted) {
          this.pageInitIsStarted = true

          let response = await APIDepartmentsProfile(this.$route.params.departmentId);

          if (response.isOk) {
            this.department = response.data
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
                {{ this.department.name }}
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.department.chief.id" class="interstellarium-unit-description">
                Начальник: {{ this.department.chief.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Начальник: не назначен
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Персонал
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.department.users.length === 0" class="interstellarium-unit-description">
                В отделе не числится ни один пользователь
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Прикрепить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                Оборудование
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.department.equipment.length === 0" class="interstellarium-unit-description">
                За отделом не закреплено оборудование
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
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
