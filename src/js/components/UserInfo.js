export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._elName = document.querySelector(nameSelector);
    this._elAbout = document.querySelector(aboutSelector);
    this._elAvatar = document.querySelector(avatarSelector);
    this._id = null;
  }

    getUserDOMInfo = () => ({
      name: this._elName.textContent,
      about: this._elAbout.textContent,
      avatar: this._elAvatar.src,
    });

    setUserInfo({ name, about, avatar }) {
      if (name) this._elName.textContent = name;
      if (about) this._elAbout.textContent = about;
      if (avatar) this._elAvatar.src = avatar;
    }
}
