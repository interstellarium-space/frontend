import axios from "axios"

import { prepareAPIRequest } from "../../Utils.js";

export async function APIDepartmentsUpdateEquipment(departmentId, equipmentId) {
    let request = prepareAPIRequest(`/api/departments/${departmentId}/equipment`)
    let response = {}

    try {
        response = await axios.put(request.url, {
            id: equipmentId,
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
            case 400: data.msg = "Некорректный запрос"; break
            case 401: data.msg = "Требуется авторизация"; break
            case 403: data.msg = "Доступ запрещен!"; break
            case 404: data.msg = "Объект не найден"; break
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
