import { initialCards, cssClasses, elements as el } from './setup.js';
import { Card } from './card.js'; 
import { FormValidator } from './formValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
/*import {} from ''; */

const popupWithImage = new PopupWithImage('.popup-image');
const popupCardEdit = new PopupWithForm('.popup-form_type_card-edit', (evt) => {
    evt.preventDefault();
    const obj = popupCardEdit._getInputValues();
    const newPlace = { 
        name: obj.place,
        link: obj.link,
        alt: 'Фотография места',
    };
    renderNewCard(generateGridCard(newPlace), 'begin');
    popupCardEdit.close();
});
const popupProfileEdit = new PopupWithForm('.popup-form_type_profile-edit', (evt) => {
    evt.preventDefault();
    const obj = popupProfileEdit._getInputValues();    
        el.name.textContent = obj.name;
        el.about.textContent = obj.about;
        popupProfileEdit.close()
});

const formProfileEditValidation = new FormValidator(cssClasses, el.formProfileEdit.querySelector(cssClasses.formSelector));
formProfileEditValidation.enableValidation();

const formCardEditValidation = new FormValidator(cssClasses, el.formCardEdit.querySelector(cssClasses.formSelector));
formCardEditValidation.enableValidation();

const generateGridCard = data => new Card(data, cssClasses.cardTemplateSelector, popupWithImage.open).makeCard();

const renderNewCard = (card, target) => {
    if (target === 'begin') {
        el.placesContainer.prepend(card);
    } 
    el.placesContainer.append(card)
};

const showProfilePopup = () => {
    el.inputName.value = el.name.textContent;
    el.inputAbout.value = el.about.textContent;
    popupProfileEdit.open();
    formProfileEditValidation.hideErrors();
};
const showAddCardPopup = () => {
    popupCardEdit.open();
    formCardEditValidation.hideErrors();
}

initialCards.forEach(card => {
    renderNewCard(generateGridCard(card));
});

el.btnEditProfile.addEventListener('click', showProfilePopup);
el.btnAddCard.addEventListener('click', showAddCardPopup);

