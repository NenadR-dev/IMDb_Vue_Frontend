import HttpClient from './HttpClient.js'

export const genres = [
    { value: "Action", text: "Action" },
    { value: "Adventure", text: "Adventure" },
    { value: "Drama", text: "Drama" },
    { value: "Thriller", text: "Thriller" },
    { value: "Mistery", text: "Mistery" },
    { value: "Horror", text: "Horror" },
    { value: "Sci-fi", text: "Sci-fi" },
]

class MovieService {
    constructor(){

    }
    calculateMovieLikes = (data) => {
        let likes = 0;
        let dislikes = 0;
        data.forEach(like => {
            if (like.liked === 1) {
                likes += 1;
            } else {
                dislikes += 1;
            }
        })
        return [likes, dislikes];
    }
    
    getMovies = async () => {
        return await HttpClient.get('movies');
    }
    
    filterMovies = async (filter) => {
        return await HttpClient.get(`movies/?filter=${filter}`);
    }
    
    getMovieByID = async id => {
        return await HttpClient.get(`movies/${id}`);
    }
    
    getNextPage = async (url) => {
        return await HttpClient.getNextPage(url);
    }
    
    addMovie = async (data) => {
        let movieData = new FormData();
        movieData.append('imageCover', data.imageCover);
        movieData.append('title', data.title);
        movieData.append('description', data.description);
        movieData.append('genre', data.genre);
    
        return await HttpClient.post('movies',movieData);
    }
    
    likeMovie = async (data) => {
        return await HttpClient.post('likeMovie',data);
    }
    removeLike = async (data) => {
        return await HttpClient.delete(`likeMovie/${data.movieId}`);
    }
    
    getMyMovieLikes = async () => {
        return await HttpClient.get('likeMovie');
    }
    
    postUserComment = async (data) => {
        return await HttpClient.post('commentMovie',data);
    }
    
    getMovieCommentsById = async(id) => {
        return await HttpClient.get(`commentMovie/${id}`)
    }
}

export default new MovieService()