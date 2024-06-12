<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIEquipmentProfile } from "../../../services/api/equipment/Profile.js";

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
        equipment: {
          id: 0,
          name: "",
          department: {
            id: 0,
            name: "",
          },
          group: {
            id: 0,
            name: "",
          },
          departments_assignments: [],
          groups_assignments: [],
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

          let response = await APIEquipmentProfile(this.$route.params.equipmentId);

          if (response.isOk) {
            this.equipment = response.data
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
                {{ this.equipment.name }}
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.equipment.department.id" class="interstellarium-unit-description">
                Отдел: {{ this.equipment.department.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Коллективная собственность
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-department" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Изменить
                </button>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.equipment.group.id" class="interstellarium-unit-description">
                Рабочая группа: {{ this.equipment.group.name }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Рабочая группа: не указана
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#choose-group" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Изменить
                </button>
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                История передач отделам
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.equipment.departments_assignments.length === 0" class="interstellarium-unit-description">
                История пуста
              </div>
            </div>
            <div class="mb-3">
              <div class="interstellarium-unit-subtitle">
                История передач группам
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.equipment.groups_assignments.length === 0" class="interstellarium-unit-description">
                История пуста
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
  <Dialog id="choose-group"></Dialog>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
  top: 5rem;
}
</style>
