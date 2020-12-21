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

export const calculateMovieLikes = (data) => {
    let likes = 0
    let dislikes = 0
    data.forEach(like => {
        if (like.liked === 1) {
            likes += 1
        } else {
            dislikes += 1
        }
    })
    return [likes, dislikes]
}

export const getMovies = () => {
    return axios.get(`${url}/movies`)
        .then(response => {
            return response.data
        })
        .catch((e) => {
            throw parseError(e.response.data.errors)
        })
}

export const filterMovies = (filter) => {
    return axios.get(`${url}/movies/?filter=${filter}`)
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
    return axios.post(`${url}/auth/likeMovie`, data, config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            throw parseError(err.response.data.errors)
        })
}
export const removeLike = (data) => {
    return axios.delete(`${url}/auth/likeMovie/${data.movieId}`, config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            throw parseError(err.response.data.errors)
        })
}

export const getMyMovieLikes = () => {
    return axios.get(`${url}/auth/likeMovie`, config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            throw parseError(err.response.data.errors)
        })
}

export const postUserComment = (data) => {
    return axios.post(`${url}/auth/commentMovie`,data,config)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return parseError(err.response.data.errors)
        })
}