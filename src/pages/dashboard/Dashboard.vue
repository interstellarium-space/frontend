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
      
      <Main>
        <template v-slot:tools></template>
        <template v-slot:content></template>
      </Main>
      
      <Footer>
        <template v-slot:tools></template>
      </Footer>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
