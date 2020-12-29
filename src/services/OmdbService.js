import axios from "axios"

class OmdbService {
    constructor(){
        this.url = "http://www.omdbapi.com/"
        this.omdbAxios = axios.create({
            headers: null
        });
    }
    unsetAuthorizationHeader(){
        delete axios.defaults.headers.common["Authorization"];
    }
    async OMDBget(params) {
        return await this.omdbAxios.get(`${this.url}?apikey=${process.env.VUE_APP_OMDB_API_KEY}&t=${params}`)
            .then(response => {
                return response.data;
            });
    }
    async GetMoviePoster(url, title){
        return await this.omdbAxios.get(`${url}`,{
            responseType: 'blob'
        })
            .then(response => {
                const file = new File([response.data], `${title}.jpg`, {type: 'image/jpeg', $path: ''});
                return file;
            })
    }
}

export default new OmdbService()