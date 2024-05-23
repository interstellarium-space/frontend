import { projectConfig } from '../common/index.js';

export function prepareAPIRequest(api_path) {
    let protocol = projectConfig.protocol
    let host = projectConfig.host
    let port = projectConfig.port
    let url = `${protocol}://${host}:${port}${api_path}`
    let token = localStorage.getItem('token')

    let config = {}

    if (token != null)
        config['headers'] = { Authorization: `Bearer ${token}` }
    return { url, config }
}
