<script>
  export default {}
</script>

<template>
  <div class="interstellarium-dashboard-logo-wrapper">
    <div class="interstellarium-dashboard-logo">
      INTERSTELLARIUM
    </div>
  </div>
</template>

<style scoped>
.interstellarium-dashboard-logo {
    font-family: var(--interstellarium-special-font-family), sans-serif;
    font-size: 6vw;
    font-weight: 900;
    text-align: center;
    background: var(--interstellarium-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--interstellarium-primary);
}

@media (min-width: 576px) {
    .interstellarium-dashboard-logo {
        font-size: 4.5vw;
    }
}

@media (min-width: 768px) {
    .interstellarium-dashboard-logo {
        font-size: 3vw;
    }
}

@media (min-width: 992px) {
    .interstellarium-dashboard-logo {
        font-size: 2vw;
    }
}

@media (min-width: 1200px) {
    .interstellarium-dashboard-logo {
        font-size: 2vw;
    }
}

@media (min-width: 1440px) {
    .interstellarium-dashboard-logo {
        font-size: 1.5vw;
    }
}
</style>
