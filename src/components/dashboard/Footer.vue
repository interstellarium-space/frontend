<script>
  import { getUser, isAdmin } from "../../services/Auth.js";
  
  import ToggleSidebar from "./buttons/ToggleSidebar.vue";
  import CreateEntity from "./buttons/CreateEntity.vue";
  
  export default {
    components: {
      CreateEntity,
      ToggleSidebar
    },
    
    props: {
      entity: String
    },
    
    setup(props) {
      let entity = props.entity
      let userIsAdmin = isAdmin(getUser())
      return { entity, userIsAdmin }
    }
  }
</script>

<template>
  <div class="interstellarium-dashboard-footer" id="dashboard-footer">
    <ToggleSidebar></ToggleSidebar>
    <CreateEntity v-if="this.userIsAdmin && this.entity" :entity="this.entity"/>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
