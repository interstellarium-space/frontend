<script>
  import { useEquipmentStore } from "../../../stores/dashboard/Equipment.js";
  import { APIEquipmentGet } from "../../../services/api/equipment/Get.js";

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
      document.title = "Оборудование | Interstellarium"
      const store = useEquipmentStore()
      return { store }
    },

    data() {
      return {
        searchIsInProgress: false,
        seacrhMessage: ""
      }
    },

    methods: {
      redirectToEquipment(equipment) {
        this.$router.push({ name: "EquipmentProfile", params: { equipmentId: equipment.id } })
      },

      searchFormIsValid() {
        if (this.store.filters.name === "") {
          this.store.filters.name = null
        }
        return true
      },

      async searchEquipment() {
        if (this.searchFormIsValid()) {
          this.searchIsInProgress = true
          this.store.equipment = []
          this.seacrhMessage = ""

          let response = await APIEquipmentGet(this.store.filters)

          if (response.isOk) {
            this.store.equipment = response.data
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
                    placeholder="Наименование оборудования"
                >
              </div>
              <div class="col-4 col-sm-2 my-1 px-1 px-sm-2">
                <input @click="this.searchEquipment()" type="submit"
                    class="form-control btn btn-interstellarium"
                    value="Поиск"
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
          <div v-for="item in this.store.equipment" class="interstellarium-unit-card">
            <a @click="this.redirectToEquipment(item)" class="interstellarium-unit-link">
              {{ item.name }}
            </a>
            <div v-if="item.department.id" class="interstellarium-unit-description">
              Закреплен за отделом: {{ item.department.name }}
            </div>
            <div v-else class="interstellarium-unit-description">
              Коллективная собственность
            </div>
            <div v-if="item.group.id" class="interstellarium-unit-description">
              Рабочая группа: {{ item.group.name }}
            </div>
            <div v-else class="interstellarium-unit-description">
              Рабочая группа: не назначена
            </div>
          </div>
        </template>
      </Main>

      <Footer>
        <template v-slot:tools>
          <CreateUnit unit-class-name="Equipment"></CreateUnit>
        </template>
      </Footer>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
