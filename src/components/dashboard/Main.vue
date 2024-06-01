<script>
  export default {}
</script>

<template>
  <div class="interstellarium-dashboard-main" id="dashboard-main">
    <div class="interstellarium-dashboard-main-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
