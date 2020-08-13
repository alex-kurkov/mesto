import { showImagePopup } from './functions.js';

export class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._templateSelector = templateSelector;
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('places__like-button_state_clicked');
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
        const cardImage = cardElement.querySelector('.places__card-image');

        cardImage.src = this._link;
        cardImage.alt = this._alt;
        cardElement.querySelector('.places__card-title').textContent = this._name;
        
        cardImage.addEventListener('click', showImagePopup);
        cardElement.querySelector('.places__like-button').addEventListener('click', this._toggleLike);
        cardElement.querySelector('.places__trash-btn').addEventListener('click',  this._removeCard);
        return cardElement;
    }
};