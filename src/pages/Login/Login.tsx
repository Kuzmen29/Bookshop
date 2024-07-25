import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

import styles from './Login.module.scss';
import { useIsAuthContext } from '../../context/AuthProvider';
import { loginWindowActions } from '../../stores/loginWindow/loginWindow';
import { registrationWindowActions } from '../../stores/registrationWindow/registrationWindow';
import { IUser } from '../../types/user.type';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

interface ILoginProps {
    registration: () => void
    closeLogin: () => void
}
export default function Login() {

    const navigate = useNavigate();
    const isAuth: IUser = useIsAuthContext();
    const dispatch = useDispatch();

    const loginWindow = useSelector((state: any) => state.loginWindow);

    function registration() {
        dispatch(loginWindowActions.toggleLoginWindow(false));
        dispatch(registrationWindowActions.toggleRegistrationWindow(true))
    }

    function closeLogin() {
        dispatch(loginWindowActions.closeLoginWindow())
    }
    return (
        <ModalWindow
            visible={loginWindow}
            setVisible={(flag: boolean) => dispatch(loginWindowActions.toggleLoginWindow(flag))}
        >
            <LoginForm closeLogin={closeLogin} registration={registration} />
        </ModalWindow>
    );
}