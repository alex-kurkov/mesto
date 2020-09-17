import Popup from './Popup';
import { elements as el } from '../utils/constants';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, confirmHandler = () => {}) {
    super(popupSelector);
    this.confirmHandler = confirmHandler;
    this._form = this._modal.querySelector('.form');
    this._color = 'rgba(0, 0, 0, .5)';
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this.confirmHandler();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitHandler);
  }

  close() {
    super.close();
  }

  open() {
    super.open();
    el.popup.style.background = this._color;
  }
}
