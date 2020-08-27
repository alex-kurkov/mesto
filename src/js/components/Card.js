import { cssClasses, cssSelectors as sel } from '../utils/constants.js';

export default class Card {
    constructor(data, templateSelector, cardClickhandler) {
        this._place = data.place;
        this._link = data.link;
        this._alt = data.alt;
        this._templateSelector = templateSelector;
        this._cardClickhandler = cardClickhandler;
    }

    _toggleLike() {
        this.classList.toggle(cssClasses.clickedLikeBtnClass);
    }
    
    _removeCard() {
        this.remove();
    }

    _getTemplateElement() {
        return document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true)
    }
    
    _handleCardClick = () => {
        this._cardClickhandler({
            link: this._link,
            place: this._place,
        })
    }
    
    _setEventListeners = ({ cardImage, likeBtn, trashEl, cardItem }) => {
        cardImage.addEventListener('click', this._handleCardClick);
        likeBtn.addEventListener('click', this._toggleLike.bind(likeBtn));
        trashEl.addEventListener('click',  this._removeCard.bind(cardItem));
    }

    _getCardElements = card => ({
        cardItem: card.querySelector(sel.cardSelector),
        cardImage: card.querySelector(sel.cardImageSelector),
        likeBtn: card.querySelector(sel.likeBtnSelector),
        trashEl: card.querySelector(sel.trashBtnSelector),
        cardTitle: card.querySelector(sel.cardTitleSelector),
    });
    makeCard = () => {
        const newCard = this._getTemplateElement();
        // Антон, вообще, здесь выбирал между вариантом объявить this._cardElements = {} 
        // и в дальнейших методах уже напрямую обращаться через this._cardElements.likeBtn...
        // но оставил все-таки такой вариант с формированием объекта только в этой области видимости 
        // и его передачей из метода в метод...
        const cardElements = this._getCardElements(newCard);

        cardElements.cardImage.src = this._link;
        cardElements.cardImage.alt = this._alt;
        cardElements.cardTitle.textContent = this._place;
        
        this._setEventListeners(cardElements)
        return cardElements.cardItem;
    }
};