<script>
  import axios from 'axios'
  
  import { prepareAPIRequest } from '../services/index.js';
  
  export default {
    setup() {
      document.title = 'Авторизация | Interstellarium'
    },
    
    data() {
      return {
        email: '',
        password: '',
        msg: ''
      }
    },
    
    methods: {
      isValid() {
        if (this.email === '') {
          this.msg = 'Пожалуйста, введите E-mail'
          return false
        }
        if (this.password === '') {
          this.msg = 'Пожалуйста, введите пароль'
          return false
        }
        this.msg = ''
        return true
      },
      
      async login() {
        if (this.isValid()) {
          let request = prepareAPIRequest('/api/auth/login')
          
          const res = await axios.post(request.url, {
            email: this.email,
            password: this.password
          }, request.config).catch(function (_) {})
          
          console.debug(res)
          
          // we catch error and then check response and status
          // response must not be undefined
          if (res && res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', res.data.token.access_token)
            
            if (localStorage.getItem('token') != null) {
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl)
              } else {
                this.$router.push({name: 'Dashboard'})
              }
            }
          } else {
            this.msg = 'Не правильно введен логин или пароль'
          }
        }
      }
    },
    
    mounted() {
      document.title = 'Авторизация | Interstellarium'
    }
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
          <div class="interstellarium-auth-form-header mb-3">INTERSTELLARIUM</div>
          <form @submit.prevent="" autocomplete=off>
            <div class="row">
              <div class="col-12">
                <input class="form-control mb-3" type="email" placeholder="E-mail" v-model="email">
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <input class="form-control mb-3" type="password" placeholder="Пароль" v-model="password">
              </div>
            </div>
            <p class="text-secondary text-center">
              <a @click="this.$router.push({name: 'ResetPassword'})" class="interstellarium-link text-secondary">Восстановить доступ</a>
            </p>
            <div v-if="msg !== ''" class="text-danger text-center mb-3">{{ msg }}</div>
            <div v-else class="d-none text-danger text-center mb-3">{{ msg }}</div>
            <div class="d-flex justify-content-center mb-4">
              <input @click="this.login()" type="submit" class="btn btn-interstellarium rounded-pill fw-bold px-3" id="btn-login" value="Авторизоваться">
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
