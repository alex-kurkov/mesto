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

// Ирина, огромное спасибо Вам за подробное объяснение! Во время ревью всегда узнаешь
// не менее половины полезной практически значимой информации. Так и сейчас:) 
// Попробую после получения зачета поэкспериментировать и выделить в отдельные классы 
// попап и форму и все методы перенести в эти классы. 
// Еще раз - большое спасибо за Вашу работу!
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
