<script>
  import ToggleFilters from "./ToggleFilters.vue";
  
  export default {
    components: {
      ToggleFilters
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-search">
    <form class="row w-100 mx-3 interstellarium-search-form" @submit.prevent="" autocomplete=off>
      <div class="col-3 col-sm-2 col-lg-1 my-2 my-md-1 px-1 px-sm-2 d-flex align-items-stretch">
        <ToggleFilters></ToggleFilters>
      </div>
      <slot name="main-line-fields"></slot>
      <slot name="filters"></slot>
    </form>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
