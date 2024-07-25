import React from 'react';

import classes from './Registration.module.scss';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useIsAuthContext } from '../../context/AuthProvider';
import { loginWindowActions } from '../../stores/loginWindow/loginWindow';
import { registrationWindowActions } from '../../stores/registrationWindow/registrationWindow';
import { IUser } from '../../types/user.type';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

interface IRegistrationProps {
    login: () => void
}
export default function Registration() {

    const navigate = useNavigate();
    const isAuth: IUser = useIsAuthContext();
    
    const registrationWindow = useSelector((state: any) => state.registrationWindow);
    const dispatch = useDispatch();

    function login() {
        if (isAuth) {
            navigate('/profile')
        } else {
            dispatch(loginWindowActions.toggleLoginWindow(true));
            dispatch(registrationWindowActions.toggleRegistrationWindow(false));
        }
    }

    return (
        <ModalWindow
            visible={registrationWindow}
            setVisible={(flag: boolean) => dispatch(registrationWindowActions.toggleRegistrationWindow(flag))}>
            <RegistrationForm login={login} />
        </ModalWindow>
    );
}