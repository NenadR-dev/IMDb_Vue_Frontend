import axios from 'axios'
import { url } from './url.js'
import { parseError } from './ErrorParser.js'
import { config } from './AuthService.js'

export const genres = [
    { value: "Action", text: "Action" },
    { value: "Adventure", text: "Adventure" },
    { value: "Drama", text: "Drama" },
    { value: "Thriller", text: "Thriller" },
    { value: "Mistery", text: "Mistery" },
    { value: "Horror", text: "Horror" },
    { value: "Sci-fi", text: "Sci-fi" },
]

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

export const addMovie = (data) => {
    let movieData = new FormData()
    movieData.append('imageCover', data.imageCover)
    movieData.append('title', data.title)
    movieData.append('description', data.description),
        movieData.append('genre', data.genre)

    return axios.post(`${url}/movies`, movieData, config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            throw parseError(err.response.data.errors)
        })
}

export const likeMovie = (data) => {
    return axios.post(`${url}/likeMovie`,data,{
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })
    .then(response => {
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}
export const removeLike = (data) => {
    return axios.put(`${url}/likeMovie/${data.movieId}`,data,{
        headers:{
            Authorization: `Bearer ${getToken()}`
        }
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
}