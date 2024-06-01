<script>
  export default {
    setup() {
      document.title = "Interstellarium"
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-index-hero">
      <div class="interstellarium-logo">INTERSTELLARIUM</div>
      <div class="interstellarium-slogan">
        разработка космических проектов
      </div>
      <div class="interstellarium-goto-login">
        <a @click="this.$router.push({name: 'Login'})" class="btn btn-interstellarium rounded-pill fw-bold mt-4 px-3" >
          Войти в систему
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";

.interstellarium-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.interstellarium-goto-login {
    font-family: var(--interstellarium-base-font-family), sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
}

.interstellarium-logo {
    font-family: var(--interstellarium-special-font-family), sans-serif;
    font-size: 8vw;
    font-weight: 900;
    text-align: center;
    background: var(--interstellarium-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--interstellarium-primary);
}

.interstellarium-slogan {
    font-family: var(--interstellarium-special-font-family), sans-serif;
    font-size: 4vw;
    font-weight: 900;
    text-align: center;
    background: var(--interstellarium-tertiary);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--interstellarium-tertiary);
    word-spacing: 0.5rem;
}

@media (min-width: 992px) {
    .interstellarium-logo {
        font-size: 8vw;
    }
    
    .interstellarium-slogan {
        font-size: 3vw;
    }
}
</style>
