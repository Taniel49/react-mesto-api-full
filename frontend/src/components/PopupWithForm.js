import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened':''}`} id={`popup_${props.name}`}>
            <div className="popup__container">
                <button className="popup__close-button" onClick={props.onClose} type="button"></button>
                <p className="popup__header">{props.title}</p>
                <form className="form" name={`${props.name}`}
                onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__submit-button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;