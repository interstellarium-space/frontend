import { defineStore } from "pinia"

export const useContractsStore = defineStore("contracts", {
    state: ()=> ({
        filters: {
            name: "",
            startDate: null,
            finishDate: null
        },
        contracts: []
    })
})
