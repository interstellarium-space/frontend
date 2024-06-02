<script>
  export default {
    data() {
      return {
        pages: [
          {name: "Users", title: "Пользователи"},
          {name: "Departments", title: "Отделы"},
          {name: "Projects", title: "Проекты"},
          {name: "Contracts", title: "Контракты"},
          {name: "Groups", title: "Группы"},
          {name: "Equipment", title: "Оборудование"},
          {name: "Works", title: "Работы"},
        ]
      }
    },
    
    methods: {
      redirectToDashboard() {
        this.$router.push({name: "Dashboard"})
      },
      
      redirectToLogout() {
        this.$router.push({name: "AuthLogout"})
      },
      
      redirectToPage(page) {
        this.$router.push({name: page.name})
      }
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-sidebar hidden" id="dashboard-sidebar">
    <div class="interstellarium-dashboard-sidebar-content">
      <div @click="this.redirectToDashboard()" class="interstellarium-dashboard-sidebar-card col-12 mb-3 bg-interstellarium">
        <div class="interstellarium-link interstellarium-dashboard-sidebar-card-link text-white">
          Dashboard
        </div>
      </div>
      <div v-for="page in this.pages" @click="this.redirectToPage(page)" class="interstellarium-dashboard-sidebar-card col-12 col-sm-6 col-md-12">
        <div class="interstellarium-dashboard-sidebar-card-link">
          {{ page.title }}
        </div>
      </div>
      <div @click="this.redirectToLogout()" class="interstellarium-dashboard-sidebar-card col-12 mt-3 bg-danger">
        <div class="interstellarium-dashboard-sidebar-card-link text-white">
          Выйти
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-dashboard-sidebar-card {
    min-height: 6rem;
    border-radius: 2rem;
    background-color: #EEEEEE;
    color: white;
    padding: 0.75rem;
    margin-bottom: -0.5rem;
    background-clip: content-box;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.interstellarium-dashboard-sidebar-card:hover {
    background-color: #DDDDDD;
}

.interstellarium-dashboard-sidebar-card-link {
    font-family: var(--interstellarium-work-font-family), sans-serif;
    text-decoration: none;
    color: var(--interstellarium-dark);
    font-size: 1.5rem;
}

@media (min-width: 768px) {
    .interstellarium-dashboard-sidebar-card {
        min-height: 5rem;
        margin-bottom: -1rem;
    }

    .interstellarium-dashboard-sidebar-card-link {
        font-size: 1.25rem;
    }
}

@media (min-width: 992px) {
    .interstellarium-dashboard-sidebar-card {
        min-height: 5rem;
        margin-bottom: -1rem;
    }

    .interstellarium-dashboard-sidebar-card-link {
        font-size: 1.25rem;
    }
}

@media (min-width: 1200px) {
    .interstellarium-dashboard-sidebar-card-link {
        font-size: 1.25rem;
    }
}
</style>
