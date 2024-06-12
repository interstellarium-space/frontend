<script>
  import { useProjectsStore } from "../../../stores/dashboard/Projects.js";
  import { APIProjectsGet } from "../../../services/api/projects/Get.js";

  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";

  import Search from "../../../components/dashboard/forms/Search.vue";
  import CreateUnit from "../../../components/dashboard/buttons/CreateUnit.vue";

  export default {
    components: {
      CreateUnit,
      Search,
      Main,
      Sidebar,
      Header,
      Footer
    },

    setup() {
      document.title = "Проекты | Interstellarium"
      const store = useProjectsStore()
      return { store }
    },

    data() {
      return {
        searchIsInProgress: false,
        seacrhMessage: ""
      }
    },

    methods: {
      redirectToProject(project) {
        this.$router.push({ name: "ProjectProfile", params: { projectId: project.id } })
      },

      searchFormIsValid() {
        if (this.store.filters.name === "") {
          this.store.filters.name = null
        }
        if (this.store.filters.startDate === "") {
          this.store.filters.startDate = null
        }
        if (this.store.filters.finishDate === "") {
          this.store.filters.finishDate = null
        }
        return true
      },

      async searchProjects() {
        if (this.searchFormIsValid()) {
          this.searchIsInProgress = true
          this.store.projects = []
          this.seacrhMessage = ""

          let response = await APIProjectsGet(this.store.filters)

          if (response.isOk) {
            this.store.projects = response.data
          } else {
            this.seacrhMessage = response.msg

            if (response.code === 401) {
              this.$router.push({ name: "AuthLogout" })
            }
          }

          this.searchIsInProgress = false
        }
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
        <template v-slot:tools>
          <Search>
            <template v-slot:search>
              <div class="col-5 col-sm-8 col-lg-9 my-1 px-1 px-sm-2">
                <input v-model="store.filters.name" type="text"
                    class="form-control"
                    placeholder="Название проекта"
                >
              </div>
              <div class="col-4 col-sm-2 my-1 px-1 px-sm-2">
                <input @click="this.searchProjects()" type="submit"
                    class="form-control btn btn-interstellarium"
                    value="Поиск"
                >
              </div>
            </template>

            <template v-slot:filters>
              <div class="col-6 my-1 px-1 px-sm-2">
                <input v-model="this.store.filters.startDate" type="text"
                    class="form-control"
                    placeholder="Начат после"
                    onfocus="this.type='date'"
                >
              </div>
              <div class="col-6 my-1 px-1 px-sm-2">
                <input v-model="this.store.filters.finishDate" type="text"
                    class="form-control"
                    placeholder="Закончен до"
                    onfocus="this.type='date'"
                >
              </div>
            </template>
          </Search>
        </template>

        <template v-slot:content>
          <div v-show="this.searchIsInProgress" class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-show="this.seacrhMessage" class="interstellarium-error text-danger text-center">
            {{ this.seacrhMessage }}
          </div>
          <div v-for="project in this.store.projects" class="interstellarium-unit-card">
            <a @click="this.redirectToProject(project)" class="interstellarium-unit-link">
              {{ project.name }}
            </a>
            <div v-if="project.chief.id" class="interstellarium-unit-description">
              Руководитель: {{ project.chief.name }}
            </div>
            <div v-else class="interstellarium-unit-description">
              Руководитель: не назначен
            </div>
            <div v-if="project.group.id"
                 class="interstellarium-unit-description">
              Рабочая группа: {{ project.group.name }}
            </div>
            <div v-else class="interstellarium-unit-description">
              Рабочая группа: не назначена
            </div>
            <div v-if="project.start_date"
                 class="interstellarium-unit-description">
              Дата начала: {{ project.start_date }}
            </div>
            <div v-else class="interstellarium-unit-description">
              Дата начала: не установлена
            </div>
            <div v-if="project.finish_date"
                 class="interstellarium-unit-description">
              Дата завершения: {{ project.finish_date }}
            </div>
            <div v-else class="interstellarium-unit-description">
              Дата завершения: не установлена
            </div>
          </div>
        </template>
      </Main>

      <Footer>
        <template v-slot:tools>
          <CreateUnit unit-class-name="Project"></CreateUnit>
        </template>
      </Footer>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
