export default class Api {
  constructor({ token, groupId }) {
    this._token = token;
    this._groupId = groupId;
    this._url = {
      cards: `https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, // Загрузка карточек с сервера GET/POST
      me: `https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, // Загрузка информации о пользователе с сервера GET/PATCH
      likes: `https://mesto.nomoreparties.co/v1/${this._groupId}/cards/likes`,
    };
  }

  getInitialCards() {
    fetch(this._url.cards, {
      headers: {
        authorization: this._token,
      },
      method: 'GET',
    });
  }

  postCard({ name, link }) {
    fetch(this._url.cards, {
      headers: {
        authorization: this._token,
      },
      method: 'POST',
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    fetch(`${this._url.cards}/${cardId}`, {
      headers: {
        authorization: this._token,
      },
      method: 'DELETE',
    });
  }

  getUserData() {
    fetch(this._url.me, {
      headers: {
        authorization: this._token,
      },
      /* method: 'GET', */
    });
  }

  patchUserData({ name, about }) {
    fetch(this._url.me, {
      headers: {
        authorization: this._token,
        'content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    });
  }

  patchAvatar(link) {
    fetch(`${this._url.me}/avatar`, {
      headers: {
        authorization: this._token,
        'content-type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ avatar: link }),
    });
  }

  likeCard(cardId) {
    fetch(`${this._url.likes}/${cardId}`, {
      headers: {
        authorization: this._token,
      },
      method: 'PUT',
    });
  }

  unlikeCard(cardId) {
    fetch(`${this._url.likes}/${cardId}`, {
      headers: {
        authorization: this._token,
      },
      method: 'DELETE',
    });
  }
}

/* Это лишь минимальный список методов. помимо них вы можете (что я настоятельно рекомендую)
написать вспомогательные методы, например метод, который отдаст промис, ожидающий исполнение
нескольких методов класса (например, подумайте какие методы надо исполнить прежде чем начать
    отрисовку и прочее на странице, и посмотрите в сторону Promise.all)
Следующую часть опубликую позже, там расскажу подробнее про второй новый попап,
обновления класса Card и общую логику рассуждений при написании этой проектной работы */
