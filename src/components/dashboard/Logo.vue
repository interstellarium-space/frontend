<script>
  export default {
  
  }
</script>

<template>
  <div class="interstellarium-dashboard-logo-wrapper">
    <div class="interstellarium-dashboard-logo m-2">
      INTERSTELLARIUM
    </div>
  </div>
</template>

<style scoped>
.interstellarium-dashboard-logo {
    font-family: var(--interstellarium-special-font-family), sans-serif;
    font-size: max(2vw, 3.2vh);
    font-weight: 900;
    text-align: center;
    background: var(--interstellarium-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--interstellarium-primary);
}

@media (min-width: 768px) {
    .interstellarium-dashboard-logo {
        font-size: 2vw;
    }
  
    .interstellarium-dashboard-main .interstellarium-dashboard-logo-wrapper {
        display: none;
    }
}
</style>
