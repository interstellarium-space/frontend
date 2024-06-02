import { defineStore } from "pinia"

export const useUsersStore = defineStore("users", {
    state: ()=> ({
        filters: {
            name: "",
            birthdateFrom: null,
            birthdateTo: null
        },
        users: []
    })
})
