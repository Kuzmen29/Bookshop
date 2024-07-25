import React, { useContext, useEffect, useReducer, useState } from 'react';

import { createContext } from "react";
import { IUser } from '../types/user.type';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);
export const AuthToggleContext = createContext(null);
export const AuthLocalStorageContext = createContext(null);

export function useIsAuthContext(){
    return useContext(AuthContext);
};
export function useIsAuthToggleContext() {
    return useContext(AuthToggleContext);
}
export function useIsAuthLocalStorageContext() {
    return useContext(AuthLocalStorageContext);
}

// const LOGIN = 'login';
// const LOGOUT = 'logout';

// const reducer = (state: any, action: any) => {
//     switch (action.type) {
//         case 'login': return { ...state, isAuth: true };
//         case 'logout': return { ...state, isAuth: false }
//         default: return state;
//     }
// }

interface IAuthProviderProps {
    children: React.ReactNode
}


export function AuthProvider({ children }: IAuthProviderProps) {

    const [isAuth, setIsAuth] = useState<IUser>(null);

    const [localStorageUser,setLocalStorageUser] = useLocalStorage('BookshopUser', null);

    useEffect(()=>{
        if (localStorageUser) {
            setIsAuth(localStorageUser)
        }
    },[])

    return (
        <AuthContext.Provider value={isAuth}>
            <AuthToggleContext.Provider value={setIsAuth}>
                <AuthLocalStorageContext.Provider value={setLocalStorageUser}>
                {
                    children
                }
                </AuthLocalStorageContext.Provider>
            </AuthToggleContext.Provider>
        </AuthContext.Provider>
    );
}