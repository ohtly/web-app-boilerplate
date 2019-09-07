const TOKEN_KEY = 'access_token'

const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken)
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    }
}

export { TokenService }