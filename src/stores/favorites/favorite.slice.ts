import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: string[] = []

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, { payload: bookID } : PayloadAction<string>) => {
            state.push(bookID)
        },
    }
})

export const { actions: favoritesActions, reducer: favoritesReducer } = favoritesSlice;
