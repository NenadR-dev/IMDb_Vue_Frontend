import axios from 'axios'
import { url } from './url.js'
import router from '../router/router.js'
import {parseError} from './ErrorParser.js'

const setToken = (token) => {
    window.localStorage.setItem('jwtToken', token)
}

const deleteToken = () => {
    window.localStorage.removeItem('jwtToken')
}
export const getToken = () => {
    return window.localStorage.getItem('jwtToken')
}

export const Register = (data) => {
    return axios.post(`${url}/user`, data)
        .then(() => {
            router.push('/login')
        })
        .catch((err) => {
           throw parseError(err.response.data.errors)
        })
}

export const Login = (data) => {
    axios.post(`${url}/auth/login`, data)
        .then(response => {
            setToken(response.data.access_token)
            router.push('/')
        })
        .catch(err => {
            throw [err.response.data.errors]
        })
}

export const Logout = () => {
    axios.post(`${url}/auth/logout`, null, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    .then(() => {
        deleteToken()
        router.push({ name: 'home' })
    })
    .catch(err => {
        throw [err.response.data.errors]
    })
}