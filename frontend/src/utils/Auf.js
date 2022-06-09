import api from '../utils/api';
export const BASE_URL = 'https://api.firstproject.students.nomoredomains.xyz';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            try {
                if (response.status === 201 || 200) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
        .then((res) => {
            return res;
        })
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return response.json().then((data)=>{throw new Error(data.message)})
        })
        .then((data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
            api.setAuthorisation(data.token);
            return data;
        })

};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)
}