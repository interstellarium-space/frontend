export function login(user, token) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
}

export function logout() {
    localStorage.setItem("user", null)
    localStorage.setItem("token", null)
}

export function getUser() {
    let userData = localStorage.getItem("user")
    if (userData)
        return JSON.parse(userData)
    return null
}

export function getToken() {
    return localStorage.getItem("token")
}
