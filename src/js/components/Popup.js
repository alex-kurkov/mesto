import { cssClasses, cssSelectors as sel, elements as el } from '../utils/constants';

export default class Popup {
  constructor(popupSelector) {
    this._modal = el.popup.querySelector(popupSelector);
    this._closeBtn = this._modal.querySelector(sel.closePopupBtnSelector);
    this.actionButton = this._modal.querySelector(sel.actionButtonSelector);
  }

    _hideElement = (...rest) => {
      rest.forEach((element) => element.classList.remove(cssClasses.openedClass));
    };

    _showElement = (...rest) => {
      rest.forEach((element) => element.classList.add(cssClasses.openedClass));
    };

    _closeByOverlay = (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close(evt);
      }
    };

    _closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    };

    _setEventListeners() {
      document.addEventListener('keydown', this._closeByEscape);
      el.popup.addEventListener('click', this._closeByOverlay);
      this._closeBtn.addEventListener('click', this.close.bind(this));
    }

    _removeEventListeners() {
      document.removeEventListener('keydown', this._closeByEscape);
      el.popup.removeEventListener('click', this._closeByOverlay);
      this._closeBtn.removeEventListener('click', this.close.bind(this));
    }

    close() {
      this._hideElement(el.popup, this._modal);
      this._removeEventListeners();
    }

    open() {
      this._showElement(el.popup, this._modal);
      this._setEventListeners();
    }
}
