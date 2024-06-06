<script>
  import Main from "../../../components/dashboard/Main.vue";
  import Sidebar from "../../../components/dashboard/Sidebar.vue";
  import Header from "../../../components/dashboard/Header.vue";
  import Footer from "../../../components/dashboard/Footer.vue";
  import CreateUnit from "../../../components/dashboard/buttons/CreateUnit.vue";

  import { APIGroupsCreate } from "../../../services/api/groups/Create.js";

  export default {
    components: {
      CreateUnit,
      Main,
      Sidebar,
      Header,
      Footer
    },

    setup() {
      document.title = "Создать группу | Interstellarium"
    },

    data() {
      return {
        form: {
          name: "",
        },
        msg: "",
        inProgress: false
      }
    },

    methods: {
      redirectToGroup(group) {
        this.$router.push({ name: "GroupProfile", params: { groupId: group.id } })
      },

      formIsValid() {
        if (this.name === "") {
          this.msg = "Пожалуйста, введите название группы"
          return false
        }
        this.msg = ""
        return true
      },

      async createGroup() {
        if (this.formIsValid()) {
          this.inProgress = true
          this.msg = ""

          let response = await APIGroupsCreate(this.form)

          if (response.isOk) {
            this.redirectToGroup(response.data)
          } else {
            this.msg = response.msg

            if (response.code === 401) {
              this.$router.push({ name: "AuthLogout" })
            }
          }

          this.inProgress = false
        }
      },
    }
  }
</script>

<template>
  <div class="interstellarium-container">
    <div class="interstellarium-dashboard">
      <Header></Header>
      <Sidebar></Sidebar>

      <Main>
        <template v-slot:tools></template>

        <template v-slot:content>
          <form @submit.prevent="" autocomplete=off class="interstellarium-dashboard-edit-form">
            <div class="interstellarium-dashboard-edit-form-content">
              <div class="interstellarium-dashboard-edit-form-header">
                Новая группа
              </div>
              <div class="row">
                <div class="col-12">
                  <input
                      v-model="this.form.name"
                      class="form-control mb-3"
                      type="text"
                      placeholder="Название"
                      required
                  >
                </div>
              </div>
              <div v-show="this.inProgress" class="text-center mb-3">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div v-show="this.msg" class="text-danger text-center mb-3">
                {{ this.msg }}
              </div>
              <div class="row">
                <div class="col-12 d-flex justify-content-center">
                  <input
                      @click="this.createGroup()"
                      class="btn btn-interstellarium rounded-pill fw-bold px-3"
                      type="submit"
                      value="Создать"
                  >
                </div>
              </div>
            </div>
          </form>
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

.interstellarium-dashboard-main {
    top: 5rem;
    display: flex;
    justify-content: center;
}
</style>
