<script>
  import DashboardShowSidebar from "../components/DashboardShowSidebar.vue";
  import DashboardLogo from "../components/DashboardLogo.vue";
  
  export default {
    components: {
      DashboardLogo,
      DashboardShowSidebar
    },
    // hack for component-dependent html tag 'body' styling
    beforeCreate: function() {
        document.body.className = 'dashboard'
        document.getElementById('app').className = 'dashboard'
    },
    
    setup() {
      document.title = 'Dashboard | Interstellarium'
    },
    
    methods: {
      mounted() {
        document.title = 'Dashboard | Interstellarium'
      }
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <div class="interstellarium-dashboard-sidebar hidden" id="dashboard-sidebar">
        <div class="interstellarium-dashboard-header">
          <DashboardLogo/>
        </div>
        <div class="interstellarium-dashboard-sidebar-content">
          <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12"></div>
          <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12"></div>
          <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12"></div>
          <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12"></div>
          <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12"></div>
          <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12"></div>
          <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12"></div>
        </div>
        <div class="interstellarium-dashboard-footer">
          <DashboardShowSidebar/>
        </div>
      </div>
      <div class="interstellarium-dashboard-main" id="dashboard-main">
        <div class="interstellarium-dashboard-header">
          <DashboardLogo/>
        </div>
        <div class="interstellarium-dashboard-footer">
          <DashboardShowSidebar/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
