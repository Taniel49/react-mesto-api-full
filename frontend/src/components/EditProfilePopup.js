import React from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";


function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="profile"
                       title="Редактировать профиль"
                       buttonText="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <input className=" popup__inputs popup__inputs_type_name" id=" name-input" type=" text" name=" name"
                   required minLength="2" maxLength="40" placeholder="Имя профиля"
                   value={name || ''}
                   onChange={handleNameChange}/>
            <span className="popup__inputs-error name-input-error"></span>
            <input className="popup__inputs popup__inputs_type_about" id="about-input" type="text"
                   name="about"
                   required minLength="2" maxLength="200" placeholder="Описание профиля"
                   value={description || ''}
                   onChange={handleDescriptionChange}/>
            <span className="popup__inputs-error about-input-error"></span>
        </PopupWithForm>)
}

export default EditProfilePopup