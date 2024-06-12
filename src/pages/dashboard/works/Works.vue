<script>
  import { useWorksStore } from "../../../stores/dashboard/Works.js";
  import { APIWorksGet } from "../../../services/api/works/Get.js";

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
      document.title = "Работы | Interstellarium"
      const store = useWorksStore()
      return { store }
    },

    data() {
      return {
        searchIsInProgress: false,
        seacrhMessage: ""
      }
    },

    methods: {
      redirectToWork(work) {
        this.$router.push({ name: "WorkProfile", params: { workId: work.id } })
      },

      searchFormIsValid() {
        if (this.store.filters.name === "") {
          this.store.filters.name = null
        }
        if (this.store.filters.minCost === "") {
          this.store.filters.minCost = null
        }
        if (this.store.filters.maxCost === "") {
          this.store.filters.maxCost = null
        }
        return true
      },

      async searchWorks() {
        if (this.searchFormIsValid()) {
          this.searchIsInProgress = true
          this.store.works = []
          this.seacrhMessage = ""

          let response = await APIWorksGet(this.store.filters)

          if (response.isOk) {
            this.store.works = response.data
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
                    placeholder="Название работы"
                >
              </div>
              <div class="col-4 col-sm-2 my-1 px-1 px-sm-2">
                <input @click="this.searchWorks()" type="submit"
                    class="form-control btn btn-interstellarium"
                    value="Поиск"
                >
              </div>
            </template>

            <template v-slot:filters>
              <div class="col-6 my-1 px-1 px-sm-2">
                <input v-model="this.store.filters.minCost" type="number"
                    class="form-control"
                    placeholder="Мин. стоимость"
                >
              </div>
              <div class="col-6 my-1 px-1 px-sm-2">
                <input v-model="this.store.filters.maxCost" type="number"
                    class="form-control"
                    placeholder="Макс. стоимость"
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
          <div v-show="this.seacrhMessage" class="text-danger text-center">
            {{ this.seacrhMessage }}
          </div>
          <div v-for="work in this.store.works" class="interstellarium-unit-card">
            <a @click="this.redirectToWork(work)" class="interstellarium-unit-link">
              {{ work.name }}
            </a>
            <div class="interstellarium-unit-decription">
              Стоимость: {{ work.cost }} р.
            </div>
            <div v-if="work.contract.id" class="interstellarium-unit-decription">
              Контракт: {{ work.contract.name }}
            </div>
            <div v-else class="interstellarium-unit-decription">
              Контракт: не присвоен
            </div>
            <div v-if="work.project.id" class="interstellarium-dashboard-main-content-text">
              Проект: {{ work.project.name }}
            </div>
            <div v-else class="interstellarium-unit-decription">
              Проект: не присвоен
            </div>
          </div>
        </template>
      </Main>

      <Footer>
        <template v-slot:tools>
          <CreateUnit unit-class-name="Work"></CreateUnit>
        </template>
      </Footer>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
