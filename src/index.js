import './pages/index.css';
import { initialCards, cssClasses, cssSelectors as sel, elements as el } from './js/utils/constants.js';
import Card from './js/components/Card.js'; 
import FormValidator from './js/components/FormValidator.js';
import PopupWithImage from './js/components/PopupWithImage.js';
import PopupWithForm from './js/components/PopupWithForm.js';
import UserInfo from './js/components/UserInfo.js';
import Section from './js/components/Section.js';

const popupWithImage = new PopupWithImage('.popup-image');
// Антон, спасибо большое за качественное ревью - не устаю повторять, что 
// 50% практических навыков и нухных знаний мы получаем во время работы над ошибками!
// особенно пришлось поплутать с методами карточки с привязкой контекста:) но - так реально
// лаконичнее и проще

// Еще раз - спасибо за Вашу работу!


const generateCardElement = data => new Card(data, sel.cardTemplateSelector, popupWithImage.open).makeCard();

const cardsSection = new Section({
    items: initialCards, 
    renderer: data => {
        const cardElement = generateCardElement(data);
        cardsSection.addItem(cardElement);
    }
}, sel.placesContainerSelector);

const currentUserInfo = new UserInfo({ 
    nameSelector: '.profile__title', 
    aboutSelector: '.profile__profession',
});
const popupCardEdit = new PopupWithForm(sel.cardEditFormSelector, (evt) => {
    evt.preventDefault();

    const inputData = popupCardEdit._getInputValues();
    const newPlaceData = { 
        place: inputData.place,
        link: inputData.link,
        alt: 'Фотография места',
    };
       
    cardsSection.addItem(generateCardElement(newPlaceData), 'begin');
    popupCardEdit.close();
});
const popupProfileEdit = new PopupWithForm(sel.profileEditFormSelector, (evt) => {
    evt.preventDefault();
    const inputData = popupProfileEdit._getInputValues();
    currentUserInfo.setUserInfo(inputData);
    popupProfileEdit.close()
});

const formProfileEditValidation = new FormValidator({
    inputSelector: sel.inputSelector,
    formButtonSelector: sel.formButtonSelector,
    inactiveButtonClass: cssClasses.inactiveButtonClass,
    inputErrorClass: cssClasses.inputErrorClass,
    errorClass: cssClasses.errorClass,
}, el.profileEditForm);
formProfileEditValidation.enableValidation();

const formCardEditValidation = new FormValidator({
    inputSelector: sel.inputSelector,
    formButtonSelector: sel.formButtonSelector,
    inactiveButtonClass: cssClasses.inactiveButtonClass,
    inputErrorClass: cssClasses.inputErrorClass,
    errorClass: cssClasses.errorClass,
}, el.cardEditForm);
formCardEditValidation.enableValidation();

cardsSection.renderInitialItems();

const showProfilePopup = () => {
    const data = currentUserInfo.getUserInfo()
    popupProfileEdit.setInitialInputValues(data);
    popupProfileEdit.open();
    formProfileEditValidation.hideErrors();
};
const showAddCardPopup = () => {
    popupCardEdit.open();
    formCardEditValidation.hideErrors();
}

el.btnEditProfile.addEventListener('click', showProfilePopup);
el.btnAddCard.addEventListener('click', showAddCardPopup);

