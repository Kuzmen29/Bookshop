import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = false;

const loginWindowSlice = createSlice({
    name : 'loginWindow',
    initialState,
    reducers : {
        toggleLoginWindow : (state, { payload: flag} : PayloadAction<boolean>) => {
            return flag
        },
        closeLoginWindow : (state, { payload: flag} : PayloadAction<boolean>) => {
            return false
        },
    }
})

export const { actions: loginWindowActions, reducer: loginWindowReducer } = loginWindowSlice;