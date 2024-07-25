import axios from "axios";

import { HOST, PORT, SERVER_API } from "./paths";

export class NewsService {

    static async getLastNews() {
        try {
            let response = (await axios.get(HOST + PORT + SERVER_API + '/news')).data;
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw error;
            }
        }
    }

}