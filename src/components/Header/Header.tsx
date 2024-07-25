import React, { useState } from 'react';

import styles from "./Header.module.scss";

import RedStar from './images/RedStar.png';
import OpenBook from './images/OpenBook.png';
import Basket from "./images/Basket.png";
import Transparency from './images/Transparency.png';
import UserLogin from './images/UserLogin.png';
import Favorites from './images/Favorites.png'

import { HeaderRoutes } from "../../router/index";
import { NavLink, useNavigate } from 'react-router-dom';
import { useBasketContext } from '../../context/BasketProvider';
import { useIsAuthContext } from '../../context/AuthProvider';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import useFavorites from '../../hooks/useFavorites';
import { IUser } from '../../types/user.type';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../stores/search/search.slice';
import { loginWindowActions } from '../../stores/loginWindow/loginWindow';
import { registrationWindowActions } from '../../stores/registrationWindow/registrationWindow';

export default function Header() {

    const { favorites } = useFavorites();

    const navigate = useNavigate();
    const { basket } = useBasketContext();

    const isAuth: IUser = useIsAuthContext();
    const loginWindow = useSelector((state: any) => state.loginWindow);
    const registrationWindow = useSelector((state: any) => state.registrationWindow);

    const searchQuery = useSelector((state: any) => state.search);
    const dispatch = useDispatch();

    return (

        <header className={styles.header}>
            
            {
                loginWindow && <Login/>
            }
            {
                registrationWindow && <Registration/>
            }

            <div className={styles.logo} onClick={() => navigate('/')}>
                <img className={styles.logo__image} src={RedStar} alt="Red star" />
                <img className={styles.logo__image} src={OpenBook} alt="Open book" />
                <h1 className={styles.logo__title}>Ликбез</h1>
            </div>

            <div className={styles.header__main}>

                <div className={styles.search} tabIndex={0}>
                    <input value={searchQuery}
                        onChange={(event) => {
                            if (!searchQuery) {
                                navigate(`/books/search`)
                            }
                            dispatch(searchActions.searchByQuery(event.target.value))
                        }}
                        className={styles.search__input} type="search" placeholder="Найти книгу или товар" />
                    <img className={styles.search__button} src={Transparency} alt="" />
                </div>

                <div className={styles.navigation}>
                    {
                        HeaderRoutes.map(route => {
                            return (
                                <NavLink
                                    key={route.path}
                                    to={route.path}
                                    className={({ isActive }) => isActive
                                        ? [styles['navigation__item_active'], styles['navigation__item']].join(' ')
                                        : [styles['navigation__item']].join(' ')}>
                                    {route.title}
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>

            <div className={styles.settings}>
                <div
                    className={[styles['settings__item'], styles.user].join(' ')}
                    onClick={() => {
                        if (isAuth) {
                            navigate('/profile')
                        } else {
                            dispatch(loginWindowActions.toggleLoginWindow(true));
                            dispatch(registrationWindowActions.toggleRegistrationWindow(false));
                        }
                    }}>
                    <img className={styles.user__image} src={UserLogin} alt="" />
                    <h2 className={styles.user__name}>  {isAuth ? isAuth.nickname : 'Войти'}</h2>
                </div>
                <div className={[styles['settings__item'], styles.basket].join(' ')} onClick={() => navigate('/basket')}>
                    <img className={styles.basket__image} src={Basket} alt="Basket" />
                    <h2 className={styles.basket__count}>{basket.length}</h2>
                </div>
                <div className={[styles['settings__item'], styles.favorites].join(' ')} >
                    <img className={styles.favorites__image} src={Favorites} alt="Favorites" />
                    <h2 className={styles.favorites__count}>{favorites.length}</h2>
                </div>
            </div>
        </header>
    );
}