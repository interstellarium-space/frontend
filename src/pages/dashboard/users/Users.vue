<script>
  import { useUsersStore } from "../../../stores/dashboard/Users.js";
  
  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  
  import Search from "../../../components/dashboard/forms/Search.vue";
  import CreateUnit from "../../../components/dashboard/buttons/CreateUnit.vue";
  
  import { APIUsersGet } from "../../../services/api/users/Get.js";
  
  export default {
    components: {
      CreateUnit,
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
      redirectToUser(user) {
      
      },
      
      searchFormIsValid() {
        if (this.store.filters.name === "") {
          this.store.filters.name = null
        }
        if (this.store.filters.birthdateFrom === "") {
          this.store.filters.birthdateFrom = null
        }
        if (this.store.filters.birthdateTo === "") {
          this.store.filters.birthdateTo = null
        }
        return true
      },
      
      async searchUsers() {
        if (this.searchFormIsValid()) {
          let response = await APIUsersGet(this.store.filters)
          
          if (response.isOk) {
            this.store.users = response.data
          } else {
            console.log(response.msg)
            
            if (response.code === 401) {
              this.$router.push({ name: "AuthLogout" })
            }
          }
          
          console.log(response)
        }
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
              <div class="col-5 col-sm-8 col-lg-9 my-1 px-1 px-sm-2">
                <input v-model="store.filters.name" type="text"
                    class="form-control"
                    placeholder="Имя пользователя"
                >
              </div>
              <div class="col-4 col-sm-2 my-1 px-1 px-sm-2">
                <input @click="this.searchUsers()" type="submit"
                    class="form-control btn btn-interstellarium"
                    value="Поиск"
                >
              </div>
            </template>
            
            <template v-slot:filters>
              <div class="col-6 my-1 px-1 px-sm-2">
                <input v-model="this.store.filters.birthdateFrom" type="text"
                    class="form-control"
                    placeholder="С даты рождения"
                    onfocus="this.type='date'"
                >
              </div>
              <div class="col-6 my-1 px-1 px-sm-2">
                <input v-model="this.store.filters.birthdateTo" type="text"
                    class="form-control"
                    placeholder="По дату рождения"
                    onfocus="this.type='date'"
                >
              </div>
            </template>
          </Search>
        </template>
        
        <template v-slot:content>
          <div v-for="user in this.store.users" class="interstellarium-unit-card">
            <a @click="this.redirectToUser(user)" class="interstellarium-unit-link">
              {{ user.name }}
            </a>
            <div v-if="user.department.id" class="interstellarium-unit-description">
              Отдел: {{ user.department.name }}
            </div>
            <div v-else class="interstellarium-unit-description">
              Отдел: не назначен
            </div>
          </div>
        </template>
      </Main>
      
      <Footer>
        <template v-slot:tools>
          <CreateUnit unit-class-name="User"></CreateUnit>
        </template>
      </Footer>
    </div>
  </div>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
