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

export function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
