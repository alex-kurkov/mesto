import Popup from './Popup';
import { elements as el } from '../utils/constants';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._color = 'rgba(0, 0, 0, .9)';
  }

  open = ({ link, place }) => {
    super.open();
    el.popupImage_Img.src = link;
    el.popupImage_Title.textContent = place;
    el.popup.style.background = this._color;
  }
}
