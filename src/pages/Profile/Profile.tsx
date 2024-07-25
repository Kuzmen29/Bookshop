import React, { useEffect } from 'react';

import classes from './Profile.module.scss'
import { useIsAuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../types/user.type';

export default function Profile() {
    
    const navigate = useNavigate();

    const isAuth = useIsAuthContext();

    useEffect(()=>{
        if (!isAuth) {
            navigate('/')
        }
    },[])
    
    
    return (
        isAuth && <h2>{isAuth.nickname}</h2>
    );
}