function checkRespose(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
}

export const BASE_URL = "https://api.tamarru.students.nomoredomainssbs.ru";
// export const BASE_URL = "http://localhost:3001";

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(checkRespose)
        .then((data) => {
            if (data.error) {
                throw new Error(data.error)
            }
            console.log(data);
        });
};


export const login = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(checkRespose)
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("email", email);
                return data;
            } else {
                return;
            }
        });
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
        .then(checkRespose)
        .then((data) => {
            if (data.error) {
                throw new Error(data.error)
            }
            return data;
        })
}