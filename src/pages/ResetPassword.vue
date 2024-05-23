<script>
  export default {
    setup(){
      document.title = 'Восстановление доступа | Interstellarium'
    },
    
    data() {
      return {
        email: '',
        msg: ''
      }
    },
    
    methods: {
      isValid() {
        if (this.email === '') {
          this.msg = 'Пожалуйста, введите E-mail'
          return false
        }
        return true
      },
      
      async resetPassword() {
        if (this.isValid()) {
          // ... send request to reset
          document.getElementById('')
        }
      },
      
      mounted() {
        document.title = 'Восстановление доступа | Interstellarium'
      }
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
            <p class="text-secondary text-center">
              Мы отправим инструкцию по восстановлению пароля Вам на почту
            </p>
            <div class="row">
              <div class="col-12">
                <input class="form-control mb-3" type="email" placeholder="E-mail" v-model="email">
              </div>
            </div>
            <p class="text-center">
              <a @click="this.$router.push({name: 'Login'})" class="interstellarium-link text-secondary">Войти в систему</a>
            </p>
            <div v-if="msg !== ''" class="text-danger text-center mb-3">{{ msg }}</div>
            <div v-else class="d-none text-danger text-center mb-3">{{ msg }}</div>
            <div class="d-flex justify-content-center mb-4">
              <input @click="this.resetPassword()" type="submit" class="btn btn-interstellarium rounded-pill fw-bold px-3" id="btn-reset-pwd" value="Восстановить пароль">
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
