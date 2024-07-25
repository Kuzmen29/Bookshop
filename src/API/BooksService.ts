import axios from "axios";
import { HOST, PORT, SERVER_API } from "./paths";
import { IBasket } from "../pages/Basket/Basket";

export class BooksService {

    static async getAllBooks(page: number, limit: number) {
        try {
            let response = (await axios.get(HOST + PORT
                + SERVER_API + '/books' + '?' + 'page=' + page + '&' + 'limit=' + limit))
                .data
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw error;
            }
        }
    }
    static async getBook(bookID: string) {
        try {
            let response = (await axios.get(HOST + PORT
                + SERVER_API + '/book' + '/' + bookID))
                .data
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw error;
            }
        }
    }
    static async getBooksByLetter(letter: string) {
        try {
            let response = (await axios.get(HOST + PORT
                + SERVER_API + '/search/letter' + '?' + 'letter=' + letter))
                .data
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw error;
            }
        }
    }
    static async getBooksBySearch(query: string) {
        try {
            let response = (await axios.get(HOST + PORT
                + SERVER_API + '/search' + '?' + 'query=' + query))
                .data
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            } else {
                throw error;
            }
        }
    }

    static async getBooksFromBasket(booksIDs: IBasket[]) {
        try {
            let response = (await axios({
                method: 'post',
                url: HOST + PORT + SERVER_API + '/basket',
                data: { data: booksIDs }
            })).data
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