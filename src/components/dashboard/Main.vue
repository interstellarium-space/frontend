<script>
  import DashboardShowSidebar from "./ShowSidebar.vue";
  import DashboardLogo from "../../components/dashboard/Logo.vue";

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
      <DashboardLogo></DashboardLogo>
    </div>
    <slot name="search-area"></slot>
    <div class="interstellarium-dashboard-main-content">
      <slot name="content"></slot>
    </div>
    <div class="interstellarium-dashboard-footer">
      <DashboardShowSidebar></DashboardShowSidebar>
      <slot name="footer-content"></slot>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
