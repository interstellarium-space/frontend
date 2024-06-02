<script>
  import ToggleFilters from "../buttons/ToggleFilters.vue";
  
  export default {
    components: {
      ToggleFilters
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-search" id="dashboard-search">
    <form class="w-100 mx-3 interstellarium-search-form p-1" @submit.prevent="" autocomplete=off>
      <div class="row">
        <div class="col-3 col-sm-2 col-lg-1 my-1 px-1 px-sm-2 d-flex align-items-stretch">
          <ToggleFilters></ToggleFilters>
        </div>
        <slot name="search"></slot>
      </div>
      <div class="row interstellarium-dashboard-search-filters hidden" id="dashboard-search-filters">
        <slot name="filters"></slot>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-search-form {
    font-family: var(--interstellarium-base-font-family), sans-serif;
}
</style>
