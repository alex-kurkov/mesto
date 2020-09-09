/* eslint-disable import/extensions */
import './pages/index.css';
import {
  cssSelectors as sel, elements as el, validationSetubObject,
} from './js/utils/constants';
import Card from './js/components/Card';
import FormValidator from './js/components/FormValidator';
import PopupWithImage from './js/components/PopupWithImage';
import PopupWithForm from './js/components/PopupWithForm';
import PopupApproval from './js/components/PopupApproval';
import UserInfo from './js/components/UserInfo';
import Section from './js/components/Section';
import Api from './js/components/Api';

// global constants
const ownId = '300403dbc214b9e8436dbe03';
const api = new Api({
  groupId: 'cohort-15',
  headers: {
    authorization: '83643712-63ca-4db0-9332-910fda1def28',
    'content-type': 'application/json',
  },
});

const cardsSection = new Section(sel.placesContainerSelector);

// make instance of UserInfo class
const currentUserInfo = new UserInfo(sel);

api.getUserData()
  .then((user) => {
    currentUserInfo.setUserInfo(user);
    currentUserInfo.setUserAvatar(user);
  });

// make approval Popup instance of Popup class
const popupApproval = new PopupApproval(
  sel.approvalPopupSelector,
  (evt) => {
    evt.preventDefault();
    popupApproval.approvalHandler();
    popupApproval.close();
  },
);

// make image popup instance of Popup class
const popupWithImage = new PopupWithImage(sel.popupImageSelector);

// define fn, creating new Card class instanse and rendering card Element
const renderCardElement = (data, target) => {
  const card = new Card({
    data,
    ownId,
    templateSelector: sel.cardTemplateSelector,
    cardClickhandler: popupWithImage.open,
    popupApproval,
    deleteCardHandler: () => {
      api.deleteCard(data._id)
        .then(() => card.removeCardElement());
    },
    likeCardHandler: () => {
      api.likeCard(data._id)
        .then((res) => card.processLikes(res));
    },
    unlikeCardHandler: () => {
      api.unlikeCard(data._id)
        .then((item) => card.processLikes(item));
    },
  });
  const cardElement = card.makeCardElement();
  cardsSection.addItem(cardElement, target);
};

// make form-popup instances of Popup class
const popupCardEdit = new PopupWithForm(sel.cardEditFormSelector, (evt) => {
  evt.preventDefault();
  const inputData = popupCardEdit._getInputValues();
  const newPlaceData = {
    name: inputData.place,
    link: inputData.link,
  };
  popupCardEdit.actionButton.textContent = 'Создаем карточку...';
  api.postCard(newPlaceData)
    .then((card) => renderCardElement(card, 'begin'))
    .then(() => {
      popupCardEdit.close();
      popupCardEdit.actionButton.textContent = 'Создать';
    });
});

const popupAvatarEdit = new PopupWithForm(
  sel.avatarEditFormSelector,
  (evt) => {
    evt.preventDefault();
    const inputData = popupAvatarEdit._getInputValues();
    popupAvatarEdit.actionButton.textContent = 'Сохранение...';
    api.patchAvatar(inputData)
      .then(() => currentUserInfo.setUserAvatar(inputData))
      .then(() => {
        popupAvatarEdit.close();
        popupAvatarEdit.actionButton.textContent = 'Сохранить';
      });
  },
);

const popupProfileEdit = new PopupWithForm(
  sel.profileEditFormSelector,
  (evt) => {
    evt.preventDefault();
    const inputData = popupProfileEdit._getInputValues();
    popupProfileEdit.actionButton.textContent = 'Сохранение...';
    api.patchUserData(inputData)
      .then(() => currentUserInfo.setUserInfo(inputData))
      .then(() => {
        popupProfileEdit.close();
        popupProfileEdit.actionButton.textContent = 'Сохранить';
      });
  },
);

// enable forms' validadion
const formProfileEditValidation = new FormValidator(validationSetubObject, el.profileEditForm);
formProfileEditValidation.enableValidation();
const formCardEditValidation = new FormValidator(validationSetubObject, el.cardEditForm);
formCardEditValidation.enableValidation();
const formAvatarEditValidation = new FormValidator(validationSetubObject, el.avatarEditForm);
formAvatarEditValidation.enableValidation();

// render server cards
api.getCards()
  .then((cards) => {
    cards.forEach((card) => renderCardElement(card));
  });

// define listeners' callbacks
const showProfilePopup = () => {
  const data = currentUserInfo.getUserInfo();
  popupProfileEdit.setInitialInputValues(data);
  popupProfileEdit.open();
  formProfileEditValidation.hideErrors();
};
const showAddCardPopup = () => {
  popupCardEdit.open();
  formCardEditValidation.hideErrors();
};
const showAvatarPopup = () => {
  popupAvatarEdit.open();
  formAvatarEditValidation.hideErrors();
};

// set listeners
el.btnEditProfile.addEventListener('click', showProfilePopup);
el.btnAddCard.addEventListener('click', showAddCardPopup);
el.avatar.addEventListener('click', showAvatarPopup);
