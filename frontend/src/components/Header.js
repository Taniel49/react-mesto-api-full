import React from 'react';
import logo from "../images/logo.svg";

function Header(props) {
    return (
        <header className="header page__header">
            <img className="header__logo" src={logo} alt="Лого проекта"/>
            <div className="header__container">
                <span className="header__login">{props.userEmail}</span>
                <button className="header__quit-button" type="button" onClick={props.onClick}>{props.buttonText}</button>
            </div>
        </header>
    );
}

export default Header;
