import { INewUser, IUserLogin } from "../../types/user.type";
import { API } from "./api";


const userAPI = API.injectEndpoints({
    endpoints : (builder)=> ({
        login: builder.mutation<null,IUserLogin>({
            query: (body : IUserLogin) => ({
                body : {user : body},
                url: '/user',
                method: 'POST'
            }),
            transformResponse: (response:any) =>{
                return response.data
            }
        }),
        hasNickname : builder.mutation<null,string>({
            query: (body : string) => ({
                body : {nickname : body},
                url: '/user/nickname',
                method: 'POST'
            }),
            transformResponse: (response:any) =>{
                return response.data
            }
        }),
        register : builder.mutation<null,INewUser>({
            query: (body : INewUser) => ({
                body : {user : body},
                url: '/user',
                method: 'PUT'
            }),
            transformResponse: (response:any) =>{
                return response.data
            }
        }),
        
    })
})

export const { useLoginMutation, useHasNicknameMutation, useRegisterMutation } = userAPI;