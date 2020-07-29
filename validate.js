const showInputError = (elForm, elInput, errorMessage, setupObj) => {
    const elError = elForm.querySelector(`#${elInput.id}-error`);
    elInput.classList.add(setupObj.inputErrorClass);
    elError.classList.add(setupObj.errorClass);
    elError.textContent = errorMessage;
  };
  
const hideInputError = (elForm, elInput, setupObj) => {
    const elError = elForm.querySelector(`#${elInput.id}-error`);
    elInput.classList.remove(setupObj.inputErrorClass);
    elError.classList.remove(setupObj.errorClass);
    elError.textContent = '';
  };
  
const checkInputValidity = (elForm, elInput, setupObj) => {
    if (!elInput.validity.valid) {
      showInputError(elForm, elInput, elInput.validationMessage, setupObj);
    } else {
      hideInputError(elForm, elInput, setupObj);
    }
  };
  
const toggleButtonState = (inputList, elBtn, setupObj) => {
    if (hasInvalidInput(inputList)) {
        elBtn.classList.add(`${setupObj.inactiveButtonClass}`);
    } else {
        elBtn.classList.remove(`${setupObj.inactiveButtonClass}`);
    }
  };

const setEventListeners = (elForm, setupObj) => {
    const inputList = Array.from(elForm.querySelectorAll(`${setupObj.inputSelector}`));
    const elBtn = elForm.querySelector(`${setupObj.formButtonSelector}`);
    toggleButtonState(inputList, elBtn, setupObj);
    inputList.forEach((elInput) => {
        elInput.addEventListener('input', () => {
            checkInputValidity(elForm, elInput, setupObj);
            toggleButtonState(inputList, elBtn, setupObj);
        });
        elInput.addEventListener('keydown', (evt) => {
          preventUnvalidSubmit(evt, setupObj.formSelector, setupObj.inputSelector);
        })
    });
};

const preventUnvalidSubmit = (evt, formSelector, inputSelector) => {
  const inputList = Array.from(evt.target.closest(formSelector).querySelectorAll(inputSelector));
  if (evt.key === 'Enter' && hasInvalidInput(inputList)) {
    evt.preventDefault();
  }
};

const hasInvalidInput = inputList => inputList
    .some(el => !el.validity.valid);

const enableValidation = (setupObj) => {
    const formList = Array.from(document.querySelectorAll(`${setupObj.formSelector}`));
    formList.forEach((elForm) => {
        setEventListeners(elForm, setupObj);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    formButtonSelector: '.form__btn',
    inactiveButtonClass: 'form__btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  });