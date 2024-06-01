<script>
  import Logo from "./labels/Logo.vue";
  
  export default {
    components: {
      Logo
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-header" id="dashboard-header">
    <Logo></Logo>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
