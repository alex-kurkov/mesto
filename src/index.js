/* eslint-disable import/extensions */
import './pages/index.css';
import {
  cssSelectors as sel, elements as el, validationSetubObject,
} from './js/utils/constants.js';
import Card from './js/components/Card.js';
import FormValidator from './js/components/FormValidator.js';
import PopupWithImage from './js/components/PopupWithImage.js';
import PopupWithForm from './js/components/PopupWithForm.js';
import PopupApproval from './js/components/PopupApproval';
import UserInfo from './js/components/UserInfo.js';
import Section from './js/components/Section.js';
import Api from './js/components/Api';

const ownId = '300403dbc214b9e8436dbe03';
const api = new Api({
  groupId: 'cohort-15',
  headers: {
    authorization: '83643712-63ca-4db0-9332-910fda1def28',
    'content-type': 'application/json',
  },
});

// make instance of UserInfo class
const currentUserInfo = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__profession',
  avatarSelector: '.profile__avatar',
});

api.getUserData()
  .then((user) => {
    currentUserInfo.setUserInfo(user);
    currentUserInfo.setUserAvatar(user);
  });

// make approval Popup instance of Popup class
const popupApproval = new PopupApproval(
  '.popup-form_type_approval',
  (evt) => {
    evt.preventDefault();
    popupApproval.approvalHandler();
    popupApproval.close();
  },
);

// make image popup instance of Popup class
const popupWithImage = new PopupWithImage('.popup-image');

// define fn, returning new card element thru new Card-class instance's method makeCard()
const generateCardElement = (data) => new Card(
  data,
  ownId,
  sel.cardTemplateSelector,
  popupWithImage.open,
  popupApproval,
  () => { // deleteHandler
    api.deleteCard(data._id);
  },
  () => { // likeCardHandler,
    api.likeCard(data._id);
  },
  () => { // unlike,
    api.unlikeCard(data._id);
  },
)
  .makeCardElement();

// make card Container - instance of Section class
const cardsSection = new Section(
  (data) => {
    const cardElement = generateCardElement(data);
    cardsSection.addItem(cardElement);
  },
  sel.placesContainerSelector,
);

// make form-popup instancies of Popup class
const popupCardEdit = new PopupWithForm(sel.cardEditFormSelector, (evt) => {
  evt.preventDefault();

  const inputData = popupCardEdit._getInputValues();
  const newPlaceData = {
    name: inputData.place,
    link: inputData.link,
    alt: 'Фотография места',
  };

  api.postCard(newPlaceData)
    .then((card) => cardsSection.addItem(generateCardElement(card), 'begin'))
    .then(() => popupCardEdit.close());
});

const popupProfileEdit = new PopupWithForm(sel.profileEditFormSelector, (evt) => {
  evt.preventDefault();
  const inputData = popupProfileEdit._getInputValues();
  currentUserInfo.setUserInfo(inputData);
  api.patchUserData(inputData);
  popupProfileEdit.close();
});

// enable forms' validadion
const formProfileEditValidation = new FormValidator(validationSetubObject, el.profileEditForm);
formProfileEditValidation.enableValidation();
const formCardEditValidation = new FormValidator(validationSetubObject, el.cardEditForm);
formCardEditValidation.enableValidation();

api.getCards()
  .then((cards) => {
    cardsSection.clear();
    cardsSection.renderItems(cards);
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
// set listeners
el.btnEditProfile.addEventListener('click', showProfilePopup);
el.btnAddCard.addEventListener('click', showAddCardPopup);
