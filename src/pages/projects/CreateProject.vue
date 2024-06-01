<script>
  import axios from "axios";
  
  import {prepareAPIRequest} from "../../services/APIRequests.js";

  import DashboardSidebar from "../../components/dashboard/Sidebar.vue";
  import DashboardMain from "../../components/dashboard/Main.vue";
  
  export default {
    components: {
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
      document.title = 'Создать проект | Interstellarium'
    },
    
    data() {
      return {
        form: {
          name: null,
          start_date: null,
          finish_date: null
        }
      }
    },
    
    methods: {
      prepareForm() {
        if (this.form.name === '')
          this.form.name = null
        if (this.form.start_date === '')
          this.form.start_date = null
        if (this.form.finish_date === '')
          this.form.finish_date = null
      },
      
      async createProject() {
        let req = prepareAPIRequest('/api/projects/create')
        
        this.prepareForm()
        
        let payload =  {
          name: this.form.name,
          start_date: this.form.start_date,
          finish_date: this.form.finish_date,
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
        
        if (res && res.status === 201) {
          this.$router.push({name: 'Projects'})
        }
      },
      
      mounted() {
        document.title = 'Создать проект | Interstellarium'
      }
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain>
        <template v-slot:content>
          <form @submit.prevent="" autocomplete=off class="interstellarium-dashboard-form">
            <div class="interstellarium-dashboard-form-content">
              <div class="row">
                <div class="col-12">
                  <input
                      class="form-control mb-3"
                      type="text"
                      placeholder="Название проекта"
                      v-model="form.name"
                      required
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      type="text"
                      class="form-control mb-3"
                      id="start-date"
                      placeholder="Дата начала"
                      onfocus="this.type='date'"
                      v-model="form.start_date"
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      type="text"
                      class="form-control mb-3"
                      id="finish-date"
                      placeholder="Дата завершения"
                      onfocus="this.type='date'"
                      v-model="form.finish_date"
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex justify-content-center">
                  <input
                      @click="this.createProject()"
                      class="btn btn-interstellarium rounded-pill fw-bold px-3"
                      type="submit"
                      value="Создать"
                  >
                </div>
              </div>
            </div>
          </form>
        </template>
      </DashboardMain>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
    top: 5rem;
}

.interstellarium-dashboard-form {
    width: 100%;
    display: flex;
    justify-content: center;
}

.interstellarium-dashboard-form-content {
    width: 100%;
}

@media (min-width: 768px) {
    .interstellarium-dashboard-form-content {
        width: 75%;
    }
}

@media (min-width: 992px) {
    .interstellarium-dashboard-form-content {
        width: 50%;
    }
}

</style>
