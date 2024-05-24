<script>
  import DashboardSidebar from "../components/dashboard/Sidebar.vue";
  import DashboardMain from "../components/dashboard/Main.vue";
  
  import {prepareAPIRequest} from "../services/index.js";
  import axios from "axios";
  
  import DashboardSearchArea from "../components/dashboard/SearchArea.vue";
  
  export default {
    components: {
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
      async searchUsers() {
        let req = prepareAPIRequest('/api/users')
        let payload =  {
          name: this.searchFilters.name,
          birthdate_from: this.searchFilters.birthdateFrom,
          birthdate_to: this.searchFilters.birthdateTo
        }
        
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
                    placeholder="Имя пользователя"
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
          </DashboardSearchArea>
        </template>
        <!--
        <template v-slot:functions>
          <form class="row w-100 mx-3 interstellarium-search-form" @submit.prevent="" autocomplete=off>
            <div class="col-6 col-md-3 my-2 my-md-1">
              <input
                  type="text"
                  class="form-control"
                  id="filter-birthdate-from"
                  placeholder="С даты рождения"
                  onfocus="this.type='date'"
                  v-model="searchFilters.birthdateFrom"
              >
            </div>
            <div class="col-6 col-md-3 my-2 my-md-1">
              <input
                  type="text"
                  class="form-control"
                  id="filter-birthdate-to"
                  placeholder="По дату рождения"
                  onfocus="this.type='date'"
                  v-model="searchFilters.birthdateTo"
              >
            </div>
            
          </form>
        </template>
        -->
        <template v-slot:content>
          <div v-for="user in this.users" class="interstellarium-dashboard-main-content-card mb-3">
            <div class="interstellarium-dashboard-main-content-link">
              {{ user.name }}
            </div>
          </div>
        </template>
      </DashboardMain>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
