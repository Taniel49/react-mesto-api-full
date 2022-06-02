import Content from "./Content";
import {Route, Switch, useHistory} from 'react-router-dom';
import React from "react";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as Auf from "../utils/Auf";
import Union from "../images/Union.svg";
import Union2 from "../images/Union2.svg";
import api from "../utils/api";

function App() {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');
    const [popupPicture, setPopupPicture] = React.useState('');
    const [popupCaption, setPopupCaption] = React.useState('');
    const [isOpenPopup, setIsOpenPopup] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isOpenAddPlacePopup, setIsOpenAddPlacePopup] = React.useState(false);
    const [isOpenEditAvatarPopup, setIsOpenEditAvatarPopup] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [isOpenEditProfilePopup, setIsOpenEditProfilePopup] = React.useState(false);

    React.useEffect(() => {
        if (isLoggedIn)
        {
            api.getInitialCards()
                .then((result) => {
                    setCards(result)
                }).catch((err) => {
                console.log(err);
            });

            api.getProfile()
                .then((result) => {
                    setCurrentUser(result)
                }).catch((err) => {
                console.log(err);
            })
        }

        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token) {
                Auf.getContent(token).then((res) => {
                    if (res) {
                        setIsLoggedIn(true);
                        setUserEmail(email);
                        history.push("/");
                    }
                }).catch((err) => console.log(err));
            }

        }

    }, [history, isLoggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleDeleteCard(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => {
                return c._id !== card._id
            }))
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateUser(item) {
        api.patchProfile(item).then((res) => {
            setCurrentUser(res)
        }).then(() => {
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(item) {
        api.patchAvatar(item).then((res) => {
            setCurrentUser(res)
        }).then(() => {
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlaceSubmit(item) {
        api.postCard(item).then((res) => {
            setCards([res, ...cards]);
        }).then(() => {
            closeAllPopups()
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleLogin(password, email) {
        Auf.authorize(password, email)
            .then(() => {
                    setIsLoggedIn(true);
                    setUserEmail(email);
                    history.push('/');
                }
            )
            .catch((err) => {
                console.log(err);
                handlePopup();
            });

    }

    function handleRegister(password, email) {
        Auf.register(password, email).then((res) => {
            if (res) {
                setPopupPicture(Union);
                setPopupCaption('Вы успешно зарегистрировались!');
                handlePopup();
                history.push('/sign-in');
            } else {
                setPopupPicture(Union2);
                setPopupCaption('Что-то пошло не так! Попробуйте еще раз.');
                handlePopup();
            }
        }).catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setIsOpenEditAvatarPopup(false)
        setIsOpenEditProfilePopup(false)
        setIsOpenAddPlacePopup(false)
        setSelectedCard({})
    }

    function handleEditAvatarClick() {
        setIsOpenEditAvatarPopup(true)
    }

    function handleEditProfileClick() {
        setIsOpenEditProfilePopup(true)
    }

    function handleAddPlaceClick() {
        setIsOpenAddPlacePopup(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handlePopup() {
        setIsOpenPopup(true)
    }

    function closePopup() {
        setIsOpenPopup(false)
    }

    return (
        <Switch>
            <Route path="/sign-up">
                <Register onRegister={handleRegister}
                          popupPicture={popupPicture}
                          popupCaption={popupCaption}
                          isOpenPopup={isOpenPopup}
                          closePopup={closePopup}/>
            </Route>
            <Route path="/sign-in">
                <Login onLogin={handleLogin}
                       isOpenPopup={isOpenPopup}
                       closePopup={closePopup}
                />
            </Route>
            <ProtectedRoute
                exact
                path="/"
                loggedIn={isLoggedIn}
                userEmail={userEmail}
                currentUser={currentUser}
                handleEditAvatarClick={handleEditAvatarClick}
                handleEditProfileClick={handleEditProfileClick}
                handleAddPlaceClick={handleAddPlaceClick}
                handleCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleDeleteCard={handleDeleteCard}
                isOpenEditProfilePopup={isOpenEditProfilePopup}
                closeAllPopups={closeAllPopups}
                handleUpdateUser={handleUpdateUser}
                isOpenAddPlacePopup={isOpenAddPlacePopup}
                handleAddPlaceSubmit={handleAddPlaceSubmit}
                isOpenEditAvatarPopup={isOpenEditAvatarPopup}
                handleUpdateAvatar={handleUpdateAvatar}
                selectedCard={selectedCard}
                cards={cards}
                component={Content}
            />
        </Switch>
    )
        ;
}

export default App;
