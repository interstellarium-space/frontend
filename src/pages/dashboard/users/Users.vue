<script>
  import { useUsersStore } from "../../../stores/dashboard/Users.js";
  
  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  
  import Search from "../../../components/dashboard/forms/Search.vue";
  
  
  export default {
    components: {
      Search,
      Main,
      Sidebar,
      Header,
      Footer
    },
    
    setup() {
      document.title = "Пользователи | Interstellarium"
      const store = useUsersStore()
      return { store }
    },
    
    methods: {
      async searchUsers() {
      
      }
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <Header></Header>
      <Sidebar></Sidebar>
      
      <Main>
        <template v-slot:tools>
          <Search>
            <template v-slot:search>
              <div class="col-5 col-sm-8 col-lg-9 my-2 my-md-1 px-1 px-sm-2">
                <input type="text" class="form-control" placeholder="Введите имя пользователя">
              </div>
              <div class="col-4 col-sm-2 my-2 my-md-1 px-1 px-sm-2">
                <input @click="this.searchUsers()" type="submit" class="form-control btn btn-interstellarium" value="Поиск">
              </div>
            </template>
            
            <template v-slot:filters>
              <div class="col-6 my-2 my-md-1 px-1 px-sm-2">
                <input type="text" class="form-control" placeholder="С даты рождения" onfocus="this.type='date'">
              </div>
              <div class="col-6 my-2 my-md-1 px-1 px-sm-2">
                <input type="text" class="form-control" placeholder="По дату рождения" onfocus="this.type='date'">
              </div>
            </template>
          </Search>
        </template>
        
        <template v-slot:content>
        
        </template>
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
