import axios from "axios"

import { prepareAPIRequest } from "../Utils.js";

export async function APIAuthLogin(email, password) {
    let request = prepareAPIRequest("/api/auth/login")
    let response = {}

    try {
        response = await axios.post(request.url, {
            email: email,
            password: password
        }, request.config)
    } catch (error) {
        return loginError(error)
    }

    if (response && response.status === 200) {
        return {isOk: true, data: response.data, msg: "Ok!", code: 200}
    }
}

function loginError(error) {
    let data = {isOk: false, data: {}, msg: "", code: null}

    if (error.response) {
        switch (error.response.status) {
            case 400: data.msg = "Неверный пароль"; break
            case 403: data.msg = "Доступ запрещен!"; break
            case 404: data.msg = "Неверный логин"; break
            default: data.msg = "Ошибка при отправке запроса... Уже исправляем!"
        }
        data.code = error.response.status
    } else if (error.request) {
        data.msg = "Ошибка при отправке запроса... Уже исправляем!"
    } else {
        data.msg = "Ошибка при отправке запроса... Уже исправляем!"
    }
    return data
}
