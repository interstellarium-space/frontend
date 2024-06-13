<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIContractsProfile } from "../../../services/api/contracts/Profile.js";
  import { APIContractsUpdateChief } from "../../../services/api/contracts/update/Chief.js";
  import { APIContractsUpdateGroup } from "../../../services/api/contracts/update/Group.js";
  import { APIContractsUpdateProjects } from "../../../services/api/contracts/update/Projects.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import SelectUser from "../../../components/dashboard/dialogs/SelectUser.vue";
  import SelectGroup from "../../../components/dashboard/dialogs/SelectGroup.vue";
  import SelectProject from "../../../components/dashboard/dialogs/SelectProject.vue";

  export default {
    components: {
      SelectProject,
      SelectGroup,
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
        pageInited: false,
        pageIsReady: false,
        errorMessage: ""
      }
    },

    methods: {
      redirectToGroup(group) {
        this.$router.push({ name: "GroupProfile", params: { groupId: group.id } })
      },

      redirectToUser(user) {
        this.$router.push({ name: "UserProfile", params: { userId: user.id } })
      },

      redirectToProject(project) {
        this.$router.push({ name: "ProjectProfile", params: { projectId: project.id } })
      },

      redirectToWork(work) {
        this.$router.push({ name: "WorkProfile", params: { workId: work.id } })
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

        let response = await APIContractsProfile(this.$route.params.contractId);

        if (response.isOk) {
          this.contract = response.data
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

        let response = await APIContractsUpdateChief(
            this.$route.params.contractId, chiefId
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

      async setGroup(groupId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIContractsUpdateGroup(
            this.$route.params.contractId, groupId
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

      async addProject(projectId) {
        this.pageIsLoading = true
        this.pageIsReady = false

        let response = await APIContractsUpdateProjects(
            this.$route.params.contractId, projectId
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
                Руководитель:
                <a @click="this.redirectToUser(this.contract.chief)" class="interstellarium-unit-link">
                  {{ this.contract.chief.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Руководитель: не назначен
              </div>
              <div v-if="this.contract.chief.id" class="interstellarium-unit-actions mt-3 mt-md-0">
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
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.contract.group.id" class="interstellarium-unit-description">
                Рабочая группа:
                <a @click="this.redirectToGroup(this.contract.group)" class="interstellarium-unit-link">
                  {{ this.contract.group.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Рабочая группа: не назначена
              </div>
              <div v-if="this.contract.group.id" class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" @click="this.setGroup(null)" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Открепить
                </button>
              </div>
              <div v-else class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-group" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  Назначить
                </button>
              </div>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Проекты по контракту
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.contract.projects.length === 0" class="interstellarium-unit-description">
                По контракту не выполняется ни одного проекта
              </div>
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.contract.projects.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-project" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="project in this.contract.projects" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToProject(project)" class="interstellarium-unit-link">
                {{ project.name }}
              </a>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Проектные работы по контракту
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.contract.works.length === 0" class="interstellarium-unit-description">
                По контракту не зарегистрировано ни одной работы
              </div>
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.contract.works.length }}
              </div>
            </div>
            <div v-for="work in this.contract.works" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToWork(work)" class="interstellarium-unit-link">
                {{ work.name }}
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
  <SelectGroup id="select-group" :on-select="this.setGroup"></SelectGroup>
  <SelectProject id="select-project" :on-select="this.addProject"></SelectProject>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
    top: 5rem;
}
</style>
