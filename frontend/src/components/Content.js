import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from './ImagePopup';
import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import {useHistory} from 'react-router-dom';

function Content(props) {
    const history = useHistory();

    function handleQuit() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        history.push('/sign-in');
    }

    return (
        <CurrentUserContext.Provider value={props.currentUser}>
            <div className="root">
                <div className="page root__page">
                    <Header userEmail={props.userEmail}
                            buttonText={'Выход'}
                            onClick={handleQuit}/>
                    <Main onEditAvatar={props.handleEditAvatarClick}
                          onEditProfile={props.handleEditProfileClick}
                          onAddPlace={props.handleAddPlaceClick}
                          onImage={props.handleCardClick}
                          cards={props.cards}
                          onCardLike={props.handleCardLike}
                          onCardDelete={props.handleDeleteCard}
                    />
                    <Footer/>
                </div>
                <EditProfilePopup
                    isOpen={props.isOpenEditProfilePopup}
                    onClose={props.closeAllPopups}
                    onUpdateUser={props.handleUpdateUser}/>
                <AddPlacePopup
                    isOpen={props.isOpenAddPlacePopup}
                    onClose={props.closeAllPopups}
                    onAddPlace={props.handleAddPlaceSubmit}/>
                <EditAvatarPopup
                    isOpen={props.isOpenEditAvatarPopup}
                    onClose={props.closeAllPopups}
                    onUpdateAvatar={props.handleUpdateAvatar}
                />
                <ImagePopup
                    onClose={props.closeAllPopups}
                    card={props.selectedCard}/>
            </div>
        </CurrentUserContext.Provider>
    )
        ;
}

export default Content;
