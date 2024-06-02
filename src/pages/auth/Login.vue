<script>
  import { APIAuthLogin } from "../../services/api/auth/Login.js";
  import { login } from "../../services/Auth.js";
  
  export default {
    setup() {
      document.title = "Авторизация | Interstellarium"
    },
    
    data() {
      return {
        email: "",
        password: "",
        msg: ""
      }
    },
    
    methods: {
      redirectToResetPassword() {
        this.$router.push({name: "AuthResetPassword"})
      },
      
      loginFormIsValid() {
        if (this.email === "") {
          this.msg = "Пожалуйста, введите E-mail"
          return false
        }
        if (this.password === "") {
          this.msg = "Пожалуйста, введите пароль"
          return false
        }
        this.msg = ""
        return true
      },
      
      async tryLogin() {
        if (this.loginFormIsValid()) {
          let response = await APIAuthLogin(
              this.email,
              this.password
          )
          
          if (response.isOk) {
            let user = response.data["user"]
            let token = response.data["token"]["access_token"]
            
            if (token == null)
              return
            
            login(user, token)
            
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl)
            } else {
              this.$router.push({name: "Dashboard"})
            }
          } else {
            this.msg = response.msg
          }
          
          console.log(response)
        }
      },
    },
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-auth">
      <div class="interstellarium-auth-picture-wrapper">
        <img src="/src/assets/img/rocket.png" class="interstellarium-auth-picture" alt="interstellarium">
      </div>
      <div class="interstellarium-auth-form-wrapper">
        <div class="interstellarium-auth-form">
          <div class="interstellarium-auth-form-header mb-3">
            INTERSTELLARIUM
          </div>
          <form @submit.prevent="" autocomplete=off>
            <div class="row">
              <div class="col-12">
                <input v-model="email" class="form-control mb-3" type="email" placeholder="E-mail">
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <input v-model="password" class="form-control mb-3" type="password" placeholder="Пароль">
              </div>
            </div>
            <p class="text-secondary text-center">
              <a @click="this.redirectToResetPassword()" class="text-secondary">
                Восстановить доступ
              </a>
            </p>
            <div v-if="msg" class="text-danger text-center mb-3">
              {{ msg }}
            </div>
            <div class="d-flex justify-content-center mb-4">
              <input @click="this.tryLogin()" class="btn btn-interstellarium rounded-pill fw-bold px-3" type="submit" value="Авторизоваться">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/auth.css";
</style>
