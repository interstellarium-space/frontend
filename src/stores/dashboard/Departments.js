import { defineStore } from "pinia"

export const useDepartmentsStore = defineStore("departments", {
    state: ()=> ({
        filters: {
            name: "",
        },
        departments: []
    })
})
