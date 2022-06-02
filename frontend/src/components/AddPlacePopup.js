import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: name,
            link: link
        });
    }

    return (
        <PopupWithForm name="elements"
                       title="Новое место"
                       buttonText="Создать"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <input className="popup__inputs popup__inputs_type_place" id="place-input"
                   type="text"
                   name="name"
                   placeholder="Название" required minLength="2" maxLength="30"
                   value={name}
                   onChange={handleNameChange}/>
            <span className="popup__inputs-error place-input-error"></span>
            <input className="popup__inputs popup__inputs_type_picture" id="picture-input" type="url"
                   name="link"
                   placeholder="Ссылка на картинку" required
                   value={link}
                   onChange={handleLinkChange}/>
            <span className="popup__inputs-error picture-input-error"></span>
        </PopupWithForm>
    )

}

export default AddPlacePopup