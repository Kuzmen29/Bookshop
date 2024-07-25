import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = false;

const registrationWindowSlice = createSlice({
    name : 'registrationWindow',
    initialState,
    reducers: {
        toggleRegistrationWindow : (state, { payload: flag} : PayloadAction<boolean>) => {
            return flag
        }
    }
})

export const { actions: registrationWindowActions, reducer: registrationWindowReducer } = registrationWindowSlice;