import { IBookReview, IUserComment } from "./comment.type";

export interface IBook {

    "id_book": string;
    "section": string;
    "place": string;
    "name_book": string;
    "name_author": string;
    "surname_author": string;
    "fathername_author": string;
    "genre": string;
    "publishing_house": string;
    "year_publication": number;
    "city_publication": string;
    "number_pages": number;
    "price": string;
    "A": string;
    "B": string;
    "C": string;
    "D": string;
    "E": string;
    "G": string;
    "H": string;
    "codeNew": string;
    "codeOld": string;
    "УДК": string;
    "ББК": string;
    "ISBN": string;
    "imgs": string[];
    "tokens": string[] | number;
    "comments": IBookReview[];
    "new_price": number;
}