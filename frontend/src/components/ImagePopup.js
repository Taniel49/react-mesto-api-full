import React from 'react';

function ImagePopup(props){
    return(
        <div className={`popup ${props.card._id && 'popup_opened'}`} id="popup_picture">
                <div className="popup__picture-container">
                    <img className="popup__picture"
                         src={`${props.card.link}`}
                         alt={props.card.name}/>
                    <button className="popup__close-button" onClick={props.onClose} type="button" id="picture-close-button"></button>
                    <p className="popup__caption">{props.card.name}</p>
                </div>
            </div>
    )
}

export default ImagePopup;