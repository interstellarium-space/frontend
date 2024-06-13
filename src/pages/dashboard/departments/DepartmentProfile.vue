<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIDepartmentsProfile } from "../../../services/api/departments/Profile.js";
  import { APIDepartmentsUpdateChief } from "../../../services/api/departments/update/Chief.js";
  import { APIDepartmentsUpdateUsers } from "../../../services/api/departments/update/Users.js";
  import { APIDepartmentsUpdateEquipment } from "../../../services/api/departments/update/Equipment.js";

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
      redirectToUser(user) {
        this.$router.push({ name: "UserProfile", params: { userId: user.id } })
      },

      redirectToEquipment(equipment) {
        this.$router.push({ name: "EquipmentProfile", params: { equipmentId: equipment.id } })
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
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIDepartmentsUpdateChief(
            this.$route.params.departmentId, chiefId
        );

        if (response.isOk) {
          this.pageIsReady = true
          await this.loadData()
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
          this.errorMessage = response.msg
        }

        console.log(response)
        this.pageIsLoading = false
      },

      async addUser(userId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIDepartmentsUpdateUsers(
            this.$route.params.departmentId, userId
        );

        if (response.isOk) {
          this.pageIsReady = true
          await this.loadData()
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
          this.errorMessage = response.msg
        }

        console.log(response)

        this.pageIsLoading = false
      },

      async addEquipment(equipmentId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIDepartmentsUpdateEquipment(
            this.$route.params.departmentId, equipmentId
        );

        if (response.isOk) {
          this.pageIsReady = true
          await this.loadData()
        } else {
          if (response.code === 401) {
            this.$router.push({name: "AuthLogout"})
          }
          this.errorMessage = response.msg
        }

        console.log(response)

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
                {{ this.department.name }}
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.department.chief.id" class="interstellarium-unit-description">
                Руководитель:
                <a @click="this.redirectToUser(this.department.chief)" class="interstellarium-unit-link">
                  {{ this.department.chief.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Руководитель: не назначен
              </div>
              <div v-if="this.department.chief.id" class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" @click="this.setChief(null)" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Открепить
                </button>
              </div>
              <div v-else class="interstellarium-unit-actions mt-3 mt-md-0">
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
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.department.users.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-user" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Прикрепить
                </button>
              </div>
            </div>
            <div v-for="user in this.department.users" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToUser(user)" class="interstellarium-unit-link">
                {{ user.name }}
              </a>
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
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.department.equipment.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-equipment" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="equipment in this.department.equipment" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToEquipment(equipment)" class="interstellarium-unit-link">
                {{ equipment.name }}
              </a>
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
