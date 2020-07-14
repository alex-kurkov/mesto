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
const content = document.querySelector('.content');
const profile = content.querySelector('.profile');
const name = profile.querySelector('.profile__title');
const about = profile.querySelector('.profile__profession');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup-form');
const inputName = popupForm.querySelector('.form__input_txt_name');
const inputAbout = popupForm.querySelector('.form__input_txt_about');
const btnEditProfile = profile.querySelector('.profile__edit-button');
const btnClosePopup = popup.querySelector('.popup-form__close-btn');
const form = popup.querySelector('.form');
const cardTemplate = document.querySelector('#places__card').content;
const placesContainer = content.querySelector('.places__container');

const addInputName = () => {
    inputName.value = name.textContent;
};
const addInputAbout = () => {
    inputAbout.value = about.textContent;
};
const togglePopup = () => {
    popup.classList.toggle('popup_opened');
};
const openPopup = () => {
    inputName.value = name.textContent;
    inputAbout.value = about.textContent;
    togglePopup();
};
const submitForm = (event) => {
    console.log('sdlkjsaldkvc');
    event.preventDefault();
    name.textContent = inputName.value;
    about.textContent = inputAbout.value;
    togglePopup();
};

initialCards.forEach(({name, link = 'https://clck.ru/PeeMN', alt = 'Фотография места'}) => {
    const placesCard = cardTemplate.cloneNode(true);
    
    placesCard.querySelector('.places__card-image').src = link;
    placesCard.querySelector('.places__card-image').alt = alt;
    placesCard.querySelector('.places__card-title').textContent = name;
    
    placesCard.querySelector('.places__like-button').addEventListener('click', () => {});
    placesCard.querySelector('.places__trash-btn').addEventListener('click', () => {});

    placesContainer.prepend(placesCard);
})

btnEditProfile.addEventListener('click', openPopup);
btnClosePopup.addEventListener('click', togglePopup);
form.addEventListener("submit", submitForm);
