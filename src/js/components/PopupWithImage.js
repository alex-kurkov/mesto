import Popup from './Popup.js';
import { cssSelectors as sel, elements as el } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._color = 'rgba(0, 0, 0, .9)';
    }

    open = ({ link, place }) => {
        super.open();
        el.popupImage_Img.src = link;
        el.popupImage_Title.textContent = place;
        el.popup.style.background = this._color;
    };
}