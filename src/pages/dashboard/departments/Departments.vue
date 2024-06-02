<script>
  import axios from "axios";
  
  import {prepareAPIRequest} from "../../services/APIRequests.js";

  import DashboardSidebar from "../../components/dashboard/Sidebar.vue";
  import DashboardMain from "../../components/dashboard/Main.vue";
  import DashboardSearchArea from "../../components/dashboard/Search.vue";
  import DashboardCreateEntity from "../../components/dashboard/buttons/CreateUnit.vue";
  
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
      document.title = 'Отделы | Interstellarium'
    },
    
    data() {
      return {
        searchFilters: {
          name: null,
        },
        departments: []
      }
    },
    
    methods: {
      prepareSearchFilters() {
        if (this.searchFilters.name === '')
          this.searchFilters.name = null
      },
      
      async searchDepartments() {
        let req = prepareAPIRequest('/api/departments')
        
        this.prepareSearchFilters()
        
        let payload =  {
          name: this.searchFilters.name,
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
          this.departments = res.data
          console.log(res.data)
        }
      },
      
      mounted() {
        document.title = 'Отделы | Interstellarium'
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
                    placeholder="Введите название отдела"
                    v-model="searchFilters.name"
                >
              </div>
              <div class="col-4 col-sm-2 my-2 my-md-1 px-1 px-sm-2">
                <input
                    @click="this.searchDepartments()"
                    type="submit"
                    class="form-control btn btn-interstellarium"
                    id="search"
                    value="Поиск"
                >
              </div>
            </template>
          </DashboardSearchArea>
        </template>
        
        <template v-slot:content>
          <div v-for="department in this.departments" class="interstellarium-dashboard-main-content-card mb-3">
            <div class="interstellarium-dashboard-main-content-link">
              {{ department.name }}
            </div>
            <div v-if="department.chief.id != null" class="interstellarium-dashboard-main-content-text">
              Шеф: {{ department.chief.name }}
            </div>
            <div v-else class="interstellarium-dashboard-main-content-text">
              Шеф (появится в последний момент): не назначен
            </div>
          </div>
        </template>
        
        <template v-slot:create-entity>
          <DashboardCreateEntity @click="this.$router.push({name: 'CreateDepartment'})"/>
        </template>
      </DashboardMain>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
