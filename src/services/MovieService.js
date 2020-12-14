import axios from 'axios'
import {url} from './url.js'

export const getMovies = () => {
    return axios.get(`${url}/movies`)
        .then(response => {
            return response.data
        })
        .catch(() => {
            return []
        })
}