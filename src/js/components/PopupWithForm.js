import Popup from './Popup';
import { elements as el, cssSelectors as sel } from '../utils/constants';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formHandler) {
    super(popupSelector);
    this._formHandler = formHandler;
    this._color = 'rgba(0, 0, 0, .5)';
    this._form = this._modal.querySelector('.form');
    this._actionBtn = this._form.querySelector(sel.actionButtonSelector);
  }

  setActionBtnText(text) {
    this._actionBtn.textContent = text;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._formHandler);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._formHandler);
  }

  setInitialInputValues(data) {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._inputList.forEach((inputField) => {
      // eslint-disable-next-line no-param-reassign
      inputField.value = data[inputField.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
    el.popup.style.background = this._color;
  }
}
