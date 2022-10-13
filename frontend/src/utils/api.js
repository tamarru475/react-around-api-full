
const customFetch = (url, header) =>
  fetch(url, header).then((res) =>
    res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`)
  );

class Api {
  constructor({ baseUrl, headers }) {


    this._baseUrl = baseUrl;
    this._headers = headers;

    this.state = {
      likes: 0,
    };
  }


  getUserInfo() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  setUserInfo(inputValues) {
    return customFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    });
  }

  setUserAavatar(inputValues) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValues.avatar,
      }),
    });
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  setNewCard(inputValues) {
    return customFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.title,
        link: inputValues.link,
      }),
    });
  }

  changeLikeCardStatus(cardId, liked) {
    if (!liked) {
      return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      });
    } else {
      return customFetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      });
    }
  }
  deleteCard(cardId) {
    return customFetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}




export default Api;
