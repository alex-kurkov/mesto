import { cssClasses, cssSelectors as sel } from '../utils/constants';

export default class Card {
  constructor(data, templateSelector, cardClickhandler, popupApproval) {
    this._place = data.place;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._cardClickhandler = cardClickhandler;
    this._popupApproval = popupApproval;
  }

  _toggleLike() {
    this.classList.toggle(cssClasses.clickedLikeBtnClass);
  }

  // new!
  _showApproval() {
    this._popupApproval.open();
    console.log(this._popupApproval.functionToExecute);
    this._popupApproval.approvalHandler = () => this._cardItem.remove();
  }

  _getTemplateElement() {
    return document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);
  }

  _handleCardClick() {
    this._cardClickhandler({
      link: this._link,
      place: this._place,
    });
  }

    _setEventListeners = () => {
      this._cardImage.addEventListener('click', this._handleCardClick.bind(this));
      this._likeBtn.addEventListener('click', this._toggleLike.bind(this._likeBtn));
      this._trashEl.addEventListener('click', this._showApproval.bind(this));
    }

    _getCardElements = (card) => ({
      cardItem: card.querySelector(sel.cardSelector),
      cardImage: card.querySelector(sel.cardImageSelector),
      likeBtn: card.querySelector(sel.likeBtnSelector),
      trashEl: card.querySelector(sel.trashBtnSelector),
      cardTitle: card.querySelector(sel.cardTitleSelector),
    });

    makeCardElement = () => {
      this._newCard = this._getTemplateElement();
      this._cardItem = this._newCard.querySelector(sel.cardSelector);
      this._cardImage = this._newCard.querySelector(sel.cardImageSelector);
      this._likeBtn = this._newCard.querySelector(sel.likeBtnSelector);
      this._trashEl = this._newCard.querySelector(sel.trashBtnSelector);
      this._cardTitle = this._newCard.querySelector(sel.cardTitleSelector);

      this._cardImage.src = this._link;
      this._cardImage.alt = this._alt;
      this._cardTitle.textContent = this._place;

      this._setEventListeners();
      return this._cardItem;
    }
}
