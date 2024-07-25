export interface IBookReview {
    "name_user": string
    "full_date": string,
    "raiting": number,
    "title": string,
    "text": string,
    "plus": string,
    "minus": string,
    "like": number,
    "dislike": number
}

export interface IUserComment {
    rating: number | null,
    header: string,
    text: string,
    plus: string,
    minus: string,
}