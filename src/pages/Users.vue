<script>
  import DashboardSidebar from "../components/dashboard/Sidebar.vue";
  import DashboardMain from "../components/dashboard/Main.vue";
  
  export default {
    components: {
      DashboardSidebar,
      DashboardMain
    },
    
    // hack for component-dependent html tag 'body' styling
    beforeCreate: function() {
        document.body.className = 'dashboard'
        document.getElementById('app').className = 'dashboard'
    },
    
    beforeRouteLeave: function () {
        document.body.classList.remove('dashboard')
        document.getElementById('app').classList.remove('dashboard')
    },
    
    setup() {
      document.title = 'Пользователи | Interstellarium'
    },
    
    methods: {
      mounted() {
        document.title = 'Пользователи | Interstellarium'
      }
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain>
        <template v-slot:functions>
          <form class="row w-100 mx-3 interstellarium-search-form" @submit.prevent="" autocomplete=off>
            <div class="col-6 col-md-3 my-2 my-md-1">
              <input
                  type="text"
                  class="form-control"
                  id="filter-name"
                  placeholder="Имя"
              >
            </div>
            <div class="col-6 col-md-3 my-2 my-md-1">
              <input
                  type="text"
                  class="form-control"
                  id="filter-birthdate-from"
                  placeholder="С даты рождения"
                  onfocus="this.type='date'"
              >
            </div>
            <div class="col-6 col-md-3 my-2 my-md-1">
              <input
                  type="text"
                  class="form-control"
                  id="filter-birthdate-to"
                  placeholder="По дату рождения"
                  onfocus="this.type='date'"
              >
            </div>
            <div class="col-6 col-md-3 my-2 my-md-1 px-2">
              <input
                  type="submit"
                  class="form-control btn btn-interstellarium"
                  id="search"
                  value="Поиск"
              >
            </div>
          </form>
        </template>
        <template v-slot:content></template>
      </DashboardMain>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";

.interstellarium-search-form {
    font-family: var(--interstellarium-base-font-family), sans-serif;
}
</style>
