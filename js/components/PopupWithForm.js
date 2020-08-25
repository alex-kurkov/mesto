import Popup from './Popup.js';
import { cssClasses, elements as el } from '../setup.js';
/* import { elements as el, cssSelectors, cssClasses } from '../utils/constants.js'; */

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formHandler){
        super(popupSelector);
        this._formHandler = formHandler;
        this._color = 'rgba(0, 0, 0, .5)';
        this._form = this._modal.querySelector('.form');
    };

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
    };
    _setEventListeners() {
        super._setEventListeners();
        this._form.addEventListener('submit', this._formHandler);
    };
    _removeEventListeners = () => {
        super._removeEventListeners();
        this._form.removeEventListener('submit', this._formHandler);
    };
    
    close() {
        super.close();
        this._form.reset();
    };

    open() {
        super.open();
        el.popup.style.background = this._color;
    };
}