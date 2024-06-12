<script>
  import { APIDepartmentsGet } from "../../../services/api/departments/Get.js";

  import Dialog from "../Dialog.vue";

  export default {
    components: {
      Dialog
    },

    props: ['id', 'onSelect'],

    data() {
      return {
        departments: [],
        searchFilters: {
          name: ""
        },
        searchIsInProgress: false,
        searchMessage: ""
      }
    },

    setup(props) {
      const id = props.id
      const onSelect = props.onSelect
      return { id, onSelect }
    },

    methods: {
      searchFormIsValid() {
        if (this.searchFilters.name === "") {
          this.searchFilters.name = null
        }
        return true
      },

      select(department) {
        this.onSelect(department.id)
      },

      async search() {
        if (this.searchFormIsValid()) {
          this.searchIsInProgress = true
          this.departments = []
          this.searchMessage = ""

          let response = await APIDepartmentsGet(this.searchFilters)

          if (response.isOk) {
            this.departments = response.data
          } else {
            this.searchMessage = response.msg
          }

          this.searchIsInProgress = false
        }
      }
    }
  }
</script>

<template>
  <Dialog :id="this.id">
    <template v-slot:dialog-header>
      <form class="w-100 interstellarium-search-form p-1" @submit.prevent="" autocomplete=off>
        <div class="row">
          <div class="col-9 col-sm-8 col-lg-9 my-1 px-1 px-sm-2">
            <input v-model="this.searchFilters.name" type="text"
                class="form-control"
                placeholder="Название отдела"
            >
          </div>
          <div class="col-3 col-sm-4 col-lg-3 my-1 px-1 px-sm-2">
            <input @click="this.search()" type="submit"
                class="form-control btn btn-interstellarium"
                value="Поиск"
            >
          </div>
        </div>
      </form>
    </template>

    <template v-slot:dialog-body>
      <div v-show="this.searchIsInProgress" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-show="this.searchMessage" class="interstellarium-error text-danger text-center">
        {{ this.searchMessage }}
      </div>
      <div v-for="department in this.departments" @click="this.select(department)" data-bs-dismiss="modal" class="interstellarium-unit-clickable-card">
        <a class="interstellarium-unit-link">
          {{ department.name }}
        </a>
      </div>
    </template>

    <template v-slot:dialog-footer>
      <button class="btn btn-interstellarium rounded-pill" data-bs-dismiss="modal">
        Отмена
      </button>
    </template>
  </Dialog>
</template>

<style scoped>
@import "/src/styles/style.css";
@import "/src/styles/dashboard.css";
</style>
