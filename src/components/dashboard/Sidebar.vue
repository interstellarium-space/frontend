<script>
  import DashboardHideSidebar from "./HideSidebar.vue";
  import DashboardLogo from "./Logo.vue";
  
  export default {
    components: {
      DashboardLogo,
      DashboardHideSidebar
    },
    
    data() {
      return {
        pages: [
          {name: 'Users', title: 'Пользователи'},
          {name: 'Departments', title: 'Отделы'},
          {name: 'Projects', title: 'Проекты'},
          {name: 'Contracts', title: 'Контракты'},
          {name: 'Groups', title: 'Группы'},
          {name: 'Equipment', title: 'Оборудование'},
          {name: 'Works', title: 'Работы'},
        ]
      }
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-sidebar hidden" id="dashboard-sidebar">
    <div class="interstellarium-dashboard-header">
      <DashboardLogo></DashboardLogo>
    </div>
    <div class="interstellarium-dashboard-sidebar-content">
      <div @click="this.$router.push({name: 'Dashboard'})" class="interstellarium-dashboard-sidebar-card col-12 mb-3 bg-interstellarium">
        <div class="interstellarium-link interstellarium-dashboard-sidebar-card-link text-white">
          Dashboard
        </div>
      </div>
      <div v-for="page in this.pages" @click="this.$router.push({name: page.name})" class="interstellarium-dashboard-sidebar-card col-12 col-sm-6 col-md-12">
        <div class="interstellarium-link interstellarium-dashboard-sidebar-card-link">
          {{ page.title }}
        </div>
      </div>
      <div @click="this.$router.push({name: 'Logout'})" class="interstellarium-dashboard-sidebar-card col-12 mt-3 bg-danger">
        <div class="interstellarium-link interstellarium-dashboard-sidebar-card-link text-white">
          Выйти
        </div>
      </div>
    </div>
    <div class="interstellarium-dashboard-footer">
      <DashboardHideSidebar></DashboardHideSidebar>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
