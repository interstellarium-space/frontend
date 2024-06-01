<script>
  import axios from "axios"
  
  import { prepareAPIRequest } from "../../services/APIRequests.js";
  
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
      
      login(responseData) {
        let user = responseData["user"]
        let token = responseData["token"]["access_token"]
        
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
        
        if (token != null) {
          if (this.$route.params.nextUrl != null) {
            this.$router.push(this.$route.params.nextUrl)
          } else {
            this.$router.push({name: "Dashboard"})
          }
        }
      },
      
      loginError(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch (error.response.status) {
            case 400: this.msg = "Не правильно введен пароль"; break
            case 404: this.msg = "Не правильно введен логин"; break
            default: this.msg = "Ошибка при отправке запроса... Уже исправляем!"
          }
          
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          // and an instance of http.ClientRequest in node.js
          this.msg = "Ошибка при отправке запроса... Уже исправляем!"
          
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          this.msg = "Ошибка при отправке запроса... Уже исправляем!"
          
          console.log("Error", error.message)
        }
      },
      
      async tryLogin() {
        if (this.loginFormIsValid()) {
          let request = prepareAPIRequest("/api/auth/login")
          
          const res = await axios.post(request.url, {
            email: this.email,
            password: this.password
          }, request.config).catch(this.loginError)
          
          if (res && res.status === 200) {
            this.login(res.data)
          }
        }
      },
      
      gotoResetPassword() {
        this.$router.push({name: "ResetPassword"})
      }
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
              <a @click="this.gotoResetPassword()" class="text-secondary">
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
