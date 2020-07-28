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

const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__title');
const about = profile.querySelector('.profile__profession');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup-form');
const btnEditProfile = profile.querySelector('.profile__edit-button');
const btnAddCard = profile.querySelector('.profile__add-button');
const formProfileEdit = popup.querySelector('.popup-form_type_profile-edit');
const inputName = formProfileEdit.querySelector('.form__input_txt_name');
const inputAbout = formProfileEdit.querySelector('.form__input_txt_about');
const formCardEdit = popup.querySelector('.popup-form_type_card-edit');
const inputTitle = formCardEdit.querySelector('.form__input_txt_title');
const inputLink = formCardEdit.querySelector('.form__input_txt_link');
const popupImage = popup.querySelector('.popup-image');

const placesContainer = document.querySelector('.places__container');

const toggleElementVisibility = (element) => {
    element.classList.toggle('display_is-visible');
};
const togglePopup = (bgRender) => {
    popup.classList.toggle('popup_opened');
    popup.style.backgroundColor = (popup.classList.contains('popup_opened') && bgRender === 'xtra-dark') ? 
        'rgba(0, 0, 0, .9)' : 'rgba(0, 0, 0, .5)';
};
const closePopup = (evt) => {
    togglePopup();
    const btnParent = evt.target.parentElement;
    toggleElementVisibility(btnParent);
};
const openProfilePopup = () => {
    togglePopup();
    toggleElementVisibility(formProfileEdit);

    const btnClosePopup = formProfileEdit.querySelector('.close-btn');
    btnClosePopup.addEventListener('click', closePopup);
};
const addInputName = () => {
    inputName.value = name.textContent;
};
const addInputAbout = () => {
    inputAbout.value = about.textContent;
};
const submitProfileForm = (evt) => {
    evt.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    closePopup(evt);
};
const addCardPopup = () => {
    togglePopup();
    toggleElementVisibility(formCardEdit);
    inputTitle.value = '';
    inputLink.value = '';
    const btnClosePopup = formCardEdit.querySelector('.close-btn');
    btnClosePopup.addEventListener('click', closePopup);
};
const showImagePopup = (evt) => {
    togglePopup('xtra-dark');
    toggleElementVisibility(popupImage);
    const clickedImage = evt.target;
    const btnClosePopup = popupImage.querySelector('.close-btn');
    btnClosePopup.addEventListener('click', closePopup);
    popupImage.querySelector('.popup-image__img').src = clickedImage.src
    popupImage.querySelector('.popup-image__title').textContent = clickedImage.parentElement.querySelector('.places__card-title').textContent;
};
const makeCard = ({name = 'Место N', link = 'https://clck.ru/PeeMN', alt = 'Фотография места'}) => {
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

btnEditProfile.addEventListener('click', openProfilePopup);
btnAddCard.addEventListener('click', addCardPopup);
formProfileEdit.addEventListener("submit", submitProfileForm);
formCardEdit.addEventListener('submit', submitNewCard);
