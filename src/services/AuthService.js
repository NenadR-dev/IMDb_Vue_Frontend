import axios from 'axios'
import {url} from './url.js'
import router from '../router/router.js'

export const Register = (data) => {
    return axios.post(`${url}/user`, data)
        .then(() => {
            router.push('/login')
        })
        .catch((err) => {
            return [err.response.data.errors]
        })
}