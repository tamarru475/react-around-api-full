

const customFetch = (url, header) =>
  fetch(url, header).then((res) =>
    res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`)
  );

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  getUserInfo(token) {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      }
    });
  }

  setUserInfo(inputValues, token) {
    return customFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    });
  }

  setUserAavatar(inputValues, token) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: inputValues.avatar,
      }),
    });
  }

  getInitialCards(token) {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  setNewCard(inputValues, token) {
    return customFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: inputValues.title,
        link: inputValues.link,
      }),
    });
  }

  changeLikeCardStatus(cardId, liked, token) {
    if (!liked) {
      return customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
      });
    } else {
      return customFetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          ...this._headers,
          authorization: `Bearer ${token}`,
        },
      });
    }
  }
  deleteCard(cardId, token) {
    return customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: "https://api.tamarru.students.nomoredomainssbs.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
