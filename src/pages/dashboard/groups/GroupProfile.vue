<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIGroupsProfile } from "../../../services/api/groups/Profile.js";
  import { APIGroupsUpdateUsers } from "../../../services/api/groups/update/Users.js";
  import { APIGroupsUpdateContracts } from "../../../services/api/groups/update/Contracts.js";
  import { APIGroupsUpdateProjects } from "../../../services/api/groups/update/Projects.js";
  import { APIGroupsUpdateEquipment } from "../../../services/api/groups/update/Equipment.js";
  import { APIGroupsUpdateWorks } from "../../../services/api/groups/update/Works.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import SelectUser from "../../../components/dashboard/dialogs/SelectUser.vue";
  import SelectWork from "../../../components/dashboard/dialogs/SelectWork.vue";
  import SelectContract from "../../../components/dashboard/dialogs/SelectContract.vue";
  import SelectProject from "../../../components/dashboard/dialogs/SelectProject.vue";
  import SelectEquipment from "../../../components/dashboard/dialogs/SelectEquipment.vue";

  export default {
    components: {
      SelectEquipment,
      SelectProject,
      SelectContract,
      SelectWork,
      SelectUser,
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
        pageInited: false,
        pageIsReady: false,
        errorMessage: ""
      }
    },

    methods: {
      redirectToUser(user) {
        this.$router.push({ name: "UserProfile", params: { userId: user.id } })
      },

      redirectToWork(work) {
        this.$router.push({ name: "WorkProfile", params: { workId: work.id } })
      },

      redirectToContract(contract) {
        this.$router.push({name: "ContractProfile", params: {contractId: contract.id}})
      },

      redirectToProject(project) {
        this.$router.push({ name: "ProjectProfile", params: { projectId: project.id } })
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

        this.pageIsLoading = false
      },

      async addUser(userId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIGroupsUpdateUsers(
            this.$route.params.groupId, userId
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

      async addWork(workId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIGroupsUpdateWorks(
            this.$route.params.groupId, workId
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

      async addContract(contractId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIGroupsUpdateContracts(
            this.$route.params.groupId, contractId
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

      async addProject(projectId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIGroupsUpdateProjects(
            this.$route.params.groupId, projectId
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

      async addEquipment(equipmentId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIGroupsUpdateEquipment(
            this.$route.params.groupId, equipmentId
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
                {{ this.group.name }}
              </div>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Персонал
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.users.length === 0" class="interstellarium-unit-description">
                 В группе никто не состоит
              </div>
              <div v-else class="interstellarium-unit-description">
                Численность: {{ this.group.users.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-user" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="user in this.group.users" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToUser(user)" class="interstellarium-unit-link">
                {{ user.name }}
              </a>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Работы
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.works.length === 0" class="interstellarium-unit-description">
                 За группой не закреплено работ
              </div>
              <div v-else class="interstellarium-unit-description">
                Количество: {{ this.group.works.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-work" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Прикрепить
                </button>
              </div>
            </div>
            <div v-for="work in this.group.works" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToWork(work)" class="interstellarium-unit-link">
                {{ work.name }}
              </a>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Контракты
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.contracts.length === 0" class="interstellarium-unit-description">
                 Группа не работает ни по одному контракту
              </div>
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.group.contracts.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-contract" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="contract in this.group.contracts" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToContract(contract)" class="interstellarium-unit-link">
                {{ contract.name }}
              </a>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Проекты
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.projects.length === 0" class="interstellarium-unit-description">
                 Группа не работает ни по одному проекту
              </div>
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.group.projects.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-project" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="project in this.group.projects" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToProject(project)" class="interstellarium-unit-link">
                {{ project.name }}
              </a>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Оборудование
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.group.equipment.length === 0" class="interstellarium-unit-description">
                Группой не используется оборудование
              </div>
              <div v-else class="interstellarium-unit-description">
                Количество: {{ this.group.equipment.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-equipment" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="equipment in this.group.equipment" class="interstellarium-unit-actionable-card">
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

  <SelectUser id="select-user" :on-select="this.addUser"></SelectUser>
  <SelectWork id="select-work" :on-select="this.addWork"></SelectWork>
  <SelectContract id="select-contract" :on-select="this.addContract"></SelectContract>
  <SelectProject id="select-project" :on-select="this.addProject"></SelectProject>
  <SelectEquipment id="select-equipment" :on-select="this.addEquipment"></SelectEquipment>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
    top: 5rem;
}
</style>
