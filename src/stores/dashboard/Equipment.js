import { defineStore } from "pinia"

export const useEquipmentStore = defineStore("equipment", {
    state: ()=> ({
        filters: {
            name: "",
        },
        equipment: []
    })
})
