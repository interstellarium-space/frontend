<script>
  export default {
    data() {
      return {
        filtersAreHidden: true
      }
    },
    
    methods: {
      toggleFilters() {
        let searchArea = document.getElementById("dashboard-search")
        let filters = document.getElementById("dashboard-search-filters")
        
        if (this.filtersAreHidden) {
          searchArea.classList.add("extended")
          filters.classList.remove("hidden")
        } else {
          searchArea.classList.remove("extended")
          filters.classList.add("hidden")
        }
        
        this.filtersAreHidden = !this.filtersAreHidden
      }
    }
  }
</script>

<template>
  <button @click="this.toggleFilters()" class="btn btn-dark interstellarium-toggle-filters">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z"/>
    </svg>
  </button>
</template>

<style scoped>
.interstellarium-toggle-filters {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
</style>
