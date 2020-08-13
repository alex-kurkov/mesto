import { initialCards, setupObj, elements as el } from './setup.js';
import { Card } from './card.js'; 
import { FormValidator } from './formValidator.js';
import { 
    renderPopup, 
    closePopup,
    closeByOverlay,
    submitProfileForm,
    renderNewCard,
} from './functions.js';

const generateGridCard = data => new Card(data, '#places__card').makeCard();

const submitNewCard = evt => {
    evt.preventDefault();
    const newPlace = { 
        name: el.inputTitle.value,
        link: el.inputLink.value,
        alt: 'Фотография места',
    };
    renderNewCard(generateGridCard(newPlace), 'begin');
    closePopup(evt);
};

// вообще, я бы лучше и эти функции вынес в functions.js
// и там импортировал класс валидатора формы...
const showProfilePopup = () => {
    el.inputName.value = el.name.textContent;
    el.inputAbout.value = el.about.textContent;
    const activeForm = new FormValidator(setupObj, el.formProfileEdit.querySelector('.form'));
    activeForm.enableValidation();
    renderPopup(el.formProfileEdit);

};
const showAddCardPopup = () => {
    el.inputTitle.value = '';
    el.inputLink.value = '';
    const activeForm = new FormValidator(setupObj, el.formCardEdit.querySelector('.form'));
    activeForm.enableValidation();
    renderPopup(el.formCardEdit);
};

initialCards.forEach(card => {
    renderNewCard(generateGridCard(card));
});

el.closePopupButtons.forEach(btn => btn.addEventListener('click', closePopup));
el.btnEditProfile.addEventListener('click', showProfilePopup);
el.btnAddCard.addEventListener('click', showAddCardPopup);
el.formProfileEdit.addEventListener('submit', submitProfileForm);
el.formCardEdit.addEventListener('submit', submitNewCard);
el.overlay.addEventListener('click', closeByOverlay);
