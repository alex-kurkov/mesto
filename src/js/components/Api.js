/* eslint-disable consistent-return */
/* eslint-disable prefer-promise-reject-errors */
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  _getResponseData(response) {
    if (response.ok) { return response.json(); }
    return Promise.reject(new Error(`Не установлено соединение с сервером: ${response.status}`));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => this._getResponseData(res));
  }

  postCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link }),
    })
      .then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => this._getResponseData(res));
  }

  patchUserData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    })
      .then((res) => this._getResponseData(res));
  }

  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
      .then((res) => this._getResponseData(res));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then((res) => this._getResponseData(res));
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => this._getResponseData(res));
  }
}
