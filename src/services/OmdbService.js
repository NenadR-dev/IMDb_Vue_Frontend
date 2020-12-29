import axios from "axios"
class OmdbService {
    constructor() {
        this.url = process.env.VUE_APP_OMDB_URL;
        this.apiKey = process.env.VUE_APP_OMDB_API_KEY;
        this.omdbAxios = axios.create({
            headers: null
        });
    }
    async OMDBget(params) {
        return await this.omdbAxios.get(`${this.url}?apikey=${this.apiKey}&t=${params}`)
            .then(response => {
                return response.data;
            });
    }
    async GetMoviePoster(url, title) {
        return await this.omdbAxios.get(`${url}`, {
            responseType: 'blob'
        })
            .then(response => {
                return new File([response.data], `${title}.jpg`, { type: 'image/jpeg', $path: '' });
            })
    }
}
export default new OmdbService()