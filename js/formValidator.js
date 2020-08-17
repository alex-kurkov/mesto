export class FormValidator {
    constructor(cssClasses, formElement) {
        this._inputSelector = cssClasses.inputSelector;
        this._formButtonSelector = cssClasses.formButtonSelector;
        this._inactiveButtonClass = cssClasses.inactiveButtonClass;
        this._inputErrorClass = cssClasses.inputErrorClass;
        this._errorClass = cssClasses.errorClass;
        this._formEl = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
        this._elBtn = formElement.querySelector(this._formButtonSelector);
    }

    _showInputError(elInput) {
        const elError = this._formEl.querySelector(`#${elInput.id}-error`);
        elInput.classList.add(this._inputErrorClass);
        elError.classList.add(this._errorClass);
        elError.textContent = elInput.validationMessage;
    };
        
    _hideInputError(elInput) {
        const elError = this._formEl.querySelector(`#${elInput.id}-error`);
        elInput.classList.remove(this._inputErrorClass);
        elError.classList.remove(this._errorClass);
        elError.textContent = '';
    };

    _hasInvalidInput() {
        return this._inputList.some(el => !el.validity.valid);
    }

    _checkInputValidity(elInput) {
        if (!elInput.validity.valid) {
            this._showInputError(elInput);
        } else {
            this._hideInputError(elInput);
        }
    };

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
          this._elBtn.classList.add(this._inactiveButtonClass);
          this._elBtn.setAttribute('disabled', true);
        } else {
          this._elBtn.classList.remove(this._inactiveButtonClass);
          this._elBtn.removeAttribute('disabled');
        }
    };

    _preventUnvalidSubmit(evt) {
        if (evt.key === 'Enter' && this._hasInvalidInput()) {
          evt.preventDefault();
        }
      };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach(elInput => {
          this._checkInputValidity(elInput);
          elInput.addEventListener('input', () => {
            this._checkInputValidity(elInput);
            this._toggleButtonState();
          });
          elInput.addEventListener('keydown', evt => {
            this._preventUnvalidSubmit(evt);
          });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }
}
