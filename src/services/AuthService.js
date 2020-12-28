import router from '../router/router.js';
import HttpClient from './HttpClient.js'
import TokenService from './TokenService.js';
import store from '../store'
class AuthService {
    constructor() {

    }
    register = async (data) => {
        return await HttpClient.post(data);
    }
    login = async (data) => {
        return await HttpClient.post('login', data)
            .then(async response => {
                TokenService.setToken(response.access_token);
                HttpClient.setAuthorizationHeader();
                await this.getUser();
                router.push('/movielist');
            })
    }
    getUser = async () => {
        return await HttpClient.post('me',null)
            .then(response => {
                store.dispatch('setUserCredentials',response);
            })
    }
    logout = async () => {
        await HttpClient.post('logout');
        TokenService.deleteToken();
        router.push('/');
    }
}
export default new AuthService()