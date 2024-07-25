import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_API, HOST, PORT } from '../../API/paths';

export const API = createApi({
    reducerPath: 'API',
    baseQuery: fetchBaseQuery({
        baseUrl: HOST + PORT + SERVER_API,
    }),
    endpoints: builder => ({
    })
})

export const { } = API;