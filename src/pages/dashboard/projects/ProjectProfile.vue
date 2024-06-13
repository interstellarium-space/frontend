<script>
  import { getUser, isAdmin } from "../../../services/Auth.js";
  import { APIProjectsProfile } from "../../../services/api/projects/Profile.js";
  import { APIProjectsUpdateChief } from "../../../services/api/projects/update/Chief.js";
  import { APIProjectsUpdateGroup } from "../../../services/api/projects/update/Group.js";
  import { APIProjectsUpdateContracts } from "../../../services/api/projects/update/Contracts.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import SelectUser from "../../../components/dashboard/dialogs/SelectUser.vue";
  import SelectGroup from "../../../components/dashboard/dialogs/SelectGroup.vue";
  import SelectContract from "../../../components/dashboard/dialogs/SelectContract.vue";

  export default {
    components: {
      SelectContract,
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
        project: {
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
          contracts: [],
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

      redirectToContract(contract) {
        this.$router.push({name: "ContractProfile", params: {contractId: contract.id}})
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

        let response = await APIProjectsProfile(this.$route.params.projectId);

        if (response.isOk) {
          this.project = response.data
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

        let response = await APIProjectsUpdateChief(
            this.$route.params.projectId, chiefId
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

        let response = await APIProjectsUpdateGroup(
            this.$route.params.projectId, groupId
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

        let response = await APIProjectsUpdateContracts(
            this.$route.params.projectId, contractId
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
                {{ this.project.name }}
              </div>
            </div>
            <div class="interstellarium-unit-card">
              <div v-if="this.project.start_date" class="interstellarium-unit-description">
                Дата начала: {{ this.project.start_date }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Дата начала: не установлена
              </div>
              <div v-if="this.project.finish_date" class="interstellarium-unit-description">
                Дата завершения: {{ this.project.finish_date }}
              </div>
              <div v-else class="interstellarium-unit-description">
                Дата завершения: не установлена
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.project.chief.id" class="interstellarium-unit-description">
                Руководитель:
                <a @click="this.redirectToUser(this.project.chief)" class="interstellarium-unit-link">
                  {{ this.project.chief.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Руководитель: не назначен
              </div>
              <div v-if="this.project.chief.id" class="interstellarium-unit-actions mt-3 mt-md-0">
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
              <div v-if="this.project.group.id" class="interstellarium-unit-description">
                Рабочая группа:
                <a @click="this.redirectToGroup(this.project.group)" class="interstellarium-unit-link">
                  {{ this.project.group.name }}
                </a>
              </div>
              <div v-else class="interstellarium-unit-description">
                Рабочая группа: не назначена
              </div>
              <div v-if="this.project.group.id" class="interstellarium-unit-actions mt-3 mt-md-0">
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
                Котракты
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.project.contracts.length === 0" class="interstellarium-unit-description">
                К проекту не привязано ни одного контракта
              </div>
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.project.contracts.length }}
              </div>
              <div class="interstellarium-unit-actions mt-3 mt-md-0">
                <button v-show="this.userIsAdmin" data-bs-toggle="modal" data-bs-target="#select-contract" class="btn btn-interstellarium rounded-pill fw-bold px-3">
                  + Добавить
                </button>
              </div>
            </div>
            <div v-for="contract in this.project.contracts" class="interstellarium-unit-actionable-card">
              <a @click="this.redirectToContract(contract)" class="interstellarium-unit-link">
                {{ contract.name }}
              </a>
            </div>
            <div class="mb-2 mt-5">
              <div class="interstellarium-unit-subtitle">
                Проектные работы
              </div>
            </div>
            <div class="interstellarium-unit-actionable-card">
              <div v-if="this.project.works.length === 0" class="interstellarium-unit-description">
                По проекту не зарегистрировано ни одной работы
              </div>
              <div v-else class="interstellarium-unit-description">
                Всего: {{ this.project.works.length }}
              </div>
            </div>
            <div v-for="work in this.project.works" class="interstellarium-unit-actionable-card">
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
  <SelectContract id="select-contract" :on-select="this.addContract"></SelectContract>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
    top: 5rem;
}
</style>
