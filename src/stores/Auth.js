import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: ()=> ({
        user: {
            email: String,
            password: String
        }
       }
    ),
    actions: {
        isLogin(){
            return this.user.email != null
        },
        login(name, password){
            this.user.email = name
            this.user.password = password
        }
    }
})
