<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIDepartmentsProfile } from "../../../services/api/departments/Profile.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import SelectUser from "../../../components/dashboard/dialogs/SelectUser.vue";
  import SelectEquipment from "../../../components/dashboard/dialogs/SelectEquipment.vue";

  export default {
    components: {
      SelectEquipment,
      SelectUser,
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
        pageInited: false,
        pageIsReady: false,
        errorMessage: ""
      }
    },

    methods : {
      async autoload() {
        if (!this.pageInited) {
          this.pageInited = true
          return await this.loadData()
        }
        return false
      },

      async loadData() {
        this.pageIsLoading = true

        let response = await APIDepartmentsProfile(this.$route.params.departmentId);

        if (response.isOk) {
          this.department = response.data
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

      async setChief(chiefId) {
        console.log('Id:' + chiefId)
      },

      async addUser(userId) {
        console.log('Id:' + userId)
      },

      async addEquipment(equipmentId) {
        console.log('Id:' + equipmentId)
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
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-chief" class="btn btn-interstellarium rounded-pill fw-bold px-3">
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
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-user" class="btn btn-interstellarium rounded-pill fw-bold px-3">
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
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-equipment" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
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

  <SelectUser id="select-chief" :on-select="this.setChief"></SelectUser>
  <SelectUser id="select-user" :on-select="this.addUser"></SelectUser>
  <SelectEquipment id="select-equipment" :on-select="this.addEquipment"></SelectEquipment>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
    top: 5rem;
}
</style>
