<script>
  export default {
    methods: {
      toggleSidebar() {
        let sidebar = document.getElementById('dashboard-sidebar')
        let main = document.getElementById('dashboard-main')
        if (sidebar.classList.contains('hidden')) {
          sidebar.classList.remove('hidden')
          main.classList.add('hidden')
        } else {
          sidebar.classList.add('hidden')
          main.classList.remove('hidden')
        }
      }
    }
  }
</script>

<template>
  <a @click="this.toggleSidebar()" class="btn btn-interstellarium interstellarium-hide-sidebar">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg interstellarium-hide-sidebar-icon" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
    </svg>
  </a>
</template>

<style scoped>
.interstellarium-hide-sidebar {
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

.interstellarium-hide-sidebar-icon {
    width: 1.5rem;
    height: 1.5rem;
}
</style>
