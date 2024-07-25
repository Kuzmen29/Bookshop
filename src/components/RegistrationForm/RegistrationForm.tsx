import React, { useEffect, useRef, useState } from 'react';

import classes from './RegistrationForm.module.scss';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useHasNicknameMutation, useRegisterMutation } from '../../stores/api/user.api';
import { INewUser } from '../../types/user.type';

interface IFormDataValidation {
    nickname: {
        flag: boolean,
        message: string,
        hasNickname?: boolean
    },
    email: {
        flag: boolean,
        message: string
    },
    birthday: {
        flag: boolean,
        message: string
    },
    password: {
        flag: boolean,
        message: string,
    }
    repeatedPassword: {
        flag: boolean,
        message: string,
    }
    
}
interface IRegistrationFormProps {
    login: () => void
}
export default function RegistrationForm({ login }: IRegistrationFormProps) {

    const [hasNickname] = useHasNicknameMutation();
    const [toRegister, {isLoading, isError}] = useRegisterMutation();

    const [registrationSuccess, setRegistrationSuccess] = useState(false)

    const [formData, setFormData] = useState<INewUser>({
        nickname: '',
        email: '',
        birthday: new Date(),
        password: '',
        repeatedPassword: ''
    })

    const [formDataValidation, setFormDataValidation] = useState<IFormDataValidation>({
        nickname: {
            flag: false,
            message: 'Обязательно для заполнения',
        },
        email: {
            flag: false,
            message: 'Обязательно для заполения'
        },
        birthday: {
            flag: true,
            message: ''
        },
        password: {
            flag: false,
            message: 'Обязательно для заполения',
        },
        repeatedPassword : {
            flag: false,
            message: 'Обязательно для заполения',
        }
    })

    useEffect(() => {

        if (formData.nickname === '') {
            setFormDataValidation({
                ...formDataValidation, nickname: {
                    flag: false,
                    message: "Обязательно для заполнения!"
                }
            }
            )
        } else if (!((/^[a-z0-9_]{5,15}$/i).test(formData.nickname))) {
            setFormDataValidation({
                ...formDataValidation, nickname: {
                    flag: false,
                    message: "Псевдоним должен быть длиной от 5 до 15 символов и содержать ТОЛЬКО латинские буквы, цифры и знак _ "
                }
            })
        } else {
            hasNickname(formData.nickname).then(result => {
                const flag = result.data;
                if (flag) {
                    setFormDataValidation({
                        ...formDataValidation, nickname: {
                            flag: false,
                            message: "Пользователь с таким псевдонимом уже существует"
                        }
                    })
                } else {
                    setFormDataValidation({
                        ...formDataValidation, nickname: {
                            flag: true,
                            message: ""
                        }
                    })
                }
            });
        }

    }, [formData.nickname])

    useEffect(() => {

        if (formData.email === '') {
            setFormDataValidation({
                ...formDataValidation, email: {
                    flag: false,
                    message: "Обязательно для заполнения"
                }
            })
        } else if (!((/\w+@\w+\.\w+/).test(formData.email))) {

            setFormDataValidation({
                ...formDataValidation, email: {
                    flag: false,
                    message: "Электронная почта в формате name@name.ru"
                }
            })
        } else {
            setFormDataValidation({
                ...formDataValidation, email: {
                    flag: true,
                    message: ""
                }
            })
        }
    }, [formData.email])

    useEffect(() => {

    }, [formData.birthday])

    useEffect(() => {

        if (formData.password === '') {
            setFormDataValidation({
                ...formDataValidation, password: {
                    ...formDataValidation.password,
                    flag: false,
                    message: "Обязательно для заполнения"
                }
            })
        } else if (!((/^[0-9a-z_!@#]{8,}$/i).test(formData.password))) {
            setFormDataValidation({
                ...formDataValidation, password: {
                    ...formDataValidation.password,
                    flag: false,
                    message: "Пароль должен быть длиной не менее 8 символов и содержать ТОЛЬКО латинские буквы, цифры и знак _ ! @ # "
                }
            })
        } else {
            setFormDataValidation({
                ...formDataValidation, password: {
                    ...formDataValidation.password,
                    flag: true,
                    message: "",
                }
            })
        }
    }, [formData.password])

    useEffect(() => {
        if (formData.repeatedPassword === '') {
            setFormDataValidation({
                ...formDataValidation, repeatedPassword: {
                    flag: false,
                    message: "Обязательно для заполнения"
                }
            })
        } else if (formData.password !== formData.repeatedPassword) {
            setFormDataValidation({
                ...formDataValidation, repeatedPassword: {
                    flag: false,
                    message: "Пароли не совпадают"
                }
            })
        } else {
            setFormDataValidation({
                ...formDataValidation, repeatedPassword: {
                    flag: true,
                    message: ""
                }
            })
        }
    }, [formData.repeatedPassword])

    return (
        <form className={classes['registration-form']}>
            <div className={classes['registration-form__element']}>
                <input type="text"
                    className={classes['registration-form__input']}
                    placeholder='Введите желаемый псевдоним'
                    onChange={(event) => setFormData({ ...formData, nickname: event.target.value })}
                />
                {
                    !formDataValidation.nickname.flag && <div className={classes['registration-form__error']}>
                        {formDataValidation.nickname.message}
                    </div>
                }
            </div>

            <div className={classes['registration-form__element']}>
                <input type="text"
                    className={classes['registration-form__input']}
                    placeholder='Введите адрес электронной почты'
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                />
                {
                    !formDataValidation.email.flag && <div className={classes['registration-form__error']}>
                        {formDataValidation.email.message}
                    </div>
                }
            </div>

            <div className={classes['registration-form__element']}>
                <input type="date"
                    className={classes['registration-form__input']}
                    placeholder='Введите дату рождения'
                    onChange={(event: any) => setFormData({ ...formData, birthday: event.target.value })}
                />
                {
                    !formDataValidation.birthday.flag && <div className={classes['registration-form__error']}>

                    </div>
                }
            </div>

            <div className={classes['registration-form__element']}>
                <input type="password"
                    className={classes['registration-form__input']}
                    placeholder='Введите пароль'
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                />
                {
                    !formDataValidation.password.flag && <div className={classes['registration-form__error']}>
                        {formDataValidation.password.message}
                    </div>
                }
            </div>

            <div className={classes['registration-form__element']}>
                <input
                    type="password"
                    className={classes['registration-form__input']}
                    placeholder='Повторите пароль' 
                    onChange={(event) => setFormData({ ...formData, repeatedPassword: event.target.value })}
                    />
                {
                    !formDataValidation.repeatedPassword.flag && <div className={classes['registration-form__error']}>
                        {formDataValidation.repeatedPassword.message}
                    </div>
                }
            </div>

            <button
                disabled={
                    !(formDataValidation.nickname.flag && formDataValidation.email.flag
                        && formDataValidation.birthday.flag && formDataValidation.password.flag && formDataValidation.repeatedPassword.flag)
                }
                type='button'
                className={classes['registration-form__button']}
                onClick={() => {
                    toRegister(formData).then(response=>{
                        setRegistrationSuccess(true);
                    })
                }}
            >Регистрация</button>

            <ModalWindow visible={registrationSuccess} setVisible={setRegistrationSuccess}>
                <div className={classes['registration-form__success']}>
                    <h3>Вы успешно зарегистрированы</h3>
                    <button type='button'
                        className={classes['registration-form__button']}
                        onClick={() => { login() }}
                    >
                        Войти
                    </button>
                </div>
            </ModalWindow>

        </form>
    );
}