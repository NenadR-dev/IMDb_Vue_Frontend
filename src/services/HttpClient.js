import axios from "axios";

export default class HttpClient {
    constructor() {
        this.setAuthorizationHeader();
    }

    setAuthorizationHeader() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    }

    post() {

    }
    get() {
        return 
    }
    put() {

    }
    delete() {
        
    }

}