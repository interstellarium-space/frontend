<script>
  import DashboardShowSidebar from './ShowSidebar.vue';
  import DashboardLogo from './Logo.vue';
  
  export default {
    components: {
      DashboardLogo,
      DashboardShowSidebar
    },
  }
</script>

<template>
  <div class="interstellarium-dashboard-sidebar hidden" id="dashboard-sidebar">
    <div class="interstellarium-dashboard-header">
      <DashboardLogo/>
    </div>
    <div class="interstellarium-dashboard-sidebar-content">
      <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12">
        <a href="#" class="interstellarium-dashboard-card-link">Персонал</a>
      </div>
      <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12">
        <a href="#" class="interstellarium-dashboard-card-link">Отделы</a>
      </div>
      <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12">
        <a href="#" class="interstellarium-dashboard-card-link">Проекты</a>
      </div>
      <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12">
        <a href="#" class="interstellarium-dashboard-card-link">Договоры</a>
      </div>
      <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12">
        <a href="#" class="interstellarium-dashboard-card-link">Группы</a>
      </div>
      <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12">
        <a href="#" class="interstellarium-dashboard-card-link">Оборудование</a>
      </div>
      <div class="interstellarium-dashboard-card col-12 col-sm-6 col-md-12">
        <a href="#" class="interstellarium-dashboard-card-link">Работы</a>
      </div>
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
