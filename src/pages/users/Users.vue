<script>
  import axios from "axios";
  
  import {prepareAPIRequest} from "../../services/index.js";

  import DashboardSidebar from "../../components/dashboard/Sidebar.vue";
  import DashboardMain from "../../components/dashboard/Main.vue";
  import DashboardSearchArea from "../../components/dashboard/SearchArea.vue";
  import DashboardCreateEntity from "../../components/dashboard/CreateEntity.vue";
  
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
      document.title = 'Пользователи | Interstellarium'
    },
    
    data() {
      return {
        searchFilters: {
          name: null,
          birthdateFrom: null,
          birthdateTo: null
        },
        users: []
      }
    },
    
    methods: {
      prepareSearchFilters() {
        if (this.searchFilters.birthdateFrom === '')
          this.searchFilters.birthdateFrom = null
        if (this.searchFilters.birthdateTo === '')
          this.searchFilters.birthdateTo = null
        if (this.searchFilters.name === '')
          this.searchFilters.name = null
      },
      
      async searchUsers() {
        let req = prepareAPIRequest('/api/users')
        
        this.prepareSearchFilters()
        
        let payload =  {
          name: this.searchFilters.name,
          birthdate_from: this.searchFilters.birthdateFrom,
          birthdate_to: this.searchFilters.birthdateTo
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
          this.users = res.data
          console.log(res.data)
        }
      },
      
      mounted() {
        document.title = 'Пользователи | Interstellarium'
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
                    placeholder="Введите имя пользователя"
                    v-model="searchFilters.name"
                >
              </div>
              <div class="col-4 col-sm-2 my-2 my-md-1 px-1 px-sm-2">
                <input
                    @click="this.searchUsers()"
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
                    id="filter-birthdate-from"
                    placeholder="С даты рождения"
                    onfocus="this.type='date'"
                    v-model="searchFilters.birthdateFrom"
                >
              </div>
              <div class="col-6 my-2 my-md-1 px-1 px-sm-2 interstellarium-dashboard-search-filter hidden">
                <input
                    type="text"
                    class="form-control"
                    id="filter-birthdate-to"
                    placeholder="По дату рождения"
                    onfocus="this.type='date'"
                    v-model="searchFilters.birthdateTo"
                >
              </div>
            </template>
          </DashboardSearchArea>
        </template>
        
        <template v-slot:content>
          <div v-for="user in this.users" class="interstellarium-dashboard-main-content-card mb-3">
            <div class="interstellarium-dashboard-main-content-link">
              {{ user.name }}
            </div>
            <div v-if="user.department.name != null" class="interstellarium-dashboard-main-content-text">
              Отдел: {{ user.department.name }}
            </div>
            <div v-else class="interstellarium-dashboard-main-content-text">
              Отдел: не назначен
            </div>
          </div>
        </template>
        
        <template v-slot:create-entity>
          <DashboardCreateEntity @click="this.$router.push({name: 'CreateUser'})"/>
        </template>
      </DashboardMain>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
