import { defineStore } from "pinia"

export const useProjectsStore = defineStore("projects", {
    state: ()=> ({
        filters: {
            name: "",
            startDate: null,
            finishDate: null
        },
        projects: []
    })
})
