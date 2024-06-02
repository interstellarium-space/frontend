import axios from "axios"

import { prepareAPIRequest } from "../Utils.js";

export async function APIUsersGetAll(filters) {
    let request = prepareAPIRequest("/api/users")
    let response = {}

    try {
        response = await axios.post(request.url, {
            name: filters.name,
            birthdate_from: filters.birthdateFrom,
            birthdate_to: filters.birthdateTo
        }, request.config)
    } catch (error) {
        return handleError(error)
    }

    if (response && response.status === 200) {
        return {isOk: true, data: response.data, msg: "Ok!", code: 200}
    }
}

function handleError(error) {
    let data = {isOk: false, data: {}, msg: "", code: null}

    if (error.response) {
        switch (error.response.status) {
            case 400: data.msg = "Не правильные данные запроса"; break
            case 401: data.msg = "Требуется авторизация"; break
            case 404: data.msg = "Ничего не нашлось"; break
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
