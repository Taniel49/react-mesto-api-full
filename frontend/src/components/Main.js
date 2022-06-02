import React from 'react';
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile page__profile">
                <div className="profile__info">
                    <button className="profile__avatar-container" type="button" onClick={props.onEditAvatar}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
                    </button>
                    <div className="profile__inputs">
                        <div className="profile__name-with-button">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button"
                                    onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements page__elements">
                {props.cards.map((card, i) => (
                    <Card card={card}
                          onImage={props.onImage}
                          key={card._id}
                          onCardLike={props.onCardLike}
                          onCardDelete={props.onCardDelete}/>
                ))}
            </section>
        </main>
    );
}

export default Main;