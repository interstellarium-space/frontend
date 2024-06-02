import { projectConfig } from "../../common/config.js";

export function prepareAPIRequest(api_path, queryParams) {
    let protocol = projectConfig.protocol
    let host = projectConfig.host
    let port = projectConfig.port
    let url = `${protocol}://${host}:${port}${api_path}`
    let token = localStorage.getItem("token")

    let config = {}

    if (token != null) {
        config["headers"] = { Authorization: `Bearer ${token}` }
        config["params"] = queryParams
    }
    return { url, config }
}
