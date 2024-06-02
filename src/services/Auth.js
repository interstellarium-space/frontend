export function login(user, token) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
}

export function logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
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

export function isAdmin(user) {
    if (user === undefined || user == null)
        return false
    return (user.is_admin === true || user.is_superuser === true)
}