import axios from 'axios'
import { parseError } from './ErrorParser';
import TokenService from './TokenService.js'
class HttpClient {
    constructor() {
        this.url = 'http://localhost:8000/api'
        this.setAuthorizationHeader()
    }
    setAuthorizationHeader(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${TokenService.getToken()}`; 
    }
    async get(route) {
        return axios.get(`${this.url}/${route}`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw parseError(err.response.data.errors);
            });
    }
    async getNextPage(pageUrl){
        return axios.get(pageUrl)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw parseError(err.response.data.errors);
        });
    }
    async post(route, payload) {
        return axios.post(`${this.url}/${route}`,payload)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw parseError(err.response.data.errors);
            })
    }

    async put(id, payload) {
        return axios.put(`${this.url}/${id}`,payload)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw parseError(err.response.data.errors);
            })
    }
    async delete(route,id) {
        return axios.delete(`${this.url}/${route}/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                throw parseError(err.response.data.errors);
            })
    }
}
export default new HttpClient()