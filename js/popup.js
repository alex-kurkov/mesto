import { cssClasses, elements as el } from './setup.js';
import { FormValidator } from './formValidator.js';

export class Popup {
    constructor() {
    }

    _hideElement = (...rest) => {
        rest.forEach(el => el.classList.remove(cssClasses.openedClass));
    };
    _showElement = (...rest) => {
        rest.forEach(el => el.classList.add(cssClasses.openedClass));
    };
    
    _renderOverlayBg = (color = 'rgba(0, 0, 0, .5)') => {
        el.overlay.style.backgroundColor = color;
    };
    
    _closeByOverlay = () => {
        const siblings = Array.from(el.overlay.parentElement.children);
        siblings
            .forEach(sibling => this._hideElement(sibling));
        this._hideElement(el.popup);
    };
    _closeByEscape = evt => {
        if (evt.key === 'Escape') { 
            this._closeByOverlay();
        }
    };

    _renderPopup = (modal, background) => {
        this._showElement(el.popup, modal);
        this._renderOverlayBg(background);
        document.addEventListener('keydown', this._closeByEscape);
        el.overlay.addEventListener('click', this._closeByOverlay);
        modal.querySelector(cssClasses.closePopupBtnSelector).addEventListener('click', this.closePopup)
    };

    closePopup = evt => {
        const modal = evt.target.parentElement;
        this._hideElement(el.popup, modal);
        document.removeEventListener('keydown', this._closeByEscape);
        el.overlay.removeEventListener('click', this._closeByOverlay);
        modal.querySelector(cssClasses.closePopupBtnSelector).removeEventListener('click', this.closePopup);
    };

    showImagePopup = evt => {
        const clickedImage = evt.target;
        el.popupImageImg.src = clickedImage.src
        el.popupImageTitle.textContent = clickedImage
            .parentElement
            .querySelector(cssClasses.cardTitleSelector)
            .textContent;
        this._renderPopup(el.popupImage, 'rgba(0, 0, 0, .9)');
    };

    showProfilePopup = () => {
        el.inputName.value = el.name.textContent;
        el.inputAbout.value = el.about.textContent;
        const activeForm = new FormValidator(cssClasses, el.formProfileEdit.querySelector(cssClasses.formSelector));
        activeForm.enableValidation();
        this._renderPopup(el.formProfileEdit);
    
    };
    showAddCardPopup = () => {
        el.inputTitle.value = '';
        el.inputLink.value = '';
        const activeForm = new FormValidator(cssClasses, el.formCardEdit.querySelector(cssClasses.formSelector));
        activeForm.enableValidation();
        this._renderPopup(el.formCardEdit);
    };
};