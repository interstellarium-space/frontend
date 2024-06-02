<script>
  import Main from "../../components/dashboard/Main.vue";
  import Sidebar from "../../components/dashboard/Sidebar.vue";
  import Header from "../../components/dashboard/Header.vue";
  import Footer from "../../components/dashboard/Footer.vue";
  
  export default {
    components: {
      Main,
      Sidebar,
      Header,
      Footer
    },
    
    beforeCreate: function() {
        document.body.classList.add("dashboard")
        document.getElementById("app").classList.add("dashboard")
    },
    
    beforeRouteLeave: function () {
        document.body.classList.remove("dashboard")
        document.getElementById("app").classList.remove("dashboard")
    },
    
    setup() {
      document.title = "Dashboard | Interstellarium"
    },
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <Header></Header>
      <Sidebar></Sidebar>
      <Main></Main>
      <Footer></Footer>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
