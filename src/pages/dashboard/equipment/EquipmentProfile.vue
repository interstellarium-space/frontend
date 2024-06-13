<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIEquipmentProfile } from "../../../services/api/equipment/Profile.js";
  import { APIEquipmentUpdateDepartment } from "../../../services/api/equipment/update/Department.js";
  import { APIEquipmentUpdateGroup } from "../../../services/api/equipment/update/Group.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import SelectDepartment from "../../../components/dashboard/dialogs/SelectDepartment.vue";
  import SelectGroup from "../../../components/dashboard/dialogs/SelectGroup.vue";

  export default {
    components: {
      SelectGroup,
      SelectDepartment,
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
        pageInited: false,
        pageIsReady: false,
        errorMessage: ""
      }
    },

    methods: {
      redirectToDepartment(department) {
        this.$router.push({ name: "DepartmentProfile", params: { departmentId: department.id } })
      },

      redirectToGroup(group) {
        this.$router.push({ name: "GroupProfile", params: { groupId: group.id } })
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

        let response = await APIEquipmentProfile(this.$route.params.equipmentId);

        if (response.isOk) {
          this.equipment = response.data
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

      async setDepartment(departmentId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIEquipmentUpdateDepartment(
            this.$route.params.equipmentId, departmentId
        );

        if (response.isOk) {
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

      async setGroup(groupId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIEquipmentUpdateGroup(
            this.$route.params.equipmentId, groupId
        );

        if (response.isOk) {
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
                {{ this.equipment.name }}
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.equipment.department.id" class="interstellarium-unit-description">
                Отдел:
                <a @click="this.redirectToDepartment(this.equipment.department)" class="interstellarium-unit-link">
                  {{ this.equipment.department.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Коллективная собственность
              </div>
              <div v-if="this.equipment.department.id" class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" @click="this.setDepartment(null)" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Открепить
                </button>
              </div>
              <div v-else class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-department" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Изменить
                </button>
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.equipment.group.id" class="interstellarium-unit-description">
                Рабочая группа:
                <a @click="this.redirectToGroup(this.equipment.group)" class="interstellarium-unit-link">
                  {{ this.equipment.group.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Рабочая группа: не указана
              </div>
              <div v-if="this.equipment.group.id" class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" @click="this.setGroup(null)" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Открепить
                </button>
              </div>
              <div v-else class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-group" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Изменить
                </button>
              </div>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                История передач отделам
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.equipment.departments_assignments.length === 0" class="interstellarium-unit-description">
                История пуста
              </div>
              <div v-else class="interstellarium-unit-description">
                Записей всего: {{ this.equipment.departments_assignments.length }}
              </div>
            </div>
            <div v-for="(assignment, index) in this.equipment.departments_assignments" class="interstellarium-unit-card">
              <div class="row">
                <div class="col-1 px-1 text-center interstellarium-assignment-note">
                  #{{ this.equipment.departments_assignments.length - index }}
                </div>
                <div class="col-3 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.department.name }}
                </div>
                <div class="col-4 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.assignment_date }}
                </div>
                <div v-if="assignment.is_assigned" class="col-3 px-1 text-center text-success interstellarium-assignment-note">
                  Assigned
                </div>
                <div v-else class="col-3 px-1 text-center text-danger interstellarium-assignment-note">
                  Unassinged
                </div>
              </div>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                История передач группам
              </div>
            </div>
            <div class="interstellarium-unit-card">
              <div v-if="this.equipment.groups_assignments.length === 0" class="interstellarium-unit-description">
                История пуста
              </div>
              <div v-else class="interstellarium-unit-description">
                Записей всего: {{ this.equipment.groups_assignments.length }}
              </div>
            </div>
            <div v-for="(assignment, index) in this.equipment.groups_assignments " class="interstellarium-unit-card">
              <div class="row">
                <div class="col-1 px-1 text-center interstellarium-assignment-note">
                  #{{ this.equipment.groups_assignments.length - index }}
                </div>
                <div class="col-4 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.group.name }}
                </div>
                <div class="col-4 px-1 text-center interstellarium-assignment-note">
                  {{ assignment.assignment_date }}
                </div>
                <div v-if="assignment.is_assigned" class="col-3 px-1 text-center text-success interstellarium-assignment-note">
                  Assigned
                </div>
                <div v-else class="col-3 px-1 text-center text-danger interstellarium-assignment-note">
                  Unassinged
                </div>
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

  <SelectDepartment id="select-department" :on-select="this.setDepartment"></SelectDepartment>
  <SelectGroup id="select-group" :on-select="this.setGroup"></SelectGroup>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
    top: 5rem;
}
</style>
