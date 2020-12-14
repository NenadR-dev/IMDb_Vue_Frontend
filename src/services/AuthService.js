import axios from 'axios'
import {url} from './url.js'
import router from '../router/router.js'

export const Register = (data) => {
    axios.post(`${url}/user`, data)
        .then(() => {
            router.push('/login')
        })
}