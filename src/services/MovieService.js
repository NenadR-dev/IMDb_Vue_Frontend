import axios from 'axios'
import {url} from './url.js'
import {parseError} from './ErrorParser.js'
export const getMovies = () => {
    return axios.get(`${url}/movies`)
        .then(response => {
            return response.data
        })
        .catch((e) => {
            throw parseError(e.response.data.errors)
        })
}

export const getMovieByID = id => {
    return axios.get(`${url}/movies/${id}`)
        .then(response => {
            return response.data
        })
        .catch((err) => {
            throw parseError(err.response.data.errors)
        })
}

export const getNextMoviePage = (url) => {
    return axios.get(url)
        .then(response => {
            return response.data
        })
        .catch(err => {
            throw parseError(err.response.data.errors)
        })
}