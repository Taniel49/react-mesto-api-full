
class API {
    constructor(url, authorization) {
        this._URL = url;
        this._authorization = authorization;
    }

    _checkResult(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfile(){
        return fetch(`${this._URL}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        }).then(this._checkResult)
    }

    getInitialCards() {
        return fetch(`${this._URL}/cards`, {
            headers: {
                authorization: this._authorization
            }
        }).then(this._checkResult)
    }

    postCard(item) {
        return fetch(`${this._URL}/cards`, {
            method: `POST`,
            headers: {
                authorization: this._authorization,
                'Content-Type': `application/json`
            },
            body: JSON.stringify({
                name: item.name,
                link: item.link
            })
        }).then(this._checkResult)
    }

    patchProfile(item) {
        return fetch(`${this._URL}/users/me`, {
            method: `PATCH`,
            headers: {
                authorization: this._authorization,
                'Content-Type': `application/json`
            },
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        }).then(this._checkResult)
    }

    patchAvatar(item) {
        return fetch(`${this._URL}/users/me/avatar`, {
            method: `PATCH`,
            headers: {
                authorization: this._authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item.avatar
            })
        }).then(this._checkResult)
    }

    _putlike(id) {
        return fetch(`${this._URL}/cards/${id}/likes`,
            {
                method: `PUT`,
                headers: {
                    authorization: this._authorization,
                }
            }).then(this._checkResult)
    }

    _deleteLike(id) {
        return fetch(`${this._URL}/cards/${id}/likes`,
            {
                method: `DELETE`,
                headers: {
                    authorization: this._authorization,
                }
            }).then(this._checkResult)
    }

    changeLikeCardStatus(id, isLiked) {
        return isLiked ? this._deleteLike(id) : this._putlike(id)
    }


    deleteCard(id) {
        return fetch(`${this._URL}/cards/${id}`,
            {
                method: `DELETE`,
                headers: {
                    authorization: this._authorization,
                }
            }).then(this._checkResult)
    }
}

const api = new API(`https://firstproject.students.nomoredomains.xyz`, `b031c7a0-313e-4731-b83c-33069b14829c`);

export default api;