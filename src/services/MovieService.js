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

export const getMovieByID = id => {
    return axios.get(`${url}/movies/${id}`)
        .then(response => {
            return response.data
        })
        .catch((err) => {
            throw [err.response.data.errors]
        })
}