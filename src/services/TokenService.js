class TokenService{
    constructor() {
        this.token = ''
    }
    setToken = (token) => {
        window.localStorage.setItem('jwtToken', token)
    }
    deleteToken = () => {
        window.localStorage.removeItem('jwtToken')
    }
    getToken = () => {
        return window.localStorage.getItem('jwtToken')
    }
}
export default new TokenService();