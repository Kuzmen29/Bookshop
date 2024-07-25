import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { favoritesReducer } from "./favorites/favorite.slice";

import { createLogger } from "redux-logger";
import { API } from "./api/api";
import { searchReducer } from "./search/search.slice";
import { loginWindowReducer } from "./loginWindow/loginWindow";
import { registrationWindowReducer } from "./registrationWindow/registrationWindow";

const logger = createLogger({
    collapsed: true,
})

const reducers = combineReducers({
    favorites : favoritesReducer,
    search : searchReducer,
    loginWindow : loginWindowReducer,
    registrationWindow : registrationWindowReducer,
    [API.reducerPath] : API.reducer,
})

export const store = configureStore({
    reducer: reducers,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(API.middleware).concat(logger),
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch