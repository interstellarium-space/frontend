<script>
  import axios from "axios";
  
  import {prepareAPIRequest} from "../../services/index.js";

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
      document.title = 'Создать пользователя | Interstellarium'
    },
    
    data() {
      return {
        form: {
          email: null,
          password: null,
          name: null,
          isAdmin: null,
          birthdate: null
        }
      }
    },
    
    methods: {
      async createUser() {
        let req = prepareAPIRequest('/api/users/create')
        
        let payload =  {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
          is_admin: this.form.isAdmin,
          birthdate: this.form.birthdate
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
          this.$router.push({name: 'Users'})
        }
      },
      
      mounted() {
        document.title = 'Создать пользователя | Interstellarium'
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
                      type="email"
                      placeholder="E-mail"
                      v-model="form.email"
                      required
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      class="form-control mb-3"
                      type="password"
                      placeholder="Пароль"
                      v-model="form.password"
                      required
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      class="form-control mb-3"
                      type="text"
                      placeholder="Имя пользователя"
                      v-model="form.name"
                      required
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12 d-flex justify-content-center">
                  <input
                      @click="this.createUser()"
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
