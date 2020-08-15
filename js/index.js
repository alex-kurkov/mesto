import { initialCards, cssClasses, elements as el } from './setup.js';
import { Card } from './card.js'; 
import { Popup } from './popup.js';

const popup = new Popup;

const generateGridCard = data => new Card(data, cssClasses.cardTemplateSelector, popup.showImagePopup).makeCard();

const renderNewCard = (card, target) => {
    if (target === 'begin') {
        el.placesContainer.prepend(card);
    } 
    el.placesContainer.append(card)
};
const submitProfileForm = evt => {
    evt.preventDefault();
    el.name.textContent = el.inputName.value;
    el.about.textContent = el.inputAbout.value;
    popup.closePopup(evt);
};
const submitNewCard = evt => {
    evt.preventDefault();
    const newPlace = { 
        name: el.inputTitle.value,
        link: el.inputLink.value,
        alt: 'Фотография места',
    };
    renderNewCard(generateGridCard(newPlace), 'begin');
    popup.closePopup(evt);
};

initialCards.forEach(card => {
    renderNewCard(generateGridCard(card));
});

el.btnEditProfile.addEventListener('click', popup.showProfilePopup);
el.btnAddCard.addEventListener('click', popup.showAddCardPopup);
el.formProfileEdit.addEventListener('submit', submitProfileForm);
el.formCardEdit.addEventListener('submit', submitNewCard);
