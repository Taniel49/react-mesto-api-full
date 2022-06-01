import React from 'react';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id="infoTooltip">
            <div className="popup__container">
                <div className="popup__info-tooltip">
                    <img className="popup__info-tooltip_image"
                         src={`${props.image}`}
                         alt={props.alt}/>
                    <p className="popup__info-tooltip_caption">{props.caption}</p>
                    <button className="popup__close-button" onClick={props.onClose} type="button"
                            id="infoTooltip-close-button"></button>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;
