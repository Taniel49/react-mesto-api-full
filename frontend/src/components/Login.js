import React from 'react';
import Header from "./Header";
import SignForm from "./SignForm";
import InfoTooltip from "./InfoTooltip";
import Union2 from "../images/Union2.svg";
import {useHistory} from 'react-router-dom';

function Login(props) {
    const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(password,email);

    }

    function handlePush() {
        history.push('/sign-up');
    }

    return (
        <div className="root" style={{height: '100vh'}}>
            <div className="page root__page">
                <Header userEmail={''}
                        buttonText={'Регистрация'}
                        onClick={handlePush}/>
                <SignForm headerText={'Вход'}
                          buttonText={'Войти'}
                          registratedButtonText={''}
                          onEmailChange={handleEmailChange}
                          onPasswordChange={handlePasswordChange}
                          onSubmit={handleSubmit}/>
                <InfoTooltip image={Union2}
                             alt={'alt'}
                             caption={'Что-то пошло не так! Попробуйте еще раз.'}
                             isOpen={props.isOpenPopup}
                             onClose={props.closePopup}
                />
            </div>
        </div>
    );
}

export default Login;
