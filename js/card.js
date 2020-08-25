import { cssClasses } from './setup.js';

export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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

    makeCard() {
        const cardElement = this._getTemplateCard();
        const cardImage = cardElement.querySelector(cssClasses.cardImageSelector);

        cardImage.src = this._link;
        cardImage.alt = this._alt;
        cardElement.querySelector(cssClasses.cardTitleSelector).textContent = this._name;
        
        cardImage.addEventListener('click', this._handleCardClick);
        cardElement.querySelector(cssClasses.likeBtnSelector).addEventListener('click', this._toggleLike);
        cardElement.querySelector(cssClasses.trashBtnSelector).addEventListener('click',  this._removeCard);
        return cardElement;
    }
};