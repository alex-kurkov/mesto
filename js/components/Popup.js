/* import { 
    cssClasses,
    cssSelectors as cssSel,
    elements as el,
} from '../utils/constants.js'; */
import { cssClasses, elements as el } from '../setup.js';

export default class Popup {
    constructor(popupSelector) {
        this._modal = el.popup.querySelector(popupSelector);
        this._closeBtn = this._modal.querySelector('.close-btn');
    }

    _hideElement = (...rest) => {
        rest.forEach(el => el.classList.remove(cssClasses.openedClass));
    };
    _showElement = (...rest) => {
        rest.forEach(el => el.classList.add(cssClasses.openedClass));
    };
    _closeByOverlay = evt => {
        if (evt.currentTarget === evt.target) {
            this.close(evt);
        }
    };
    _closeByEscape = evt => {
        if (evt.key === 'Escape') { 
            this.close();
        }
    };
    _setEventListeners() {
        document.addEventListener('keydown', this._closeByEscape);
        el.popup.addEventListener('click', this._closeByOverlay);
        this._closeBtn.addEventListener('click', this.close.bind(this))
    };
    _removeEventListeners() {
        document.removeEventListener('keydown', this._closeByEscape);
        el.popup.removeEventListener('click', this._closeByOverlay);
        this._closeBtn.removeEventListener('click', this.close.bind(this));
    };

    close() {
        this._hideElement(el.popup, this._modal);
        this._removeEventListeners();
    };
    open() {
        this._showElement(el.popup, this._modal);
        this._setEventListeners();
    };
};