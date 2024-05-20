<script>
  import DashboardShowSidebar from "../components/DashboardShowSidebar.vue";
  import DashboardLogo from "../components/DashboardLogo.vue";
  
  export default {
    components: {DashboardLogo, DashboardShowSidebar},
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
      <div class="interstellarium-dashboard-sidebar" id="dashboard-sidebar">
        <div class="interstellarium-dashboard-header">
          <DashboardLogo/>
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
  <!--
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <div class="interstellarium-dashboard-header">
        <div class="interstellarium-dashboard-logo-wrapper">
          <div class="interstellarium-dashboard-logo m-2">
            INTERSTELLARIUM
          </div>
        </div>
        <div class="interstellarium-dashboard-nav my-2"></div>
      </div>
      <div class="interstellarium-dashboard-content flex-grow-1"></div>
      <div class="interstellarium-dashboard-footer justify-content-center"></div>
    </div>
  </div>
  -->
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
