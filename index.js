const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'фотография гор Архыза',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'фотография пейзажа Челябинской области',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'фотография городского пейзажа Иваново',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'фотография природы Камчатки',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'фотография железной дороги в лесу в Холмогорах',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'фотография скал и скованного льдом Байкала',
    }
];
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

const closePopup = evt => {
    const modal = evt.target.parentElement;
    hideElement(popup, modal);
    document.removeEventListener('keydown', closeThruEscape);
};
const closeThruOverlay = () => {
    const siblings = Array.from(overlay.parentElement.childNodes);
    siblings
        .filter(node => node.nodeType === Node.ELEMENT_NODE)
        .forEach(sibling => sibling.classList.remove('display_is-visible'));
    hideElement(popup);
};
const closeThruEscape = (evt) => {
    console.log(evt);
    if (evt.key === 'Escape') { 
        closeThruOverlay()
    };
};

const showProfilePopup = () => {
    showElement(popup, formProfileEdit);
    renderOverlayBg();
    document.addEventListener('keydown', closeThruEscape);
};

const submitProfileForm = (evt) => {
    evt.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    closePopup(evt);
};
const showAddCardPopup = () => {
    showElement(popup, formCardEdit)
    renderOverlayBg();
    inputTitle.value = '';
    inputLink.value = '';
    document.addEventListener('keydown', closeThruEscape);
};
const showImagePopup = (evt) => {
    const clickedImage = evt.target;
    popupImage.querySelector('.popup-image__img').src = clickedImage.src
    popupImage.querySelector('.popup-image__title').textContent = clickedImage.parentElement.querySelector('.places__card-title').textContent;

    showElement(popup, popupImage);
    renderOverlayBg('rgba(0, 0, 0, .9)');
    document.addEventListener('keydown', closeThruEscape);
};
const makeCard = ({name, link, alt = 'Фотография места'}) => {
    const cardTemplate = document.querySelector('#places__card').content;
    const elCard = cardTemplate.cloneNode(true);
    
    elCard.querySelector('.places__card-image').src = link;
    elCard.querySelector('.places__card-image').alt = alt;
    elCard.querySelector('.places__card-title').textContent = name;
    
    elCard.querySelector('.places__card-image').addEventListener('click', showImagePopup);
    elCard.querySelector('.places__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('places__like-button_state_clicked');
    });
    elCard.querySelector('.places__trash-btn').addEventListener('click', (evt) => {
        evt.target.parentElement.remove();
    });

    placesContainer.prepend(elCard);
};

const submitNewCard = (evt) => {
    evt.preventDefault();
    const newPlace = { 
        name: inputTitle.value,
        link: inputLink.value,
    };
    makeCard (newPlace);
    closePopup(evt);
};

initialCards.forEach(makeCard);

const closePopupButtons = document.querySelectorAll('.close-btn');
closePopupButtons.forEach(btnClosePopup => btnClosePopup.addEventListener('click', closePopup));
btnEditProfile.addEventListener('click', showProfilePopup);
btnAddCard.addEventListener('click', showAddCardPopup);
formProfileEdit.addEventListener("submit", submitProfileForm);
formCardEdit.addEventListener('submit', submitNewCard);
overlay.addEventListener('click', closeThruOverlay);
