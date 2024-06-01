import axios from "axios"

import { prepareAPIRequest } from "../Utils.js";

export async function APIAuthLogin(email, password) {
    let request = prepareAPIRequest("/api/auth/login")
    let response = {}

    try {
        response = axios.post(request.url, {
            email: email,
            password: password
        }, request.config)
    } catch (error) {
        return loginError(error)
    }

    if (response && response.status === 200) {
        return {"isOk": true, "data": response.data, "msg": "Ok!"}
    }
}

function loginError(error) {
    let data = {"isOk": false, "data": {}, "msg": ""}

    if (error.response) {
        switch (error.response.status) {
            case 400: data.msg = "Не правильно введен пароль"; break
            case 404: data.msg = "Не правильно введен логин"; break
            default: data.msg = "Ошибка при отправке запроса... Уже исправляем!"
        }
    } else if (error.request) {
        data.msg = "Ошибка при отправке запроса... Уже исправляем!"
    } else {
        data.msg = "Ошибка при отправке запроса... Уже исправляем!"
    }
}
