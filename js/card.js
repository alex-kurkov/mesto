import { cssClasses } from './setup.js';

export class Card {
    constructor(data, templateSelector, showPopup) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._templateSelector = templateSelector;
        this._showPopup = showPopup;
    }

    _toggleLike(evt) {
        evt.target.classList.toggle(cssClasses.clickedLikeBtnClass);
    }
    
    _removeCard(evt) {
        evt.target.parentElement.remove();
    }

    _getTemplateCard() {
        return document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
    }
    _showImagePopup() {
        
    }

    makeCard() {
        const cardElement = this._getTemplateCard();
        const cardImage = cardElement.querySelector(cssClasses.cardImageSelector);

        cardImage.src = this._link;
        cardImage.alt = this._alt;
        cardElement.querySelector(cssClasses.cardTitleSelector).textContent = this._name;
        
        cardImage.addEventListener('click', this._showPopup);
        cardElement.querySelector(cssClasses.likeBtnSelector).addEventListener('click', this._toggleLike);
        cardElement.querySelector(cssClasses.trashBtnSelector).addEventListener('click',  this._removeCard);
        return cardElement;
    }
};