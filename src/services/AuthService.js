import router from '../router/router.js';
import HttpClient from './HttpClient.js'
import TokenService from './TokenService.js';

class AuthService {
    constructor() {

    }
    register = async (data) => {
        return await HttpClient.post(data);
    }
    login = async (data) => {
        return await HttpClient.post('login', data)
            .then(response => {
                TokenService.setToken(response.access_token)
                router.push('/movielist');
            })
    }
    logout = async () => {
        await HttpClient.post('logout');
        TokenService.deleteToken();
        router.push('/');
    }
}
export default new AuthService()