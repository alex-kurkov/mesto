import { initialCards, setupObj, elements as el, /* formList  */} from './setup.js';
import { Card } from './card.js'; 
import { 
    renderPopup, 
    hideElement, 
    showElement, 
    renderOverlayBg ,
    closePopup,
    closeByOverlay,
    closeByEscape,
    showProfilePopup,
    showAddCardPopup,
    showImagePopup,
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
// валидация формы решил подключать в момент рендера попапа с формой - 
// соответственно импорт класса валидации - в файле с функциями

/* formList.forEach(form => {
    const newForm = new FormValidator(setupObj, form)
    newForm.enableValidation();
}); */

initialCards.forEach(card => {
    renderNewCard(generateGridCard(card));
});

el.closePopupButtons.forEach(btn => btn.addEventListener('click', closePopup));
el.btnEditProfile.addEventListener('click', showProfilePopup);
el.btnAddCard.addEventListener('click', showAddCardPopup);
el.formProfileEdit.addEventListener('submit', submitProfileForm);
el.formCardEdit.addEventListener('submit', submitNewCard);
el.overlay.addEventListener('click', closeByOverlay);
