import Popup from './Popup.js';
import { cssSelectors as sel, elements as el } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._color = 'rgba(0, 0, 0, .9)';
    }

    open = (evt) => {
        super.open();
        const clickedImage = evt.target;
        el.popupImage_Img.src = clickedImage.src
        el.popupImage_Title.textContent = clickedImage
            .parentElement
            .querySelector(sel.cardTitleSelector)
            .textContent;
        el.popup.style.background = this._color;
    };
}