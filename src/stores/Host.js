import { defineStore } from 'pinia';

export const useHostStore = defineStore('host', {
    state: ()=> ({
        protocol: 'http',
        host: '127.0.0.1',
        port: '8000'
    })
})
