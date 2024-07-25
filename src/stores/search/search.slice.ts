import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : null | string = null;

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchByQuery: (state, { payload: query} : PayloadAction<string>) => {
            return query;
        },
    }
})

export const { actions: searchActions, reducer: searchReducer } = searchSlice;