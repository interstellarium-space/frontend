<script>
  export default {
    methods: {
      toggleSidebar() {
        let sidebar = document.getElementById('dashboard-sidebar')
        let main = document.getElementById('dashboard-main')
        if (sidebar.classList.contains("hidden")) {
          sidebar.classList.remove("hidden")
          main.classList.add("hidden")
        } else {
          sidebar.classList.add("hidden")
          main.classList.remove("hidden")
        }
      }
    }
  }
</script>

<template>
  <a @click="this.toggleSidebar()" class="btn btn-interstellarium interstellarium-show-sidebar">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-grid interstellarium-show-sidebar-icon" viewBox="0 0 16 16">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/>
    </svg>
  </a>
</template>

<style scoped>
.interstellarium-show-sidebar {
    max-width: 3rem;
    max-height: 3rem;
    height: 3rem;
    width: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.interstellarium-show-sidebar-icon {
    width: 1.5rem;
    height: 1.5rem;
}
</style>
