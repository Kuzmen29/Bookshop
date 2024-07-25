import React, { useEffect, useState } from 'react';

import classes from './LoginForm.module.scss';

import { useIsAuthLocalStorageContext, useIsAuthToggleContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';


import { IUser, IUserLogin } from '../../types/user.type';
import { useLoginMutation } from '../../stores/api/user.api';
import MiniLoading from '../MiniLoading/MiniLoading';

interface ILoginFormProps {
    registration: () => void,
    closeLogin: () => void,
}

export default function LoginForm({ closeLogin, registration }: ILoginFormProps) {

    const [login, { isLoading, isError }] = useLoginMutation();

    const setIsAuth = useIsAuthToggleContext();
    const setLocalStorageUser = useIsAuthLocalStorageContext();

    const navigate = useNavigate();

    const [formData, setFormData] = useState<IUserLogin>({
        nickname: '',
        password: '',
    })
    const [rememberMe, setRememberMe] = useState(false);
    const [noSuccess, setNoSuccess] = useState(false);

    return (
        <form className={classes['login-form']}>
            <input type="text"
                className={classes['login-form__input']}
                placeholder='Введите Ваш псевдоним'
                onChange={(event) => setFormData({ ...formData, nickname: event.target.value })}
            />
            <input type="password"
                className={classes['login-form__input']}
                placeholder='Введите пароль'
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            />
            <div className={classes['login-form__remember-me']}>
                <input
                    id='rememberMe'
                    className={classes['login-form__checkbox']}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    checked={rememberMe}
                    type="checkbox" />
                <label htmlFor='rememberMe' className={classes['login-form__label']}  >
                    Запомнить меня
                </label>
            </div>

            {
                isLoading
                    ? <MiniLoading />
                    :
                    <>
                        <button type='button'
                            className={classes['login-form__button']}
                            onClick={() => {
                                setNoSuccess(false);
                                login(formData).then((response: any) => {
                                    if (response.data) {
                                        setIsAuth(response.data);
                                        if (rememberMe) {
                                            setLocalStorageUser(response.data)
                                        }
                                        closeLogin()
                                        navigate('/profile')
                                    } else {
                                        setNoSuccess(true);
                                    }
                                }
                                )
                            }}
                        >Войти</button>
                        {
                            noSuccess && <div className={classes['login-form__error']}>
                                Пользователь не найден
                            </div>
                        }
                        <button type='button'
                            className={classes['login-form__button']}
                            onClick={() => registration()}
                        >Регистрация</button>
                    </>
            }
        </form>
    );
}