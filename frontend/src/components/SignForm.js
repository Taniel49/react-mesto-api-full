import React from 'react';

function SignForm(props) {

    return (
        <div className="sign">
            <p className="sign__header">{props.headerText}</p>
            <form className="sign__form" onSubmit={props.onSubmit}>
                <input className="sign__form_input" type=" text"
                       name="email"
                       required minLength="5" maxLength="60" placeholder="Email"
                       onChange={props.onEmailChange}
                />
                <input className="sign__form_input" type="password"
                       name="password"
                       required minLength="6" maxLength="30" placeholder="Пароль"
                       onChange={props.onPasswordChange}
                />
                <button type="submit" className="sign__form_submit-button">{props.buttonText}</button>
            </form>
            <button className="sign__registered-button" type="button" onClick={props.onClick}>{props.registratedButtonText}</button>
        </div>
    )
}

export default SignForm;