import Popup from './Popup.js';
import { cssClasses, elements as el } from '../setup.js';
/* import { elements as el, cssSelectors, cssClasses } from '../utils/constants.js'; */

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._color = 'rgba(0, 0, 0, .9)';
    }

    open = (evt) => {
        super.open();
        const clickedImage = evt.target;
        el.popupImageImg.src = clickedImage.src
        el.popupImageTitle.textContent = clickedImage
            .parentElement
            .querySelector(cssClasses.cardTitleSelector)
            .textContent;
        el.popup.style.background = this._color;
    };
}