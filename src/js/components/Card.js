import { cssClasses, cssSelectors as sel } from '../utils/constants';

export default class Card {
  constructor(
    data,
    ownId,
    templateSelector,
    cardClickhandler,
    popupApproval,
    deleteCardHandler,
    likeCardHandler,
    unlikeCardHandler,
  ) {
    this._place = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardOwner = data.owner;
    this._likes = data.likes;
    this._likesCount = this._likes.length;
    this._templateSelector = templateSelector;
    this._cardClickhandler = cardClickhandler;
    this._popupApproval = popupApproval;
    this._deleteCardHandler = deleteCardHandler;
    this._likeCardHandler = likeCardHandler;
    this._unlikeCardHandler = unlikeCardHandler;
    this._isOwner = ownId === this._cardOwner._id;
    this._id = data._id;
    this._isLiked = this._likes.some((user) => user._id === ownId);
  }

  _renderLikes(likesCount) {
    this._likesCounter.innerText = String(likesCount);
  }

  _renderLikeBtn(isLiked) {
    if (isLiked) {
      this._likeBtn.classList.add(cssClasses.clickedLikeBtnClass);
    } else {
      this._likeBtn.classList.remove(cssClasses.clickedLikeBtnClass);
    }
  }

  _processLikes() {
    this._isLiked = !this._isLiked;
    this._renderLikes(this._likesCount);
    this._renderLikeBtn(this._isLiked);
  }

  _handleLike() {
    if (!this._isLiked) {
      this._likesCount += 1;
      this._likeCardHandler();
      this._processLikes();
    } else {
      this._likesCount -= 1;
      this._unlikeCardHandler();
      this._processLikes();
    }
  }

  _showApproval() {
    this._popupApproval.open();
    this._popupApproval.approvalHandler = () => {
      this._cardItem.remove();
      this._deleteCardHandler();
    };
  }

  _getTemplateElement() {
    return document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);
  }

  _defineElements() {
    this._cardItem = this._newCard.querySelector(sel.cardSelector);
    this._cardImage = this._newCard.querySelector(sel.cardImageSelector);
    this._likeBtn = this._newCard.querySelector(sel.likeBtnSelector);
    this._trashEl = this._newCard.querySelector(sel.trashBtnSelector);
    this._cardTitle = this._newCard.querySelector(sel.cardTitleSelector);
    this._likesCounter = this._newCard.querySelector('.places__like-counter');
  }

  _handleCardClick() {
    this._cardClickhandler({
      link: this._link,
      place: this._place,
    });
  }

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', this._handleCardClick.bind(this));
    this._likeBtn.addEventListener('click', this._handleLike.bind(this));
    if (this._isOwner) this._trashEl.addEventListener('click', this._showApproval.bind(this));
  }

  makeCardElement = () => {
    this._newCard = this._getTemplateElement();
    this._defineElements();

    if (!this._isOwner) this._trashEl.style.visibility = 'hidden';

    this._renderLikeBtn(this._isLiked);
    this._renderLikes(this._likesCount);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
    this._cardTitle.textContent = this._place;
    this._setEventListeners();
    return this._cardItem;
  }
}
