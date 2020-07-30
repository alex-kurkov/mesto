//Александр, большое спасибо за полезные комментарии, как всегда 50% всех полезных 
// навыков приобретаешь благодаря ревью). Прибрался в коде, благодаря Вам, так самому
// приятнее смотреть стало. Еще раз - спасибо!

// profile & places sections elements
const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__title');
const about = profile.querySelector('.profile__profession');
const btnEditProfile = profile.querySelector('.profile__edit-button');
const btnAddCard = profile.querySelector('.profile__add-button');
const placesContainer = document.querySelector('.places__container');
// popup elements
const popup = document.querySelector('.popup');
const popupImage = popup.querySelector('.popup-image');
const overlay = popup.querySelector('.overlay');
const closePopupButtons = document.querySelectorAll('.close-btn');
// profile form
const formProfileEdit = popup.querySelector('.popup-form_type_profile-edit');
const inputName = formProfileEdit.querySelector('.form__input_txt_name');
const inputAbout = formProfileEdit.querySelector('.form__input_txt_about');
// card add form
const formCardEdit = popup.querySelector('.popup-form_type_card-edit');
const inputTitle = formCardEdit.querySelector('.form__input_txt_title');
const inputLink = formCardEdit.querySelector('.form__input_txt_link');

const hideElement = (...rest) => {
    rest.forEach(el => el.classList.remove('display_is-visible'));
};
const showElement = (...rest) => {
    rest.forEach(el => el.classList.add('display_is-visible'));
};
const renderOverlayBg = (color = 'rgba(0, 0, 0, .5)') => {
    overlay.style.backgroundColor = color;
};
const renderPopup = (modal, background) => {
    showElement(popup, modal);
    renderOverlayBg(background);
    document.addEventListener('keydown', closeByEscape);
};
const closePopup = evt => {
    const modal = evt.target.parentElement;
    hideElement(popup, modal);
    document.removeEventListener('keydown', closeByEscape);
};
const closeByOverlay = () => {
    const siblings = Array.from(overlay.parentElement.childNodes);
    siblings
        .filter(node => node.nodeType === Node.ELEMENT_NODE)
        .forEach(sibling => sibling.classList.remove('display_is-visible'));
    hideElement(popup);
};
const closeByEscape = evt => {
    if (evt.key === 'Escape') { 
        closeByOverlay();
    }
};

const showProfilePopup = () => {
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;
    renderPopup(formProfileEdit);
};
const showAddCardPopup = () => {
    inputTitle.value = '';
    inputLink.value = '';
    renderPopup(formCardEdit);
};
const showImagePopup = evt => {
    const clickedImage = evt.target;
    popupImage.querySelector('.popup-image__img').src = clickedImage.src
    popupImage.querySelector('.popup-image__title').textContent = clickedImage.parentElement.querySelector('.places__card-title').textContent;
    renderPopup(popupImage, 'rgba(0, 0, 0, .9)');
};

const submitProfileForm = evt => {
    evt.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    closePopup(evt);
};
const submitNewCard = evt => {
    evt.preventDefault();
    const newPlace = { 
        name: inputTitle.value,
        link: inputLink.value,
    };
    renderNewCard(newPlace);
    closePopup(evt);
};

const makeCard = ({name, link, alt = 'Фотография места'}) => {
    const cardTemplate = document.querySelector('#places__card').content;
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector('.places__card-image');

    cardImage.src = link;
    cardImage.alt = alt;
    card.querySelector('.places__card-title').textContent = name;
    
    cardImage.addEventListener('click', showImagePopup);
    card.querySelector('.places__like-button').addEventListener('click', evt => {
        evt.target.classList.toggle('places__like-button_state_clicked');
    });
    card.querySelector('.places__trash-btn').addEventListener('click', evt => {
        evt.target.parentElement.remove();
    });
    return card;
};

const renderNewCard = card => {
    const newCard = makeCard(card);
    placesContainer.append(newCard);
};

initialCards.forEach(renderNewCard);

closePopupButtons.forEach(btnClosePopup => btnClosePopup.addEventListener('click', closePopup));
btnEditProfile.addEventListener('click', showProfilePopup);
btnAddCard.addEventListener('click', showAddCardPopup);
formProfileEdit.addEventListener("submit", submitProfileForm);
formCardEdit.addEventListener('submit', submitNewCard);
overlay.addEventListener('click', closeByOverlay);
