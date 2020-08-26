import { cssClasses, cssSelectors as sel } from '../utils/constants.js';

export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._place = data.place;
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

    makeCard = ({place = this._place, link = this._link, alt = this._alt}) => {
        const cardElement = this._getTemplateCard();
        const cardImage = cardElement.querySelector(sel.cardImageSelector);

        cardImage.src = link;
        cardImage.alt = alt;
        cardElement.querySelector(sel.cardTitleSelector).textContent = place;
        
        cardImage.addEventListener('click', this._handleCardClick);
        cardElement.querySelector(sel.likeBtnSelector).addEventListener('click', this._toggleLike);
        cardElement.querySelector(sel.trashBtnSelector).addEventListener('click',  this._removeCard);
        return cardElement;
    }
};