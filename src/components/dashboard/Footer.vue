<script>
  import ToggleSidebar from "./buttons/ToggleSidebar.vue";
  
  export default {
    components: {
      ToggleSidebar
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-footer" id="dashboard-footer">
    <ToggleSidebar></ToggleSidebar>
    <slot name="create-entity"></slot>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
