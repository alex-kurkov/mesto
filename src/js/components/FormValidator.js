export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._formButtonSelector = data.formButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formEl = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._elBtn = formElement.querySelector(this._formButtonSelector);
  }

  _showInputError(elInput) {
    const elError = this._formEl.querySelector(`#${elInput.id}-error`);
    elInput.classList.add(this._inputErrorClass);
    elError.classList.add(this._errorClass);
    elError.textContent = elInput.validationMessage;
  }

  _hideInputError(elInput) {
    const elError = this._formEl.querySelector(`#${elInput.id}-error`);
    elInput.classList.remove(this._inputErrorClass);
    elError.classList.remove(this._errorClass);
    elError.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((el) => !el.validity.valid);
  }

  _checkInputValidity(elInput) {
    if (!elInput.validity.valid) {
      this._showInputError(elInput);
      this._toggleButtonState();
    } else {
      this._hideInputError(elInput);
      this._toggleButtonState();
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._elBtn.classList.add(this._inactiveButtonClass);
      this._elBtn.setAttribute('disabled', true);
    } else {
      this._elBtn.classList.remove(this._inactiveButtonClass);
      this._elBtn.removeAttribute('disabled');
    }
  }

  _preventUnvalidSubmit(evt) {
    if (evt.key === 'Enter' && this._hasInvalidInput()) {
      evt.preventDefault();
    }
  }

  enableValidation() {
    this._inputList.forEach((elInput) => {
      this._checkInputValidity(elInput);
      elInput.addEventListener('input', () => {
        this._checkInputValidity(elInput);
      });
      elInput.addEventListener('keydown', (evt) => {
        this._preventUnvalidSubmit(evt);
      });
    });
  }

  hideErrors() {
    this._toggleButtonState();
    this._inputList.forEach((input) => this._hideInputError(input));
  }
}
