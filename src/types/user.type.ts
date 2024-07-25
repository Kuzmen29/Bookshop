export interface IUserLogin {
    nickname: string,
    password: string,
}

export interface IUser {
    id:string
    nickname: string,
    email: string,
    birthday:string,
}
export interface IUserRegistration {
    id:string
    nickname: string,
    email: string,
    birthday:string,
    password : string,
}

export interface INewUser {
    nickname: string,
    email: string,
    birthday: Date,
    password: string,
    repeatedPassword : string,
}