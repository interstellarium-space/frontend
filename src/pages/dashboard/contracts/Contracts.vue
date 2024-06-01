<script>
  import axios from "axios";
  
  import {prepareAPIRequest} from "../../../services/APIRequests.js";

  import DashboardSidebar from "../../components/dashboard/Sidebar.vue";
  import DashboardMain from "../../components/dashboard/Main.vue";
  import DashboardSearchArea from "../../components/dashboard/Search.vue";
  import DashboardCreateEntity from "../../components/dashboard/buttons/CreateEntity.vue";
  
  export default {
    components: {
      DashboardCreateEntity,
      DashboardSearchArea,
      DashboardSidebar,
      DashboardMain
    },
    
    // hack for component-dependent html tag 'body' styling
    beforeCreate: function() {
        document.body.className = 'dashboard'
        document.getElementById('app').className = 'dashboard'
    },
    
    beforeRouteLeave: function () {
      document.body.classList.remove('dashboard')
      document.getElementById('app').classList.remove('dashboard')
    },
    
    setup() {
      document.title = 'Контракты | Interstellarium'
    },
    
    data() {
      return {
        searchFilters: {
          name: null,
          start_date: null,
          finish_date: null
        },
        contracts: []
      }
    },
    
    methods: {
      prepareSearchFilters() {
        if (this.searchFilters.name === '')
          this.searchFilters.name = null
        if (this.searchFilters.start_date === '')
          this.searchFilters.start_date = null
        if (this.searchFilters.finish_date === '')
          this.searchFilters.finish_date = null
      },
      
      async searchContracts() {
        let req = prepareAPIRequest('/api/contracts')
        
        this.prepareSearchFilters()
        
        let payload = {
          name: this.searchFilters.name,
          start_date: this.searchFilters.start_date,
          finish_date: this.searchFilters.finish_date,
        }
        
        console.log(payload)
        
        let router = this.$router
        
        const res = await axios.post(req.url, payload, req.config).catch(
            function (error) {
              if (error.response.status === 401) {
                router.push({name: 'Logout'})
              }
            }
        )
        
        console.debug(res)
        
        if (res && res.status === 200) {
          this.contracts = res.data
          console.log(res.data)
        }
      },
      
      mounted() {
        document.title = 'Контракты | Interstellarium'
      }
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain>
        <template v-slot:search-area>
          <DashboardSearchArea>
            <template v-slot:main-line-fields>
              <div class="col-5 col-sm-8 col-lg-9 my-2 my-md-1 px-1 px-sm-2">
                <input
                    type="text"
                    class="form-control"
                    id="filter-name"
                    placeholder="Введите наименование контракта"
                    v-model="searchFilters.name"
                >
              </div>
              <div class="col-4 col-sm-2 my-2 my-md-1 px-1 px-sm-2">
                <input
                    @click="this.searchContracts()"
                    type="submit"
                    class="form-control btn btn-interstellarium"
                    id="search"
                    value="Поиск"
                >
              </div>
            </template>
            <template v-slot:filters>
              <div class="col-6 my-2 my-md-1 px-1 px-sm-2 interstellarium-dashboard-search-filter hidden">
                <input
                    type="text"
                    class="form-control"
                    id="filter-start-date"
                    placeholder="Начат с даты"
                    onfocus="this.type='date'"
                    v-model="searchFilters.start_date"
                >
              </div>
              <div class="col-6 my-2 my-md-1 px-1 px-sm-2 interstellarium-dashboard-search-filter hidden">
                <input
                    type="text"
                    class="form-control"
                    id="filter-finish-date"
                    placeholder="Завершен до даты"
                    onfocus="this.type='date'"
                    v-model="searchFilters.finish_date"
                >
              </div>
            </template>
          </DashboardSearchArea>
        </template>
        
        <template v-slot:content>
          <div v-for="contract in this.contracts"
               class="interstellarium-dashboard-main-content-card mb-3">
            <div class="interstellarium-dashboard-main-content-link">
              {{ contract.name }}
            </div>
            <div v-if="contract.chief.id != null"
                 class="interstellarium-dashboard-main-content-text">
              Руководитель: {{ contract.chief.name }}
            </div>
            <div v-else class="interstellarium-dashboard-main-content-text">
              Руководитель: не назначен
            </div>
            <div v-if="contract.group.id != null"
                 class="interstellarium-dashboard-main-content-text">
              Рабочая группа: {{ contract.group.name }}
            </div>
            <div v-else class="interstellarium-dashboard-main-content-text">
              Рабочая группа: не назначена
            </div>
          </div>
        </template>
        
        <template v-slot:create-entity>
          <DashboardCreateEntity @click="this.$router.push({name: 'CreateContract'})"/>
        </template>
      </DashboardMain>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
