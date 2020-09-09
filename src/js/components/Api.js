export default class Api {
  constructor({ groupId, headers }) {
    this._groupId = groupId;
    this._headers = headers;
    this._url = {
      cards: `https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, // Загрузка карточек с сервера GET/POST
      me: `https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, // Загрузка информации о пользователе с сервера GET/PATCH
      likes: `https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes`,
    };
  }

  getCards() {
    return fetch(this._url.cards, {
      headers: this._headers,
      method: 'GET',
    })
      .then((res) => res.json());
  }

  postCard({ name, link }) {
    return fetch(this._url.cards, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link }),
    })
      .then((res) => res.json());
  }

  deleteCard(cardId) {
    return fetch(`${this._url.cards}/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    });
  }

  getUserData() {
    return fetch(this._url.me, {
      headers: this._headers,
    })
      .then((res) => res.json());
  }

  patchUserData({ name, about }) {
    return fetch(this._url.me, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    });
  }

  patchAvatar(link) {
    fetch(`${this._url.me}/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: link }),
    });
  }

  likeCard(cardId) {
    return fetch(`${this._url.likes}/${cardId}`, {
      headers: this._headers,
      method: 'PUT',
    })
      .then((res) => res.json());
  }

  unlikeCard(cardId) {
    return fetch(`${this._url.likes}/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
      .then((res) => res.json());
  }
}
