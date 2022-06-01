import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm name="avatar"
                       title="Обновить аватар"
                       buttonText="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <input className="popup__inputs popup__inputs_type_avatar" id="avatar-input"
                   type="url"
                   name="avatar"
                   placeholder="Ссылка на картинку" required
                   ref={avatarRef}/>
            <span className="popup__inputs-error picture-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup