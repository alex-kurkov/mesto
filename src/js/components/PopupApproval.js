import Popup from './Popup';
import { elements as el } from '../utils/constants';

export default class PopupApproval extends Popup {
  constructor(popupSelector, submitHandler, approvalHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this.approvalHandler = approvalHandler;
    this._form = this._modal.querySelector('.form');
    this._color = 'rgba(0, 0, 0, .5)';
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
