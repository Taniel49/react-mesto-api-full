import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? '' : 'element__delete-button_hidden'}`
    );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_liked' : ''}`
    );

    function handleLikeClick(){
        props.onCardLike(props.card)
    }

    function handleDeleteClick(){
        props.onCardDelete(props.card)
    }

    return (
        <article className="element">
            <button className="element__open-picture-button" onClick={() => props.onImage(props.card)} type="button">
                <img
                    className="element__picture"
                    src={`${props.card.link}`}
                    alt={props.card.name}/></button>
            <div className="element__caption">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <div className="element__like-number">{props.card.likes.length}</div>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
        </article>
    );
}

export default Card;