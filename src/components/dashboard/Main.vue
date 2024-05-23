<script>
  import DashboardShowSidebar from "./ShowSidebar.vue";
  import DashboardLogo from "./Logo.vue";
  
  export default {
    components: {
      DashboardLogo,
      DashboardShowSidebar
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-main" id="dashboard-main">
    <div class="interstellarium-dashboard-header">
      <DashboardLogo/>
    </div>
    <div class="interstellarium-dashboard-main-content">
      <slot></slot>
    </div>
    <div class="interstellarium-dashboard-footer">
      <DashboardShowSidebar/>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
