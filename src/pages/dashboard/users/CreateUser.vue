<script>
  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  
  import { APIUsersCreate } from "../../../services/api/users/Create.js";
  import CreateUnit from "../../../components/dashboard/buttons/CreateUnit.vue";
  
  export default {
    components: {
      CreateUnit,
      Main,
      Sidebar,
      Header,
      Footer
    },
    
    setup() {
      document.title = "Создать пользователя | Interstellarium"
    },
    
    data() {
      return {
        form: {
          email: "",
          password: "",
          name: "",
          isAdmin: false,
          birthdate: null
        }
      }
    },
    
    methods: {
      formIsValid() {
        if (this.email === "") {
          this.msg = "Пожалуйста, введите E-mail"
          return false
        }
        if (this.password === "") {
          this.msg = "Пожалуйста, введите пароль"
          return false
        }
        if (this.name === "") {
          this.msg = "Пожалуйста, введите имя пользователя"
          return false
        }
        this.msg = ""
        return true
      },
      
      async createUser() {
        if (this.formIsValid()) {
          let response = await APIUsersCreate(this.form)
          
          if (response.isOk) {
            // TODO: go to user
          } else {
            console.log(response.msg)
            
            if (response.code === 401) {
              this.$router.push({ name: "AuthLogout" })
            }
          }
          
          console.log(response)
        }
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
          <form @submit.prevent="" autocomplete=off class="interstellarium-dashboard-edit-form">
            <div class="interstellarium-dashboard-edit-form-content">
              <div class="interstellarium-dashboard-edit-form-header">
                Новый пользователь
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      v-model="this.form.email"
                      class="form-control mb-3"
                      type="email"
                      placeholder="E-mail"
                      required
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      v-model="this.form.password"
                      class="form-control mb-3"
                      type="password"
                      placeholder="Пароль"
                      required
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      v-model="this.form.name"
                      class="form-control mb-3"
                      type="text"
                      placeholder="Имя пользователя"
                      required
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      v-model="this.form.birthdate"
                      class="form-control mb-3"
                      type="text"
                      placeholder="Дата рождения"
                      onfocus="this.type='date'"
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
      </Main>
      
      <Footer>
        <template v-slot:tools></template>
      </Footer>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-main {
    top: 5rem;
    display: flex;
    justify-content: center;
}
</style>
