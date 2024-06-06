import { defineStore } from "pinia"

export const useWorksStore = defineStore("works", {
    state: ()=> ({
        filters: {
            name: "",
            minCost: null,
            maxCost: null
        },
        works: []
    })
})
