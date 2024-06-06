import { defineStore } from "pinia"

export const useGroupsStore = defineStore("groups", {
    state: ()=> ({
        filters: {
            name: "",
        },
        groups: []
    })
})
