/* eslint-disable import/extensions */
import './index.css';
import {
  cssSelectors as sel, elements as el, validationSetubObject,
} from '../js/utils/constants';
import Card from '../js/components/Card';
import FormValidator from '../js/components/FormValidator';
import PopupWithImage from '../js/components/PopupWithImage';
import PopupWithForm from '../js/components/PopupWithForm';
import PopupApproval from '../js/components/PopupApproval';
import UserInfo from '../js/components/UserInfo';
import Section from '../js/components/Section';
import Api from '../js/components/Api';

// make instance of Api class
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '83643712-63ca-4db0-9332-910fda1def28',
    'content-type': 'application/json',
  },
});

// make card container
const cardsSection = new Section(sel.placesContainerSelector);

// make instance of UserInfo class (currentUserInfo._id will be set later thru api.getUserInfo())
const currentUserInfo = new UserInfo(sel);

// make approval Popup instance of Popup class
const popupApproval = new PopupApproval(
  sel.approvalPopupSelector,
  (evt) => {
    evt.preventDefault();
    popupApproval.approvalHandler();
  },
);

// make image popup instance of Popup class
const popupWithImage = new PopupWithImage(sel.popupImageSelector);

// define fn, creating new Card class instanse and rendering card Element
const renderCardElement = (data, target) => {
  const card = new Card({
    data,
    ownId: currentUserInfo._id,
    templateSelector: sel.cardTemplateSelector,
    cardClickhandler: popupWithImage.open,
    popupApproval,
    deleteCardHandler: () => {
      api.deleteCard(data._id)
        .then(() => card.removeCardElement())
        .then(() => popupApproval.close())
        .catch((error) => console.log(error));
    },
    likeCardHandler: () => {
      api.likeCard(data._id)
        .then((res) => card.processLikes(res))
        .catch((error) => console.log(error));
    },
    dislikeCardHandler: () => {
      api.dislikeCard(data._id)
        .then((item) => card.processLikes(item))
        .catch((error) => console.log(error));
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
  popupCardEdit.setActionBtnText('Создаем карточку...');
  api.postCard(newPlaceData)
    .then((card) => renderCardElement(card, 'begin'))
    .then(() => popupCardEdit.close())
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      popupCardEdit.setActionBtnText('Создать');
    });
});

const popupAvatarEdit = new PopupWithForm(
  sel.avatarEditFormSelector,
  (evt) => {
    evt.preventDefault();
    const inputData = popupAvatarEdit._getInputValues();
    popupAvatarEdit.setActionBtnText('Сохранение...');
    api.patchAvatar(inputData)
      .then(() => currentUserInfo.setUserInfo(inputData))
      .then(() => popupAvatarEdit.close())
      .catch((error) => console.log(console.log(error)))
      .finally(() => {
        popupAvatarEdit.setActionBtnText('Сохранить');
      });
  },
);

const popupProfileEdit = new PopupWithForm(
  sel.profileEditFormSelector,
  (evt) => {
    evt.preventDefault();
    const inputData = popupProfileEdit._getInputValues();
    popupProfileEdit.setActionBtnText('Сохранение...');
    api.patchUserData(inputData)
      .then(() => currentUserInfo.setUserInfo(inputData))
      .then(() => popupProfileEdit.close())
      .catch((error) => console.log(console.log(error)))
      .finally(() => {
        popupProfileEdit.setActionBtnText('Сохранить');
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

Promise.all([
  api.getUserData(),
  api.getCards(),
])
  .then((values) => {
    const [userData, serverCards] = values;
    currentUserInfo._id = userData._id;
    currentUserInfo.setUserInfo(userData);
    return serverCards;
  })
  .then((cards) => cards.forEach((card) => renderCardElement(card)))
  .catch((error) => console.log(error));

// define listeners' callbacks
const showProfilePopup = () => {
  const data = currentUserInfo.getUserDOMInfo();
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
