export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._elName = document.querySelector(nameSelector);
    this._elAbout = document.querySelector(aboutSelector);
    this._elAvatar = document.querySelector(avatarSelector);
  }

    getUserInfo = () => ({
      name: this._elName.textContent,
      about: this._elAbout.textContent,
    });

    setUserInfo({ name, about }) {
      this._elName.textContent = name;
      this._elAbout.textContent = about;
    }

    setUserAvatar({ avatar }) {
      this._elAvatar.src = avatar;
    }
}
